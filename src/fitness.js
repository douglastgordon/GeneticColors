// Code dealing with judging fitness of grids


// Independent Fitness functions

// returns fitness of grid according to unweighted, binary fitness of each cell, given a fitness function
const independentFitness = isFitFunc => grid => {
  return grid.flatten().reduce((acc, cell) => acc + (isFitFunc(cell) ? 1 : 0), 0);
};

// returns fitness of grid according to unweighted, binary fitness of each cell, given a fitness function
const continuousIndependentFitness = fitnessScore => grid => {
  return grid.flatten().reduce((acc, cell) => acc + fitnessScore(cell), 0);
};

// returns binary fitness of color, according to "redness"
const isReddish = color => {
  const {r, g, b} = parseHex(color);
  return g + b < r;
};

// binary fitness of color, according to "blueness"
const isBluish = color => {
  const {r, g, b} = parseHex(color);
  return r + g < b;
};

// binary fitness of color, according to "greeness"
const isGreenish = color => {
  const {r, g, b} = parseHex(color);
  return r + b < g;
};


const rednessScore = color => {
  const { r, g, b } = parseHex(color);
  const score = r - b - g;
  const maxScore = 255 - 0 - 0;
  const minScore = 0 - 255 - 255;
  return normalizeFitnessScore(score, maxScore, minScore);
}

const greennessScore = color => {
  const { r, g, b } = parseHex(color);
  const score = g - b - r;
  const maxScore = 255 - 0 - 0;
  const minScore = 0 - 255 - 255;
  return normalizeFitnessScore(score, maxScore, minScore);
}

// find fitness score of grid, according to "redness"
const redFitness = independentFitness(isReddish);

// find fitness score of grid, according to "blueness"
const blueFitness = independentFitness(isBluish);

// find fitness score of grid, according to "greenness"
const greenFitness = independentFitness(isGreenish);

// find continuous fitness score of grid, trending to pure red
const redContinuousFitness = continuousIndependentFitness(rednessScore);

// find continuous fitness score of grid, trending to pure green
const greenContinuousFitness = continuousIndependentFitness(greennessScore);


// Dependent (immediate neighbors) Fitness functions

// returns fitness of grid according to relationship of each cell to its immediate neighbors, given a fitness function
const dependentFitness = fitnessScoreFunc => grid => {
  let score = 0;
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      score += neighborFitness(cell, getNeighbors(grid, [x, y]), fitnessScoreFunc);
    });
  });
  return score;
};

// returns fitness of cell's neighbors according to fitness function comparing two cells
const neighborFitness = (cellColor, neighbors=[], neighborComparisonFunc) => {
  return neighbors.reduce((acc, color) => acc + neighborComparisonFunc(cellColor, color), 0);
};

// compares closenses of two colors: the higher the score, the more different the colors
const differenceScore = (colorA, colorB) => {
  const { r: rA, g: gA, b: bA } = parseHex(colorA);
  const { r: rB, g: gB, b: bB } = parseHex(colorB);
  const score = (Math.abs(rA - rB) + Math.abs(gA - gB) + Math.abs(bA - bB));
  const maxScore = 255 + 255 + 255;
  const minScore = 0 + 0 + 0;
  return normalizeFitnessScore(score, maxScore, minScore);
};

// compares closenses of two colors: the higher the score, the more similar the colors
const similarityScore = (colorA, colorB) => 1 - differenceScore(colorA, colorB);

// dependentFitness function for difference between cells
const differentFitness = dependentFitness(differenceScore);
// dependentFitness function for difference between cells
const similarityFitness = dependentFitness(similarityScore);


// retreives array of neighbors from grid and coordinate
const getNeighbors = (grid, [row, col]) => {
   const neighbors = [];
   const range = Array.from(new Array(3), (_, i) => i - 1);
   range.forEach(x => {
     range.forEach(y => {
       if (grid[row + x] && grid[row + x][col + y] && (x !== 0 || y !== 0)) {
         neighbors.push(grid[row + x][ col + y]);
       }
     });
   });
   return neighbors;
};


// Horizontal Stripe Fitness Function

// returns fitness of grid, using two fitness functions applied to odd and even rows, each cell is independent
const stripeFitness = (evenRowFitnessFunc, oddRowFitnessFunc) => grid => {
  let score = 0;
  grid.forEach((row, x) => {
    row.forEach(cell => {
      if (x % 2 === 0) {
        score += (evenRowFitnessFunc(cell) ? 1 : 0);
      } else {
        score += (oddRowFitnessFunc(cell) ? 1 : 0);
      }
    })
  })
  return score;
};

const continuousStripeFitness = (evenRowFitnessScore, oddRowFitnessScore) => grid => {
  let score = 0;
  grid.forEach((row, x) => {
    row.forEach(cell => {
      if (x % 2 === 0) {
        score += evenRowFitnessScore(cell);
      } else {
        score += oddRowFitnessScore(cell);
      }
    })
  })
  return score;
};

const continuousStripeFitnessWithGeneral = (evenRowFitnessScore, oddRowFitnessScore, generalFitness) => grid => {
  let score = 0;
  grid.forEach((row, x) => {
    row.forEach(cell => {
      if (x % 2 === 0) {
        score += evenRowFitnessScore(cell);
      } else {
        score += oddRowFitnessScore(cell);
      }
      score += generalFitness(cell)
    })
  })
  return score;
};

// rates whitness of color from 0 (black) -> 765 (white)
const whitenessScore = color => {
  const { r, g, b } = parseHex(color);
  return r + g + b;
};

const blacknessScore = color => 765 - whitenessScore(color);

const redGreenStripeFitness = stripeFitness(rednessScore, greennessScore);
const blackWhiteStripeFitness = continuousStripeFitness(whitenessScore, blacknessScore);
const darkPaleRedStripeFitness = continuousStripeFitnessWithGeneral(whitenessScore, blacknessScore, rednessScore);


// holistic fitness
const holisticHomogeneityFitness = grid => {
  const red = [];
  const green = []
  const blue = [];
  grid.forEach(row => {
    row.forEach(color => {
      const { r, g, b } = parseHex(color);
      red.push(r);
      green.push(g);
      blue.push(b);
    });
  });

  const score = red.standardDeviation() + green.standardDeviation() + blue.standardDeviation();
  const minScore = 127.5 + 127.5 + 127.5;
  const maxScore = 0 + 0 + 0;
  return normalizeFitnessScore(score, maxScore, minScore);
};


// finds similarity to target
const similarityToTarget = targetGrid => grid => {
  let score = 0
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      const targetCell = targetGrid[x][y];
      score += similarityScore(cell, targetCell);
    });
  });
  return score;
};

const similarityToMondrian = similarityToTarget(mondrianGrid());

// normalizes fitness score of cell to 0-1 scale (so total grid score is 0 - 100)
const normalizeFitnessScore = (score, maxScore, minScore) => {
  return (score - minScore) / (maxScore - minScore);
};

// returns object of decimal rgb values for hex color
const parseHex = (color) => {
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return {r, g, b};
};

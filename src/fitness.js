// Code dealing with judging fitness of grids


// returns fitness of grid according to unweighted, binary fitness of each cell, given a fitness function
const fitness = isFitFunc => grid => {
  grid.flatten().reduce((acc, cell) => isFitFunc(cell) ? 1 : 0, 0);
};

// returns binary fitness of color, according to "redness"
const isReddish = (color) => {
  const {r, g, b} = parseHex(color);
  return g + b < r;
};

// binary fitness of color, according to "blueness"
const isBluish = (color) => {
  const {r, g, b} = parseHex(color);
  return r + g < b;
};

// binary fitness of color, according to "greeness"
const isGreenish = (color) => {
  const {r, g, b} = parseHex(color);
  return r + b < g;
};

// find fitness score of grid, according to "redness"
const redFitness = fitness(isReddish);

// find fitness score of grid, according to "blueness"
const blueFitness = fitness(isBluish);

// find fitness score of grid, according to "greenness"
const greenFitness = fitness(isGreenish);



// returns fitness of grid according to relationship of each cell to its immediate neighbors, given a fitness function
const dependentFitness = fitnessScoreFunc => grid => {
  let score = 0;
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      score += fitnessScoreFunc(cell, getNeighbors(grid, [x, y]));
    });
  });
  return score;
};

// returns fitness of cell's neighbors according to fitness function comparing two cells
const neighborFitness = (cellColor, neighbors=[]) => {
  return neighbors.reduce((acc, color) => acc + proximityScore(cellColor, color), 0);
};

const proximityScore = (colorA, colorB) => {
  // lower score, the closer the colors - score of 0 is two identical colors
  const { r: rA, g: gA, b: bA } = parseHex(colorA);
  const { r: rB, g: gB, b: bB } = parseHex(colorB);
  return (Math.abs(rA - rB) + Math.abs(gA - gB) + Math.abs(bA - bB));
};

const differentFitness = dependentFitness(neighborProximity);


const getNeighbors = (grid, [x, y]) => {
   const neighbors = [];
   const range = Array.from(new Array(3), (_, i) => i - 1);
   range.forEach(x => {
     range.forEach(y => {
       if (grid[x] && grid[x][y] && (x !== 0 || y !== 0)) {
         neighbors.push(grid[x][y]);
       }
     });
   });
   return neighbors;
};



const rankGrids = (grids, fitnessFunc) => {
  return grids.sort((a, b) => fitnessFunc(a) - fitnessFunc(b));
};


// returns object of decimal rgb values for hex color
const parseHex = (color) => {
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return {r, g, b};
};

// Code dealing with judging fitness of grids


// returns fitness of grid according to unweighted, binary fitness of each cell, given a fitness function
const fitness = isFitFunc => grid => {
  return grid.flatten().reduce((acc, cell) => acc + (isFitFunc(cell) ? 1 : 0), 0);
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
  return (Math.abs(rA - rB) + Math.abs(gA - gB) + Math.abs(bA - bB));
};

// compares closenses of two colors: the higher the score, the more similar the colors
const similarityScore = (colorA, colorB) => differenceScore(colorA, colorB) * -1;

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

// orders array of grids according to fitness, given fitness func
const rankGrids = (grids, fitnessFunc) => {
  return grids.sort((a, b) => fitnessFunc(b) - fitnessFunc(a));
};

// returns object of decimal rgb values for hex color
const parseHex = (color) => {
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return {r, g, b};
};

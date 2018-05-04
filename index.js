const blackGrid = size => Array.from(new Array(size), () => Array.from(new Array(size), () => 0));

const blackTenByTenGrid = blackGrid(10)

const randomizeColors = grid => grid.map(row => row.map(cell => randomColor()));

const randomColorTenByTenGrid = () => randomizeColors(blackTenByTenGrid)

const randomColor = () => randomHex() + randomHex() + randomHex();

const randomHex = () => {
  const hexValue = Math.floor(Math.random() * 256).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
}

const drawGrid = (grid) => {
  const tableNode = document.createElement("table");
  grid.forEach(row => {
    const rowNode = document.createElement("tr");
    row.forEach(color => {
      const cell = document.createElement("td");
      cell.style.backgroundColor = `#${color}`;
      rowNode.appendChild(cell);
    });
    tableNode.appendChild(rowNode);
  });
  return tableNode;
}

const regenerate = (parents) => {
  const mothers = parents.slice(0, parents.length / 2);
  const fathers = parents.slice(parents.length / 2, parents.length);
  const childrenOne = mothers.map((mother, idx) => breedGrids(mother, fathers[idx]));
  const childrenTwo = mothers.map((mother, idx) => breedGrids(mother, fathers[fathers.length - idx - 1]));
  return parents.concat(childrenOne).concat(childrenTwo);
}

const breedGrids = (motherGrid, fatherGrid) => {
  const selectTrait = (traitOne, traitTwo) => [traitOne, traitTwo][Math.floor(Math.random() * 2)];
  return blackTenByTenGrid.map((row, x) => {
    return row.map((cell, y) => {
      return selectTrait(motherGrid[x][y], fatherGrid[x][y]);
    });
  });
}

const fitness = isFitFunc => grid => {
  let score = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (isFitFunc(cell)) score += 1;
    });
  });
  return score;
}

const isReddish = (color) => {
  const {r, g, b} = parseHex(color);
  return g + b < r;
}

const isBluish = (color) => {
  const {r, g, b} = parseHex(color);
  return r + g < b;
}

const parseHex = (color) => {
  const r = parseInt(color.slice(0, 2), 16);
  const b = parseInt(color.slice(2, 4), 16);
  const g = parseInt(color.slice(4, 6), 16);
  return {r, g, b}
}

const redFitness = fitness(isReddish);
const blueFitness = fitness(isBluish);

const run = () => {

  let generation = Array.from(new Array(100), () => randomColorTenByTenGrid());
  console.log(generation.length)
  drawGrids(generation)
  for (let i = 0; i < 50; i += 1) {
    const rankedGrids = rankGrids(generation, blueFitness)
    drawGrids(rankedGrids)
    const culledGrids = rankedGrids.slice(0, rankedGrids.length / 2)
    drawGrids(culledGrids)
    generation = regenerate(culledGrids)
    drawGrids(generation)
  }
}

const drawGrids = (grids) => {
  console.log(grids.length)

  const gridsNode = document.getElementById("grids")
  grids.forEach(grid => {
    gridsNode.appendChild(drawGrid(grid));
  });
  const line = document.createElement("div");
  line.classList.add("line");
  gridsNode.append(line);
}

const rankGrids = (grids, fitnessFunc) => {
  return grids.sort((a, b) => fitnessFunc(b) - fitnessFunc(a));
}

run()


// const myGrid = randomColorTenByTenGrid()
// console.log(redFitness(myGrid))
// const nodeGrid = drawGrid(myGrid)

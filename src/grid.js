// Code dealing with creation of color grids

// x by y sized 2d array of 0s
const blackGrid = (x, y=x) => Array.from(new Array(x), () => Array.from(new Array(y), () => 0));

// takes 2d array and returns grid with each cell filled with random rgb hex value
const randomizeColors = grid => grid.map(row => row.map(cell => randomColor()));

// makes 10 by 10 sized 2d array of 0s
const blackTenByTenGrid = blackGrid(10);

// makes 10 by 10 sized 2d array of random rgb hex values
const randomColorTenByTenGrid = () => randomizeColors(blackTenByTenGrid)

// makes random rgb hex value
const randomColor = () => randomHex() + randomHex() + randomHex();

// makes random hex value
const randomHex = () => {
  const hexValue = Math.floor(Math.random() * 256).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
}

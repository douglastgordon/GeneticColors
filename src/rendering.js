// Code dealing with rendering of color grids on DOM

// takes array of color grids, draws and appends them to DOM
const drawGrids = grids => {
  grids.forEach(grid => {
    appendGrid(makeGrid(grid));
  });
  drawLine();
};

// creates HTML table from color grid
const makeGrid = grid => {
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
};

// appends grid to page
const appendGrid = grid => {
  const gridsNode = document.getElementById("grids");
  gridsNode.append(grid);
}

// draws a grid
const drawGrid = grid => appendGrid(makeGrid(grid));

// draw line
const drawLine = () => {
  const gridsNode = document.getElementById("grids")
  const line = document.createElement("div");
  line.classList.add("line");
  gridsNode.append(line);
}

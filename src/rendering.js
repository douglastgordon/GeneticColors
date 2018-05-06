// Code dealing with rendering of color grids on DOM

// takes array of color grids, draws and appends them to DOM
const drawGrids = (grids) => {
  const gridsNode = document.getElementById("grids")
  grids.forEach(grid => {
    gridsNode.appendChild(drawGrid(grid));
  });
  const line = document.createElement("div");
  line.classList.add("line");
  gridsNode.append(line);
};

// creates HTML table from color grid
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
};

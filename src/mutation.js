const mutate = grid => {
  const randomValueInRange = () => Math.floor(Math.random() * grid.length);
  const randomX = randomValueInRange();
  const randomY = randomValueInRange();
  const grid[randomX][randomY] = hexValue;
  return grid;
};

const mutateXTimes = (grid, mutations) => {
  for (let i = 0; i < mutations; i += 1) {
    grid = mutate(grid);
  }
  return grid;
};

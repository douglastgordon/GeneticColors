// code for mutating grids

// mutate one cell of one grid, returning grid
const mutate = grid => {
  const randomValueInRange = () => Math.floor(Math.random() * grid.length);
  const randomX = randomValueInRange();
  const randomY = randomValueInRange();
  grid[randomX][randomY] = randomColor();
  return grid;
};

// mutate grid x times, returning grid
const mutateXTimes = (mutations, grid) => {
  if (!mutations) return grid;
  return mutateXTimes(mutations - 1, mutate(grid));
};

const defaultMutate = grid => mutateXTimes(MUTATION_RATE, grid);

const mutate = grid => {
  const randomValueInRange = () => Math.floor(Math.random() * grid.length);
  const randomX = randomValueInRange();
  const randomY = randomValueInRange();
  const grid[randomX][randomY] = hexValue;
  return grid;
};

const mutateXTimes = (grid, mutations) => {
  if (!mutations) return grid;
  return mutateXTimes(mutate(grid), mutations - 1);
};

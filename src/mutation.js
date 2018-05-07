const mutate = grid => {
  const randomValueInRange = () => Math.floor(Math.random() * grid.length);
  const randomX = randomValueInRange();
  const randomY = randomValueInRange();
  const grid[randomX][randomY] = hexValue;
  return grid;
};

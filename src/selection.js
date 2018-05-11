// handle selection of population

// selects top 50% of population
const select = rankedPopulation => rankedPopulation.slice(0, rankedPopulation.length / 2);

// orders array of grids according to fitness, given fitness func
const rank = (grids, fitnessFunc) => {
  return grids.sort((a, b) => fitnessFunc(b) - fitnessFunc(a));
};

// ranks and selects half of population
const selectFittest = (population, fitnessFunc) => select(rank(population, fitnessFunc));

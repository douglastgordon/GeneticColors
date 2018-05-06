// Code for playthrough of genetic algorithm

const POPULATION = 500;
const GENERATIONS = 50;

const run = fitnessFunc => {
  let generation = Array.from(new Array(POPULATION), () => randomColorTenByTenGrid());
  drawGrids(generation)
  for (let i = 0; i < GENERATIONS; i += 1) {
    const rankedGrids = rankGrids(generation, similarityFitness);
    console.log("generation", i)
    console.log("best fitness score -> ", fitnessFunc(rankedGrids[0]), "average fitness score ->", fitnessFunc(rankedGrids[rankedGrids.length/2]), "worst fitness score ->", fitnessFunc(rankedGrids[rankedGrids.length -1]))
    const culledGrids = rankedGrids.slice(0, rankedGrids.length / 2)
    generation = regenerate(culledGrids)
    drawGrids(generation)
  }
};

run(similarityFitness)

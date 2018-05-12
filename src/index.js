// Code for playthrough of genetic algorithm

const FITNESS_FUNC = similarityToMondrian

// plays through lifecycle
const run = (population, generations) => {
  sideEffects(population, generations); // comment out to run in node
  if (!generations || meetsBreakCondition(population)) {
    logBreakdown(population, generations);
    return population;
  }
  return run(regenerate(selectFittest(population, FITNESS_FUNC)), generations - 1);
};

// log end of lifecycle
const logBreakdown = (population,  generations) => {
  console.log(`Met break condition afer ${GENERATIONS - generations} generations`);
  logGenerationInfo(population);
  drawGrids(population);
};

// return boolean when population meets break condition (defined inside)
const meetsBreakCondition = population => {
  const breakCondition = score => score >= AVERAGE_FITNESS_SCORE_TARGET;
  const rankedPopulation = rank(population, FITNESS_FUNC);
  const averageMember = rankedPopulation[rankedPopulation.length / 2];
  const averageFitness = FITNESS_FUNC(averageMember);
  return breakCondition(averageFitness)
};

// handle side effects for each generation
const sideEffects = (population, generations) => {
  console.log("generation #", GENERATIONS - generations);
  logGenerationInfo(population);
  if (generations % 50 === 0) {
    drawGrids(population);
  }
};

// log info about generation
const logGenerationInfo = population => {
  const rankedPopulation = rank(population, FITNESS_FUNC);
  console.log("most fit:", FITNESS_FUNC(rankedPopulation[0]));
  console.log("average fit:", FITNESS_FUNC(rankedPopulation[rankedPopulation.length / 2]));
  console.log("least fit:", FITNESS_FUNC(rankedPopulation[rankedPopulation.length - 1]));
  console.log("–--------------------------------------------------")
};

const initalPopulation = Array.from(new Array(POPULATION), () => randomColorGrid(GENE_SIZE));
run(initalPopulation, GENERATIONS);
// drawGrid()

// Code for playthrough of genetic algorithm

const run = (() => {
  let generation = Array.from(new Array(500), () => randomColorTenByTenGrid());
  drawGrids(generation)
  for (let i = 0; i < 50; i += 1) {
    console.log("generation", i)
    const rankedGrids = rankGrids(generation, differentFitness);
    console.log(differentFitness(rankedGrids[0]), differentFitness(rankedGrids[rankedGrids.length/2]), differentFitness(rankedGrids[rankedGrids.length -1]))
    // drawGrids(rankedGrids)
    const culledGrids = rankedGrids.slice(0, rankedGrids.length / 2)
    // drawGrids(culledGrids)
    generation = regenerate(culledGrids)
    drawGrids(generation)
  }
})();

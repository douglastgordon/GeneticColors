// code dealing with grid regeneration and breeding

// doubles generation through breeding
const regenerate = parents => {
  const children = parents.map((mother, idx) => {
    const availableMates = parents.slice(0, idx).concat(parents.slice(idx + 1));
    const father = availableMates.random();
    return breedGridsWithMutation(mother, father);
  });
  return parents.concat(children);
};

// creates child from two grids, each gene is randomly selected from parent
const breedGrids = (motherGrid, fatherGrid) => {
  const selectTrait = (traitOne, traitTwo) => [traitOne, traitTwo][Math.floor(Math.random() * 2)];
  return blackGrid(GENE_SIZE).map((row, x) => {
    return row.map((cell, y) => {
      return selectTrait(motherGrid[x][y], fatherGrid[x][y]);
    });
  });
};

const breedGridsWithMutation = (mother, father) => defaultMutate(breedGrids(mother, father));

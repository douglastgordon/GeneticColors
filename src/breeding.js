// code dealing with grid regeneration and breeding

// doubles generation through breeding
const regenerate = (parents) => {
  const children = [];
  const parentsLength = Array.from(new Array(parents.length), () => 0);
  parentsLength.forEach(idx => {
    const mother = parents.random();
    const father = parents.random();
    children.push(breedGrids(mother, father));
  });
  return parents.concat(children);
}

// creates child from two grids, each gene is randomly selected from parent
const breedGrids = (motherGrid, fatherGrid) => {
  const selectTrait = (traitOne, traitTwo) => [traitOne, traitTwo][Math.floor(Math.random() * 2)];
  return blackTenByTenGrid.map((row, x) => {
    return row.map((cell, y) => {
      return selectTrait(motherGrid[x][y], fatherGrid[x][y]);
    });
  });
}

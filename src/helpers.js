// File for ABSTRACT helpers

// selects element from array at random
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
}

// flattens 2d array to 1d
Array.prototype.flatten = function() {
  return this.reduce((acc, val) => acc.concat(val), []);
}

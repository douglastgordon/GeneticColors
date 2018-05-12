// File for ABSTRACT helpers

// selects element from array at random
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
}

// flattens 2d array to 1d
Array.prototype.flatten = function() {
  return this.reduce((acc, val) => acc.concat(val), []);
}

// sum elements of array of nums
Array.prototype.sum = function() {
  return this.reduce((acc, current) => acc + current);
}

// find mean of array of nums
Array.prototype.mean = function() {
  return this.sum() / this.length;
}

// find standard deviation of array
Array.prototype.standardDeviation = function() {
  return Math.sqrt(this.map(val => Math.pow(val - this.mean(), 2)).mean());
}

console.log([0,0,255,255,0].standardDeviation())

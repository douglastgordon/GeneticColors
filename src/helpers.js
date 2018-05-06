// File for ABSTRACT helpers

// selects element from array at random
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
}

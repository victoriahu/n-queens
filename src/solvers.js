/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// AT THE VERY BEGINNING
// create an all-true availableSquares array
//   create an array with the same shape as empty board, but filled with true instead of 0
// create an empty board of size n
// create root tree with availableSquares array and empty board as arguments

// NOTE: write window.Tree??
var Tree = function (board, availableSquares) {
  // assign board property to tree object
  // assign available squares property to tree object
  // assign children property to the tree object
  this.board = board;
  this.availableSquares = availableSquares;
  this.children = [];
};

// Define addChildren method of Tree 
Tree.prototype.addChildren = function () {
  // get rows
  // for each row
  //   for each colIndex
  //     if availableSquares is true
  //       update rows by setting current indices to 1
  //       create new board with rows array
  //       set availableSquares at current indices to false
  //       tree = new Tree(new board, new availableSquares)
  //       push new tree to children array

};

window.findNRooksSolution = function(n) {


  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

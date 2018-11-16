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




// NOTE: write window.Tree??
var Tree = function (board, availableSquares) {
  // assign board property to tree object
  // assign available squares property to tree object
  // assign children property to the tree object
  this.board = board;
  this.availableSquares = availableSquares;
  this.children = [];
};

Tree.prototype.deepCopy = function (arr) {
  var result = [];
  arr.forEach(row => result.push(row.slice()))
  return result;
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
  
  
  //var availableSquaresBoard = availableSquaresRows;
  var n = this.board.rows().length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var rows = this.deepCopy(this.board.rows());
      var availableSquaresRows = this.deepCopy(this.availableSquares.rows());
      if (availableSquaresRows[i][j] === 0) {
        rows[i][j] = 1;
        // Mark the current tree node's availableSquares board with 1
        this.availableSquares.togglePiece(i, j);
        availableSquaresRows[i][j] = 1;
        var newBoard = new Board(rows);
        var newAvailableSquares = new Board(availableSquaresRows);
        // var newAvailableSquaresBoard = new Board(availableSquaresRows);
        // var newAvailableSquares = 
        tree = new Tree(newBoard, newAvailableSquares);
        this.children.push(tree);
      }
    }
  }
};


window.findNRooksSolution = function(n) {
  // AT THE VERY BEGINNING
  // create an availableSquares board, an empty board of size n
  // create root tree with availableSquares array and empty board as arguments
  var solutions = [];
  var findSolutions = function (tree, numPieces) {
    // if tree.board has any conflict
    //   return
    // else if numPieces equals n
    //   push rows into solutions 
    //   return
    // add children to board
    // for each board's child
    //   run find solutions function on child and increase numPieces
    if (tree.board.hasAnyColConflicts() || tree.board.hasAnyRowConflicts()) {
      return;
    } else if (numPieces === n) {
      solutions.push(tree.board.rows());
      return;
    }
    tree.addChildren();
    tree.children.forEach(function(child) {
      findSolutions(child, numPieces + 1);
    });

  };

  // Invoke find solutions
  var availableSquares = new Board({n: n});
  var board = new Board({n: n});
  var root = new Tree(board, availableSquares);
  findSolutions(root, 0);
  
  var solution = solutions[0]; //fixme

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

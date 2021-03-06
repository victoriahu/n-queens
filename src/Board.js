// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //first get rows array from window.Board
      //set a count for the times a square is occupied in the same row
      //select the row that matches the argument rowIndex
      //for each square of the selected row
        //if the column has a piece in it
          //increment count by 1
          //if count = 2, then we return true
      //if we're done iterating and no conflicts return false
      
      var rows = this.rows();
      var count = 0;
      var row = rows[rowIndex];
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        } 
      }
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get rows array from window.board
      //for each row in rows
      //call .hasrowconflictat for that specific row
      //if hasrowconflictat returns true, then return true
      //if finish iterating and hasconflictat never returns true then return false
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        //this === instance of Board aka board
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // rows.forEach((row, i) => 
      //   if (.hasRowConflictAt(i)) {
      //     return true;
      //   }
      // )
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Get rows array from board
      // Initialize count to 0
      // For each row in rows
      //   if row[colIndex] equals 1
      //     increment count by 1
      //     if count equals 2
      //       return true
      // return false
      var rows = this.rows();
      var count = 0;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get rows from board
      // for each column index
      //   if current column has conflict 
      //     return true
      // return false
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // d = majorDiagonalColumnIndexAtFirstRow
      // intialize count to 0
      // for i from 0 to row.length - 1 - d
      //   if row[i][i + d] equals 1
      //     increment count
      //     if count equals 2
      //        return true
      // return false
      var rows = this.rows();
      var d = majorDiagonalColumnIndexAtFirstRow;
      var count = 0; 
      var n = rows.length;
      var ilast = n - 1 - d;
      if (ilast > n - 1) {
        ilast = n - 1;
      }
      for (var i = 0; i <= ilast; i++) {
        if (rows[i][i + d] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // get rows
      // n = rows.length
      // for d from -(n-1) up to but not including n 
      //   if hasMajorDConflict at d
      //     return true
      // return false

      var rows = this.rows();
      var n = rows.length;
      for (var d = -(n - 1); d < n; d++) {
        if (this.hasMajorDiagonalConflictAt(d)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // d = majorDiagonalColumnIndexAtFirstRow
      // intialize count to 0
      // for i from 0 to row.length - 1 - d
      //   if row[i][i + d] equals 1
      //     increment count
      //     if count equals 2
      //        return true
      // return false
      var rows = this.rows();
      var d = minorDiagonalColumnIndexAtFirstRow;
      var count = 0; 
      var n = rows.length;
      var ilast = d;
      if (ilast > n - 1) {
        ilast = n - 1;
      }
      for (var i = 0; i <= ilast; i++) {
        if (rows[i][d - i] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // get rows
      // n = rows.length
      // for d from -(n-1) up to but not including n 
      //   if hasMajorDConflict at d
      //     return true
      // return false

      var rows = this.rows();
      var n = rows.length;
      for (var d = 0; d <= 2 * (n - 1); d++) {
        if (this.hasMinorDiagonalConflictAt(d)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

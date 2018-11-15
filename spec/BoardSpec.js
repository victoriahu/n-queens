describe('Board', function() {
  
  describe('Stephen and Vicky\'s Custom Tests', function() {
    // Rows
    it('should detect board conflict for a specific row', function() {
      var board = new Board({n:3});
      board.togglePiece(0,1);
      board.togglePiece(0,0);
      expect(board.hasRowConflictAt(0)).to.be.equal(true);
    });
    it('should detect if there are no board conflicts for a specific row', function() {
      var board = new Board({n:3});
      expect(board.hasRowConflictAt(0)).to.be.equal(false);
    });
    it('should detect any board row conflicts', function() {
      var board = new Board({n:3});
      board.togglePiece(0,1);
      board.togglePiece(0,0);
      expect(board.hasAnyRowConflicts()).to.be.equal(true);
    });
    it('should detect if there are no board row conflicts', function() {
      var board = new Board({n:3});
      expect(board.hasAnyRowConflicts()).to.be.equal(false);
    });
    
    // Columns
    it('should detect board conflict for a specific column', function() {
      var board = new Board({n:3});
      board.togglePiece(0,0);
      board.togglePiece(1,0);
      expect(board.hasColConflictAt(0)).to.be.equal(true);
    });
    it('should detect any board col conflicts', function() {
      var board = new Board({n:3});
      board.togglePiece(0,0);
      board.togglePiece(1,0);
      expect(board.hasAnyColConflicts()).to.be.equal(true);
    });
    //Major Diagonal Conflict
    it('should not detect minor diagonal conflict', function() {
      var board = new Board({n:3});
      board.togglePiece(0,2);
      board.togglePiece(1,1);
      board.togglePiece(2,0);
      expect(board.hasAnyMajorDiagonalConflicts()).to.be.equal(false);
    });
    
    // Minor Diagonal Conflict
    it('should detect minor diagonal conflict', function() {
      var board = new Board({n:3});
      board.togglePiece(0,2);
      board.togglePiece(1,1);
      board.togglePiece(2,0);
      expect(board.hasMinorDiagonalConflictAt(2)).to.be.equal(true);
    });
  });
  
  
  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});

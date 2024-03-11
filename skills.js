function calculateNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Arguments must not be NaN');
    }
  
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error('Arguments must be finite numbers');
    }
  
    return a + b;
  }

  module.exports = { calculateNumbers };
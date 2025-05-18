class Helper {
  /**
   * Format date to a readable string
   * @param {Date} date - Date to format
   * @returns {string} Formatted date string
   */
  static formatDate(date) {
    if (!date) return '';
    
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(date).toLocaleDateString('tr-TR', options);
  }
  
  /**
   * Generate a random application ID similar to the frontend pattern
   * @returns {string} Random ID
   */
  static generateApplicationId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  /**
   * Sanitize user input to prevent injection
   * @param {string} input - User input
   * @returns {string} Sanitized input
   */
  static sanitizeInput(input) {
    if (!input) return '';
    return input.replace(/[<>]/g, '');
  }
}

module.exports = Helper;
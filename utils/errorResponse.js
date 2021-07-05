class ErrorResponse extends Error {
  constructor(message, statuseCode) {
      super(message)
      this.statuseCode = statuseCode
  }
}

module.exports = ErrorResponse
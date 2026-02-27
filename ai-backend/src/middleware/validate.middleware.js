/**
 * Validates that required fields are present in the request body.
 * @param {string[]} fields - Array of required field names
 * @returns {Function} Express middleware
 */
export const validateBody = (fields) => (req, res, next) => {
  const missing = fields.filter((field) => req.body[field] == null || req.body[field] === "");
  if (missing.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: `Missing or empty: ${missing.join(", ")}`,
    });
  }
  next();
};

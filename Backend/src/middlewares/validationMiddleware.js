export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    res.status(400);
    return res.json({
      errors: e.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
  }
};

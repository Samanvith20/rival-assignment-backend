export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  // PostgreSQL Unique Constraint
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message:
        "Task with this title already exists",
    });
  }

  return res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
}; 

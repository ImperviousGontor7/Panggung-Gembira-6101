// ======================================================
// VALIDATION MIDDLEWARE
// ======================================================

function formatIssues(issues = []) {
  return issues.map((issue) => ({
    path: issue.path,
    message: issue.message,
    code: issue.code,
  }));
}

export function validate(
  schema,
  source = "body",
) {
  return (
    req,
    res,
    next,
  ) => {
    const input =
      req[source] ?? {};

    const result =
      schema.safeParse(
        input,
      );

    if (!result.success) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Validation error.",

          details:
            formatIssues(
              result.error.issues,
            ),
        });
    }

    req.validated =
      req.validated || {};

    req.validated[source] =
      result.data;

    return next();
  };
}

export function validateBody(
  schema,
) {
  return validate(
    schema,
    "body",
  );
}

export function validateQuery(
  schema,
) {
  return validate(
    schema,
    "query",
  );
}

export function validateParams(
  schema,
) {
  return validate(
    schema,
    "params",
  );
}

export default {
  validate,
  validateBody,
  validateQuery,
  validateParams,
};
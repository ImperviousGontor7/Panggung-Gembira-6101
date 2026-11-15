// ======================================================
// ASYNC HANDLER
// ======================================================

function asyncHandler(
  fn,
) {
  return function asyncHandlerMiddleware(
    req,
    res,
    next,
  ) {
    return Promise
      .resolve(
        fn(
          req,
          res,
          next,
        ),
      )
      .catch(next);
  };
}

export {
  asyncHandler,
};

export default asyncHandler;
const handleError = handler => async (res, req, next) => {
  try {
    await handler(res, req, next);
  } catch (error) {
    next(error);
  }
};

export default handleError;

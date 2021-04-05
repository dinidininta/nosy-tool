// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, req, res, _) => {
  const errorJSON = {
    statusCode: error.code,
    message: error.message
  };

  return res.status(error.code).send(errorJSON);
};

export default errorMiddleware;

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, req, res, _) => {
  const errorJSON = {
    statusCode: error.statusCode,
    message: error.message
  };

  return res.status(error.statusCode).send(errorJSON);
};

export default errorMiddleware;

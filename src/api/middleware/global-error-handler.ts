import { Request, Response, NextFunction } from "express";

const GlobalErrorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.name) {
    case "ValidationError":
      console.log(error);
      res.status(400).json({
        message: error.message
          .replaceAll(/[/" ]/g, "")
          .replaceAll(/[\n ]/g, " "),
      });
      break;

    case "Unauthenticated":
      console.log(error);
      res
        .status(401)
        .json({ message: error.message.replaceAll(/[\n/" ]/g, "") });
      break;

    case "ForbiddenError":
      console.log(error);
      res.status(403).json({ message: error.message.replaceAll("\n", "") });
      break;

    case "NotFoundError":
      console.log(error);
      res.status(404).json({ message: error.message.replaceAll("\n", "") });
      break;

    default:
      console.log(error);
      res.status(500).json({ message: error.message.replaceAll("\n", "") });
      break;
  }

  //   console.log(
  //     "Oops! Error occurred, message from GlobalErrorHandlingMiddleware"
  //   );
};

export default GlobalErrorHandlingMiddleware;

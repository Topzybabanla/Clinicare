import { ZodError } from "zod";

export const validateFormData = (schema) => (req, res, next) => {
  try {
    // receive and transfrom data gotten from the client through the req.body
    const parsedData = schema.parse(req.body);
    
    req.body = parsedData; //transformed data with no error
    next(); //call the next action that supposed to happen - invoke the api function
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      return res.status(400).json({
        error: "Vaidation failed",
        details: errorMessages,
      });
    }
    next(error); //pass error to the next handler
  }
};

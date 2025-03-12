import logger from "./logger";
import { webhookHandler } from "./webHookHandler";

export const errorHandler = async (err: unknown, message: string) => {
  let error, stack;
  if (err) {
    error = err as Error;
    stack = JSON.stringify(error, Object.getOwnPropertyNames(error));
    logger.error(error?.message, message);
  } else {
    logger.error(message);
  }
  webhookHandler(`Error message`, error?.message || message || "no message", stack);
};

import { Handler, APIGatewayEvent } from "aws-lambda";
import {
  handle,
  RequestBodyParseFailed,
  UnprocessableRequestBody,
} from "@callback/handler";
import { SignatureMismatch } from "@callback/signature";

export const handler: Handler<APIGatewayEvent> = async (
  event,
  _context,
  _callback
) => {
  try {
    const result = await handle(event.headers, event.body ?? "");
    return {
      statusCode: 200,
      body: result,
    };
  } catch (e) {
    if (e instanceof SignatureMismatch) {
      return {
        statusCode: 403,
        body: e.message,
      };
    }
    if (e instanceof RequestBodyParseFailed) {
      return {
        statusCode: 400,
        body: e.message,
      };
    }
    if (e instanceof UnprocessableRequestBody) {
      return {
        statusCode: 400,
        body: e.message,
      };
    }

    throw e;
  }
};

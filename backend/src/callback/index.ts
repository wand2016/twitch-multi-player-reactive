import { Handler, APIGatewayEvent } from "aws-lambda";
import { handle } from "@callback/handler";

export const handler: Handler<APIGatewayEvent> = async (
  event,
  _context,
  _callback
) => {
  const result = await handle(event.headers, event.body ?? "");
  return {
    statusCode: 200,
    body: result,
  };
};

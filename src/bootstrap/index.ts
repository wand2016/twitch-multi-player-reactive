import WebSocket from "ws";
import { deleteSubscriptions } from "@/subscriptions";
import { registerWs } from "@/registry";

export default async function (ws: WebSocket) {
  registerWs(ws);

  ws.on("message", (msg) => {
    console.log(msg);
    ws.send(`reply to ${msg}`);
  });

  await deleteSubscriptions();
}

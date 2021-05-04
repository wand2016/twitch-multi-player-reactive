import WebSocket from "ws";
import { registerWs } from "@/registry";

export default async function (ws: WebSocket) {
  registerWs(ws);

  ws.on("message", (msg) => {
    if (msg === "ping") {
      ws.send("pong");
      return;
    }
  });
}

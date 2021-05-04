import WebSocket from "ws";

type Registry = {
  ws: WebSocket | null;
};

const registry: Registry = {
  ws: null,
};

export function registerWs(ws: WebSocket) {
  registry.ws = ws;
}

export function getWs() {
  if (!registry.ws) {
    throw new Error("WebSocketインスタンスがセットされていません");
  }
  return registry.ws;
}

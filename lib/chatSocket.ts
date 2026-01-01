// lib/chatSocket.ts
let socket: WebSocket | null = null;

export const connectChatSocket = (
  roomId: number,
  token: string,
  onMessage: (data: any) => void
) => {
  const url = `ws://10.10.13.80:8002/ws/chat/${roomId}/?token=${token}`;

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("✅ WS connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      console.log("❌ WS parse error", e);
    }
  };

  socket.onerror = (e) => {
    console.log("❌ WS error", e);
  };

  socket.onclose = () => {
    console.log("🔌 WS disconnected");
  };

  return socket;
};

export const sendChatMessage = (payload: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

export const disconnectChatSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

import { io, Socket } from "socket.io-client"
let socket: Socket | null = null
export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
      transports: ["websocket"]
    })

    socket.on("connect", () => {
      console.log("🔌 Connected to WebSocket server")
    })

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket server")
    })
  }
  return socket
}

import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8001';

class SocketService {
  socket;

  connect() {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(event, func) {
    if (this.socket) {
      this.socket.on(event, func);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;

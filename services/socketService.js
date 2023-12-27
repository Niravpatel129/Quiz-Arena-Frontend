import io from 'socket.io-client';

const IS_PRODUCTION = process.env.EXPO_PUBLIC_PROD_BACKEND || process.env.NODE_ENV === 'production';
const SOCKET_URL = IS_PRODUCTION
  ? 'https://quiz-arena-backend-96d07772fd89.herokuapp.com'
  : 'ws://localhost:8001';

console.log('🚀  SOCKET_URL:', SOCKET_URL);
class SocketService {
  socket;

  connect() {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      secure: true,
      withCredentials: true,
    });

    this.socket.on('connection', () => {
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

import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { createNotification } from './dto/create-nnotification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
@WebSocketGateway({
  cors: {
    // origin: (origin, callback) => {
    //   const allowedOrigins = [
    //     'http://localhost:3636', // FE khách hàng
    //     // 'http://localhost:8080', // Admin dashboard
    //   ];
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: '*',
    credentials: true,
  },
})
export class orderNotificationGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly notificationsService: NotificationsService) {}

  // Admin join phòng quản lý
  @SubscribeMessage('join_admin_room')
  handleJoinAdminRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Khi người dùng join room admin, sẽ không có thông báo gì cả
    // Chỉ có admin mới join room này
    console.log(`Client ${client.id} joined room: ${room}`);
    client.join(room);
  }

  // Xử lý đơn hàng mới
  @SubscribeMessage('new_order')
  async handleNewOrder(
    @MessageBody() message: createNotification,
    client: Socket,
  ) {
    // Tạo hai bản ghi thông báo: một cho admin và một cho người dùng
    const messageText =
      message.payment_method === 'COD'
        ? `Đơn hàng ${message.order_code} vừa đặt hàng thành công với phương thức thanh toán tiền mặt khi nhận hàng. Vui lòng chờ xác nhận từ cửa hàng.`
        : `Đơn hàng ${message.order_code} vừa được đặt thành công với phương thức thanh toán là ${message.payment_method}.`;

    const createdNotification = await this.notificationsService.create({
      title: 'Đơn hàng mới',
      message: messageText,
      user_redirect_url: message.user_redirect_url ?? '',
      admin_redirect_url: message.admin_redirect_url ?? '',
      user_id: message.user_id ?? 0,
    });

    // Emit về phòng admin
    this.server.to('admin').emit(
      'notify_new_order',
      createdNotification.data.find((n) => n.receiver_role === 'ADMIN'),
    );

    // Emit về phòng người dùng
    if (message.user_id) {
      this.server.to(`user_${message.user_id}`).emit(
        'notify_user',
        createdNotification.data.find((n) => n.receiver_role === 'USER'),
      );
    }
  }

  // Người dùng join phòng riêng
  @SubscribeMessage('join_user_room')
  handleJoinUserRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Khi người dùng join room riêng của mình, sẽ không có thông báo gì cả
    // Chỉ có người dùng mới join room này
    console.log(`Client ${client.id} joined user room: ${room}`);
    client.join(room);
  }

  @SubscribeMessage('connection')
  handleHelo(@MessageBody() message: string) {
    console.log('Client connected:', message);
  }
}

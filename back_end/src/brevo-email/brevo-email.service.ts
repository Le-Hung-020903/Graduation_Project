import { Injectable } from '@nestjs/common';
import {
  Configuration,
  TransactionalEmailsApi,
  SendSmtpEmail,
} from '@getbrevo/brevo';

@Injectable()
export class BrevoEmailService {
  private readonly apiInstance: TransactionalEmailsApi;

  //   constructor() {
  //     const config = new Configuration({
  //       apiKey: process.env.BREVO_API_KEY || 'YOUR_FALLBACK_KEY',
  //     });

  //     this.apiInstance = new TransactionalEmailsApi(config);
  //   }

  //   async sendOrderConfirmation(
  //     toEmail: string,
  //     toName: string,
  //     htmlContent: string,
  //   ) {
  //     const email = new SendSmtpEmail();
  //     email.subject = 'Xác nhận đơn hàng';
  //     email.htmlContent = htmlContent;
  //     email.sender = {
  //       name: 'Shop thực phẩm sạch Minh Anh',
  //       email: 'lehung020903@gmail.com',
  //     };
  //     email.to = [
  //       {
  //         email: toEmail,
  //         name: toName,
  //       },
  //     ];
  //     try {
  //       const res = await this.apiInstance.sendTransacEmail(email);
  //       return { success: true, data: res };
  //     } catch (e) {
  //       console.error('Error sending email:', e);
  //       return { success: false, error: e };
  //     }
  //   }
}

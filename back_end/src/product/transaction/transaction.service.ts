import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    let amount_in: number = 0;
    let amount_out: number = 0;

    if (createTransactionDto.transferType === 'in') {
      amount_in = createTransactionDto.transferAmount;
    } else if (createTransactionDto.transferType === 'out') {
      amount_out = createTransactionDto.transferAmount;
    }
    const order = await this.orderRepository.findOne({
      where: {
        order_code: createTransactionDto.content,
        final_price: createTransactionDto.transferAmount,
        payment_status: 'UNPAID',
      },
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    const transaction = await this.transactionRepository.create({
      id_sepay: createTransactionDto.id,
      gateway: createTransactionDto.gateway,
      transaction_date: new Date(createTransactionDto.transactionDate),
      account_number: createTransactionDto.accountNumber,
      code: createTransactionDto.code,
      transaction_content: createTransactionDto.content,
      amount_out: amount_out,
      amount_in: amount_in,
      accumulated: createTransactionDto.accumulated,
      sub_account: createTransactionDto.subAccount,
      reference_number: createTransactionDto.referenceCode,
      body: createTransactionDto.description,
    });
    await this.transactionRepository.save(transaction);

    await this.orderRepository.update(order.id, {
      payment_status: 'PAID',
    });
    return {
      success: true,
      message: 'Thêm giao dịch thành công',
    };
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

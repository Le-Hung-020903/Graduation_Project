import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly commentRepository: Repository<Comment>;
  @InjectRepository(Order) private readonly orderRepository: Repository<Order>;
  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    files: Express.Multer.File[],
  ): Promise<{
    success: boolean;
    message: string;
    data?: Comment & { hasPurchased: boolean };
  }> {
    const parentComment = createCommentDto.parent_id
      ? await this.commentRepository.findOne({
          where: { id: createCommentDto.parent_id },
        })
      : null;

    const comment = await this.commentRepository.create({
      content: createCommentDto.content,
      rating: createCommentDto.rating,
      parent: parentComment,
      product: { id: createCommentDto.product_id },
      user: { id: userId },
    });

    await this.commentRepository.save(comment);

    const newComment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id: comment.id })
      .select([
        'comment.id',
        'comment.content',
        'comment.rating',
        'comment.image_url',
        'comment.created_at',
        'user.id',
        'user.name',
      ])
      .getOne();

    // Kiểm tra user đó đã từng mua sản phẩm chưa
    const delivered = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.orderDetails', 'detail')
      .where('order.user = :userId', { userId })
      .andWhere('detail.product = :productId', {
        productId: createCommentDto.product_id,
      })
      .andWhere('order.status = :status', { status: 'DELIVERED' })
      .getOne();

    const hasPurchased = !!delivered;
    if (!newComment) {
      return {
        success: false,
        message: 'Thêm bình luận không thành công',
      };
    }
    return {
      success: true,
      message: 'Thêm bình luận thành công',
      data: {
        ...newComment,
        hasPurchased,
      },
    };
  }

  async findAll(
    page: number,
    limit: number,
    productId: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: Comment[] & { hasPurchased?: boolean }[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const skip = (page - 1) * limit;

    const [comments, total] = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.user', 'user')
      .where('comment.product = :productId', { productId })
      .select([
        'comment.id',
        'comment.content',
        'comment.rating',
        'comment.image_url',
        'comment.created_at',
        'user.id',
        'user.name',
        'user.avatar',
      ])
      .orderBy('comment.created_at', 'DESC')
      .offset(skip)
      .limit(limit)
      .getManyAndCount();

    // Lấy userIds duy nhất từ comment
    const userIdSet = new Set(comments.map((item) => item.user.id));
    const userIds = Array.from(userIdSet);
    if (userIds.length === 0) {
      return {
        success: false,
        message: 'Hãy thêm ý kiến của mọi người về sản phẩm này nha',
        data: [],
        pagination: {
          total: 0,
          page: page,
          limit: limit,
          totalPages: 0,
        },
      };
    }

    // Truy vấn kiểm tra ai đã mua sản phẩm này (DELIVERED)
    const deliveredOrders = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.orderDetails', 'detail')
      .where('order.user IN (:...userIds)', { userIds })
      .andWhere('detail.product = :productId', { productId })
      .andWhere('order.status = :status', { status: 'DELIVERED' })
      .select('order.user', 'userId')
      .groupBy('order.user')
      .getRawMany();

    //➡️ Chuyển kết quả thành Set để kiểm tra nhanh người nào đã mua.
    const purchasedUserIds = new Set(
      deliveredOrders.map((item) => item.userId),
    );

    // ➡️ Duyệt qua từng comment, thêm trường hasPurchased: true/false vào kết quả, dựa trên user ID có nằm trong danh sách purchasedUserIds hay không.
    const result = comments.map((item) => {
      return {
        ...item,
        hasPurchased: purchasedUserIds.has(item.user.id),
      };
    });
    return {
      success: true,
      message: 'Lấy bình luận thành công',
      data: result,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCommentFiveStar(): Promise<{
    success: boolean;
    message: string;
    data: Comment[];
  }> {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.rating = :rating', { rating: 5 })
      .distinctOn(['comment.user_id']) // mỗi user 1 comment
      .orderBy('comment.user_id', 'ASC') // cần để distinctOn hoạt động chính xác
      .addOrderBy('comment.created_at', 'DESC') // lấy bình luận mới nhất của mỗi user
      .select([
        'comment.id',
        'comment.content',
        'comment.rating',
        'comment.image_url',
        'user.name',
        'user.avatar',
      ])
      .limit(3) // giới hạn 3 người dùng
      .getMany();

    return {
      success: true,
      message: 'Lấy bình luận 5 sao thành công',
      data: comments,
    };
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

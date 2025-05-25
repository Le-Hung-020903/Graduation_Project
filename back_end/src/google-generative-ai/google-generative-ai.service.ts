import { Injectable } from '@nestjs/common';
import { CreateGoogleGenerativeAiDto } from './dto/create-google-generative-ai.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleGenerativeAiService {
  private readonly genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
  ) {
    const apiKey = process.env.GOOGLE_GENERATIVE_API_KEY || 'YOUR_FALLBACK_KEY';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async chatbotAI(createGoogleGenerativeAiDto: CreateGoogleGenerativeAiDto) {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });
    const product = await this.product
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('variants.unit', 'unit')
      .select([
        'product.id',
        'product.name',
        'product.slug',
        'variants.price',
        'images.url',
        'unit.name',
      ])
      .getMany();
    const filterProduct = product.map((item) => {
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        variants: item.variants[0]?.price || 0,
        unit: item.variants[0]?.unit?.name || '',
        image: item.images[0]?.url || '',
      };
    });

    const prompt = `
    Bạn là một trợ lý AI thông minh chuyên tư vấn thông tin về thực phẩm sạch tại Việt Nam.
    
    Dưới đây là danh sách sản phẩm hiện có trong cửa hàng, bao gồm tên, giá, đơn vị và ảnh:
    ${JSON.stringify(filterProduct)}
    
    Người dùng vừa hỏi: "${createGoogleGenerativeAiDto.question}"
    
    Yêu cầu:
    - Nếu câu hỏi liên quan đến sản phẩm (ví dụ: giá, loại, tên, món ăn, gợi ý món ăn...), hãy trả lời ngắn gọn. Sau đó, **hiển thị các sản phẩm liên quan dưới dạng HTML** với cấu trúc:
    <figure class="product-card">
      <a href="/{slug}">
        <img src="{image}" alt="{name}"/>
      </a>
      <figcaption>
        <a href="/{slug}">{name} - </a><br/>
        <span>{variants} {unit}</span>
      </figcaption>
    </figure>
    
    - Nếu câu hỏi không liên quan đến sản phẩm, hãy trả lời bằng kiến thức chung phù hợp nhất, không cần chèn HTML.
    - Không sử dụng dấu \`\`\` hoặc markdown trong phản hồi.
    - Trả lời bằng **HTML thuần** nếu có sản phẩm.
    
    Trả lời ngắn gọn, súc tích, dễ hiểu và thân thiện.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return {
      data: text,
    };
  }
}

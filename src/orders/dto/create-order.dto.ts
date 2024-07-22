import { IsString, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  serviceId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  totalPrice: number;
}

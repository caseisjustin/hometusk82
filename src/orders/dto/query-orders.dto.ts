import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class QueryOrdersDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minTotalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxTotalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}

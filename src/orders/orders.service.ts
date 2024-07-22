import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(query: QueryOrdersDto): Promise<{ data: Order[], total: number }> {
    const { userId, serviceId, minTotalPrice, maxTotalPrice, page = 0, limit = 10 } = query;

    const filters: any = {};
    if (userId) {
      filters.userId = userId;
    }
    if (serviceId) {
      filters.serviceId = serviceId;
    }
    if (minTotalPrice !== undefined) {
      filters.totalPrice = { ...filters.totalPrice, $gte: minTotalPrice };
    }
    if (maxTotalPrice !== undefined) {
      filters.totalPrice = { ...filters.totalPrice, $lte: maxTotalPrice };
    }

    const data = await this.orderModel.find(filters)
      .skip(page * limit)
      .limit(limit)
      .exec();

    const total = await this.orderModel.countDocuments(filters).exec();

    return { data, total };
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: any): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}

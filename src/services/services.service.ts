import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { QueryServicesDto } from './dto/query-services.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(query: QueryServicesDto): Promise<{ data: Service[], total: number }> {
    const { name, minPrice, maxPrice, page = 0, limit = 10 } = query;

    const filters: any = {};
    if (name) {
      filters.name = { $regex: name, $options: 'i' };
    }
    if (minPrice !== undefined) {
      filters.price = { ...filters.price, $gte: minPrice };
    }
    if (maxPrice !== undefined) {
      filters.price = { ...filters.price, $lte: maxPrice };
    }

    const data = await this.serviceModel.find(filters)
      .skip(page * limit)
      .limit(limit)
      .exec();

    const total = await this.serviceModel.countDocuments(filters).exec();

    return { data, total };
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: any): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Service> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}

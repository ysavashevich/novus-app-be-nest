import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User as UserModel } from './user.model';

// export type User = {
//   userId: number;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   fullName: string;
//   userType: string;
// };

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}
  // private readonly users = [];

  async findAll(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  async findOne(email: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: any) {
    return this.userModel.create(user);
  }
}

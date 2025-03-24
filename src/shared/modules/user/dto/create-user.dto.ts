import { UserTypeEnum } from '../../../types/index.js';

export class CreateUserDto {
  public email: string;
  public avatar: string;
  public name: string;
  public userType: UserTypeEnum;
  public password: string;
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TLoginDto } from './dto/login.dto';
import { TRegisterDto } from 'src/modules/auth/dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) { }

  /**
   * Register a new user
   * Utiliza o userService para criar o usuário
   * @param registerDto 
   * @returns 
   */
  register(registerDto: TRegisterDto) {
    return this.userService.upsert(registerDto, [], 1);
  }

  /**
   * Login a user
   * @param loginDto 
   * @returns 
   */
  async login(loginDto: TLoginDto) {
    const user = await this.userService.getBy('email', loginDto.email);
    if (!user) {
      throw new UnprocessableEntityException({
        message: 'Usuário não encontrado',
      });
    }

    //check password
    const hash = crypto.createHash('md5').update(loginDto.password).digest('hex');
    if (hash !== user.password) {
      throw new UnprocessableEntityException({
        message: 'Senha inválida',
      });
    }

    return user;
  }
}

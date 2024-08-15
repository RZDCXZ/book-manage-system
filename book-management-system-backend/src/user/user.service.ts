import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
  @Inject(DbService)
  private dbService: DbService

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read()

    const foundUser = users.find((u) => u.username === registerUserDto.username)

    if (foundUser) throw new BadRequestException('用户已注册')

    const newUser = new User()
    newUser.username = registerUserDto.username
    newUser.password = registerUserDto.password
    users.push(newUser)

    await this.dbService.write(users)

    return newUser
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read()

    const foundUser = users.find((u) => u.username === loginUserDto.username)

    if (!foundUser) throw new BadRequestException('没有该用户,请先注册')

    if (foundUser.password !== loginUserDto.password)
      throw new BadRequestException('用户名或密码错误')

    return foundUser
  }
}

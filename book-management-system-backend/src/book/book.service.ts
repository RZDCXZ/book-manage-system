import { UpdateBookDto } from './dto/update-book.dto'
import { CreateBookDto } from './dto/create-book.dto'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { Book } from './entity/book.entity'

function randomNum() {
  return Math.floor(Math.random() * 1000000)
}

@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService

  async list(name: string) {
    const books: Book[] = await this.dbService.read()
    return name ? books.filter((b) => b.name.includes(name)) : books
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read()

    const foundBook = books.find((b) => b.id === id)

    if (!foundBook) throw new BadRequestException('没有该书')

    return foundBook
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read()

    const foundBook = books.find((b) => b.name === createBookDto.name)

    if (foundBook) throw new BadRequestException('已有该书')

    const newBook = new Book()
    newBook.id = randomNum()
    newBook.name = createBookDto.name
    newBook.author = createBookDto.author
    newBook.description = createBookDto.description
    newBook.cover = createBookDto.cover

    books.push(newBook)

    await this.dbService.write(books)

    return newBook
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read()

    const foundBook = books.find((b) => b.id === updateBookDto.id)

    if (!foundBook) throw new BadRequestException('没有该书')

    foundBook.name = updateBookDto.name
    foundBook.author = updateBookDto.author
    foundBook.description = updateBookDto.description
    foundBook.cover = updateBookDto.cover

    await this.dbService.write(books)

    return foundBook
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read()

    const index = books.findIndex((b) => b.id === id)

    if (index === -1) throw new BadRequestException('没有该书')

    books.splice(index, 1)

    await this.dbService.write(books)

    return '删除成功'
  }
}

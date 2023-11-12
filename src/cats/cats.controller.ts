import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats-service';
import { Cat } from './interfaces/cat.interface';
import { CatByIdPipe } from './cat-by-id/cat-by-id.pipe';

@Controller('cats')
export class CatsController {
  /**
   * @param catsService 자동으로 주입되는 서비스
   */
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new CatByIdPipe()) id: number): string {
    return `meowingtone #${id}`;
  }

  @Get('breed')
  findBreed(): string {
    return 'you requested breed!';
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}

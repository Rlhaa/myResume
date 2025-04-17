import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './entities/memo.entity';

@Injectable()
export class MemosRepository {
  constructor(
    @InjectRepository(Memo) private memoRepository: Repository<Memo>,
  ) {}
}

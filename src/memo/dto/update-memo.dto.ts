// src/memo/dto/update-memo.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateMemoDto } from './create-memo.dto';

export class UpdateMemoDto extends PartialType(CreateMemoDto) {}

import { IsBoolean, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  title:string;

  @IsString()
  photo:string;

  @IsBoolean()
  isPublish:boolean;
}
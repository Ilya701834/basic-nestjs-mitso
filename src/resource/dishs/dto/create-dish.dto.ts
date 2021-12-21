import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDishDto {
  @IsString()
  title:string;

  @IsString()
  description: string

  @IsString()
  photo:string;

  @IsBoolean()
  isPublish:boolean;

  @IsArray()
  ingredients:string[];

  @IsInt()
  price:number;

  @IsOptional()
  @IsUUID(4)
  categoryId!:string | null;
}
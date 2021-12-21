import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsUUID(4)
  menuId!:string | null

  @IsString()
  public title:string

  @IsString()
  photo:string

  @IsBoolean()
  isVisible:boolean
}
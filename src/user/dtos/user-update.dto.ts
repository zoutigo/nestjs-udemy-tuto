import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @MinLength(2, {
    message: 'Le prénom doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le prénom doit avoir 30 caractères maximum',
  })
  firstname: string;

  @IsOptional()
  @MinLength(2, {
    message: 'Le nom doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le nom doit avoir 30 caractères maximum',
  })
  lastname: string;

  @IsOptional()
  @MinLength(2, {
    message: 'Le mail doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le mail doit avoir 30 caractères maximum',
  })
  @IsEmail()
  email: string;

  roleId?: number;
}

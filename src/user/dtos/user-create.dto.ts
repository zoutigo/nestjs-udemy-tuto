import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({
    message: 'le prénom est obligatoire',
  })
  @MinLength(2, {
    message: 'Le prénom doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le prénom doit avoir 30 caractères maximum',
  })
  firstname: string;

  @IsNotEmpty({
    message: 'le nom est obligatoire',
  })
  @MinLength(2, {
    message: 'Le nom doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le nom doit avoir 30 caractères maximum',
  })
  lastname: string;

  @IsNotEmpty({
    message: 'le mail est obligatoire',
  })
  @MinLength(2, {
    message: 'Le mail doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le mail doit avoir 30 caractères maximum',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  roleId: number;
}

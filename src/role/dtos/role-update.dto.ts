import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class RoleUpdateDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'le nom du role est obligatoire',
  })
  @MinLength(2, {
    message: 'Le nom du role doit avoir 2 caractères minimum',
  })
  @MaxLength(30, {
    message: 'Le nom du role doit avoir 30 caractères maximum',
  })
  name: string;
  permissions?: number[];
}

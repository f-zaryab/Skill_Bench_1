import { IsIn, IsOptional } from 'class-validator';

export class FindCategoriesQueryDTO {
  @IsOptional()
  @IsIn(['testPackages'])
  include?: 'testPackages';
}

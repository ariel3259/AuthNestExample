import { ValidatorOptions } from 'class-validator';
import { ValidationError } from 'sequelize';

export default interface ValidatorPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

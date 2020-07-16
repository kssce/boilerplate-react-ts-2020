import { FieldErrors } from 'react-hook-form';

export interface AccountFormable {
  field: string;
  label: string;
}

export interface FormableError {
  errors: FieldErrors<any>;
  field: string;
}

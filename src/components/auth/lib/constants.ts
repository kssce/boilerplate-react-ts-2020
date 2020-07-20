import { AccountFormable } from './data';
import { CredentialFields } from '../../../models/ServerFields';

export const ID: AccountFormable = {
  field: CredentialFields.id,
  label: 'ID',
};
export const PW: AccountFormable = {
  field: CredentialFields.pw,
  label: 'PW',
};

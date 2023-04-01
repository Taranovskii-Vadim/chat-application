import { User } from 'src/store/types';

import { CommonUserDTO } from './types';

export const mapUserDTO = ({ id, name, lastname }: CommonUserDTO): User => ({
  id,
  fullname: `${lastname} ${name}`,
});

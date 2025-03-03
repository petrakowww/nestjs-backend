import { Role } from 'src/roles/roles.model';

export interface UserPayloadType {
  id: number;
  email: string;
  roles: Role[];
}

import gql from 'graphql-tag';
import { query } from '@/services/graphql';
import { Role } from './Role';

export interface User {
  id_user: number;
  name: string;
  surname: string;
  role: Role;
}

export async function getUser(id: number): Promise<User> {
  const data = await query<{ user_by_pk: User }>(gql`
    query getUserById {
      user_by_pk(id_user: ${id}) {
        id_user
        name
        surname
        role {
          id_role
          name
        }
      }
    }
  `);

  return data.user_by_pk;
}

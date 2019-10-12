import gql from 'graphql-tag';
import { query } from '@/services/graphql';

interface User {
  name: string;
  surname: string;
}

async function getUser(id: number): Promise<User> {
  const data = await query<{ user_by_pk: User }>(gql`
    query getUserById {
      user_by_pk(id_user: ${id}) {
        name
        surname
      }
    }
  `);

  return data.user_by_pk;
}

export { User, getUser };

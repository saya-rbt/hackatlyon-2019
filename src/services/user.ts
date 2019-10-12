import gql from 'graphql-tag';
import { query } from './graphql';

interface User {
  name: string;
  surname: string;
}

async function getUser(id: number): Promise<User> {
  return query<User>(gql`
    query getUserById {
      user_by_pk(id_user: ${id}) {
        name
        surname
      }
    }
  `);
}

export { User, getUser };

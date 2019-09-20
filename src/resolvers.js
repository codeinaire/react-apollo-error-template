import gql from 'graphql-tag';

export const GET_USER_DEETS = gql`
  query getUserDeets($id: ID!) {
    getUserDeets(id: $id) @client {
      id
      accessToken
      idToken
    }
  }
`

export const CREATE_USER_DEETS = gql`
  mutation updateUserDeets(
    $id: ID!
    $accessToken: String!
    $idToken: String!
  ) {
    updateUserDeets(
      id: $id
      accessToken: $accessToken
      idToken: $idToken
    ) @client {
      id
      accessToken
      idToken
    }
  }
`

export const typeDefs = gql`

  extend type User {
    id: ID!
    accessToken: String!
    idToken: String!
  }

  extend type Query {
    getUserDeets(id: ID!): User
    thisIsTest: Boolean!
  }

  extend type Mutation {
    updateUserDeets(id: ID!, accessToken: String!, idToken: String!): User
  }
`

export const resolvers = {
  Query: {
    getUserDeets: async (obj, args, { cache }) => {
      console.log('RESOLVER getUserDeets', obj, args, cache);

      const { user } = await cache.readQuery({
        query: GET_USER_DEETS,
        variables: {
          id: 'test-user123'
        }
      })
      // const user = {
      //   __typename: 'User',
      //   id: 'test-id',
      //   idToken: 'test token',
      //   accessToken: 'test access'
      // }
      console.log('USER@@@@@', user);

      return user || null;
    }
  },
  Mutation: {
    updateUserDeets: (_root, vars, { cache }) => {
      console.log('initial state!!!!', _root, vars, cache);
      // const user = cache.writeData({
      //   data: {
      //     __typename: 'User',
      //     id: 'test-id123',
      //     idToken: 'test-token123',
      //     accessToken: 'test-access123'
      //   }
      // });
      const { user }= cache.writeQuery({
        query: CREATE_USER_DEETS,
        variables: {
          id: 'test-id123',
          idToken: 'Test-token',
          accessToken: 'test-access'
        }
      })

      console.log('user$$$$$', user, cache);

      return user;
    }
  }
}
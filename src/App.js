import React from "react";
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { CREATE_USER_DEETS, GET_USER_DEETS } from './resolvers';

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

export default function App() {
  const {
    loading,
    data: { people }
  } = useQuery(ALL_PEOPLE);
  const [createUserDeets, { data }] = useMutation(CREATE_USER_DEETS);
  const { data1, loading1, error } = useQuery(GET_USER_DEETS, {
    variables: { id: "test-user" }
  });

  console.log('this is DATA', data1, loading1, error);


  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <button onClick={() => createUserDeets({
      variables: {
        id: 'test-again134',
        accessToken: 'test-access-again',
        idToken: 'testing'
      }
    })}>MUTATE!!!!!</button>
    <p>This is DATA {JSON.stringify(data1)}</p>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {people.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

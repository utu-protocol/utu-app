import { gql } from "@apollo/client";

export const GET_CONNECTIONS = gql`
  query GET_CONNECTIONS($address: String) {
    connectionEntities(where: { _user: $address}) {
      id
      _user
      _connectedTypeId
      _connectedUserIdHash
    }
  }
`;

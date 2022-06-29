import { gql } from "@apollo/client";

export const GET_ENDORSEMENTS = gql`
  query GET_ENDORSEMENTS($source: String, $target: String) {
    endorseEntities(where: { _from: $source, _to: $target }) {
      id
      count
      _from
      _to
      _value
    }
  }
`;

export const GET_ENDORSEMENTS_BY_SOURCE = gql`
  query GET_ENDORSEMENTS_BY_SOURCE($source: String) {
    endorseEntities(where: { _from: $source }) {
      id
      count
      _from
      _to
      _value
    }
  }
`;


export const GET_ENDORSEMENTS_BY_TARGET = gql`
  query GET_ENDORSEMENTS_BY_TARGET($target: String) {
    endorseEntities(where: { _to: $target }) {
      id
      count
      _from
      _to
      _value
    }
  }
`;
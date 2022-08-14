import { gql } from "@apollo/client";

export const GET_STAKED_AMOUNT_ON = gql`
  query GET_STAKED_AMOUNT_ON($id: ID!) {
    stakedAmountOnEntity(id: $id) {
      id
      address
      amount
    }
  }
`;


export const GET_STAKED_AMOUNT_BY = gql`
  query GET_STAKED_AMOUNT_BY($id: ID!) {
    stakedAmountByEntity(id: $id) {
      id
      address
      amount
    }
  }
`;
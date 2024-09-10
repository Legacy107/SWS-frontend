import { gql } from '@apollo/client';

export const GET_COMPANIES = gql`
  query Company($paging: OffsetPaging!, $sorting: [CompanySort!]!, $filter: CompanyFilter!) {
    companies(paging: $paging, sorting: $sorting, filter: $filter) {
      nodes {
        name
        unique_symbol
        price {
          edges {
            node {
              price
            }
          }
        }
        score {
          total
        }
      }
      totalCount
    }
  }
`;

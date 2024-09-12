import { gql } from '@apollo/client';

export const GET_COMPANIES = gql`
  query Company(
    $paging: OffsetPaging!
    $sorting: [CompanySort!]!
    $filter: CompanyFilter!
    $pricePaging: CursorPaging!
  ) {
    companies(paging: $paging, sorting: $sorting, filter: $filter) {
      nodes {
        name
        unique_symbol
        price(paging: $pricePaging) {
          edges {
            node {
              price
            }
          }
        }
        score {
          value
          future
          past
          health
          dividend
          total
        }
      }
      totalCount
    }
  }
`;

import {gql} from "@apollo/client";

export const GET_PROGRAMS = gql`
  query Programs {
    programs {
      id
      name
      start
      location
      attendance {
        programId
        status
        programId
        residentId
      }
    }
  }
`;

export const GET_RESIDENTS = gql`
  query Residents {
    residents {
        id,
        name
        status
        room
        levelOfCare
    }
  }
`;

import {gql} from "@apollo/client";

export const CREATE_PROGRAM = gql`
  mutation CreateProgram($input: ProgramInput!) {
    createProgram(input: $input) {
      id
      name
      start
      location
    }
  }
`;

export const CREATE_RESIDENT = gql`
  mutation CreateResident($input: ResidentInput!) {
    createResident(input: $input) {
        id
        name
        status
        firstName
        lastName
        room
        birthDate
        moveInDate
        levelOfCare
        ambulation
    }
  }
`;

export const SET_ATTENDANCE = gql`
  mutation SetAttendance($input: AttendanceInput!) {
    setAttendance(input: $input) {
      status
      programId
      residentId
    }
  }
`;
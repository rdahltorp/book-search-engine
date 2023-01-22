//Holds GET_ME query for to retrive user profile. 

import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($profileId: ID!) {
        profile(profileId: $profileId){
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;
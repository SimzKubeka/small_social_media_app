import { gql } from '@apollo/client';

export const FETCH_POST_QUERY = gql`
  query AllPosts {
    getPosts {
      username
      body
      comments {
        username
        body
      }
      likes {
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

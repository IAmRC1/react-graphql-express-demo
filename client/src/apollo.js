import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      description
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      title
      description
    }
  }
`;

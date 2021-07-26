import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
//Queries and Mutations
import { FETCH_POST_QUERY } from '../../utils/Queries/graphqlQueries';
import { useForm } from '../../utils/custom-hooks';

function PostForm() {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CRAETE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create New Post</h2>
      <Form.Field>
        <Form.Input
          placeholder='Post Here'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' content='Post' color='teal' />
      </Form.Field>
    </Form>
  );
}

const CRAETE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
    }
  }
`;

export default PostForm;

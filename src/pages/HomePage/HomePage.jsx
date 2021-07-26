import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
//custom context
import { AuthContext } from '../../context/auth-context/auth';
//Queries and Mutations
import { FETCH_POST_QUERY } from '../../utils/Queries/graphqlQueries';
//components
import PostCard from '../../components/PostCard/PostCard';
import PostForm from '../../components/PostForm/PostForm';

function HomePage() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POST_QUERY);

  if (loading) return <p>Loading Posts...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}

export default HomePage;

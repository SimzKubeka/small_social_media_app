import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
//custom context
import { AuthContext } from '../../context/auth-context/auth';
//custom hooks
import { useForm } from '../../utils/custom-hooks';

function RegisterPage(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit' content='Register' primary />
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_USER_MUTATION = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default RegisterPage;

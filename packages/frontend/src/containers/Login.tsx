import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { Auth } from 'aws-amplify';
import './Login.css';
import { useAppContext } from '../lib/contextLib';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../lib/errorLib';
import { useFormFields } from '../lib/hooksLib';

export default function Login() {
  const nav = useNavigate();
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      nav('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control autoFocus size="lg" type="email" value={fields.email} onChange={handleFieldChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control size="lg" type="password" value={fields.password} onChange={handleFieldChange} />
          </Form.Group>
          <LoaderButton size="lg" type="submit" disabled={!validateForm()} isLoading={isLoading}>
            Login
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}

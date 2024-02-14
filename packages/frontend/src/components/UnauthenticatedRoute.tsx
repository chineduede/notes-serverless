import { ReactElement, cloneElement } from 'react';
import { useAppContext } from '../lib/contextLib';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

export default function UnauthenticatedRoute(props: Props): ReactElement {
  const { isAuthenticated } = useAppContext();
  const { children } = props;
  const redirect = querystring('redirect');

  if (isAuthenticated) {
    return <Navigate to={redirect || '/'} />;
  }

  return cloneElement(children, props);
}

function querystring(name: string, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

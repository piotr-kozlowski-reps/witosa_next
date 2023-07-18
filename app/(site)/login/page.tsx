'use client';
import { useRedirectWhenUserIsAuthenticated } from '@/hooks/useRedirectWhenUserIsAuthenticated';
import LoginForm from './components/LoginForm';

export default function Login() {
  useRedirectWhenUserIsAuthenticated('/dashboard');
  return <LoginForm />;
}

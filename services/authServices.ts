import { User } from '@/components/SignUpTab';
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

export const signUp = async (
  data: User
): Promise<{ accesessToken: string }> => {
  const response = await axios.post(`${baseUrl}/signup`, data);
  return response.data;
};

export interface LogIn {
  email: string;
  password: string;
}
export const logIn = async (data: LogIn) => {
  const response = await axios.post(`${baseUrl}/login`, data);

  return response.data;
};

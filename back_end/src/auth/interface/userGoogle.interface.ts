export interface GoogleUser {
  name: string;
  email: string;
  avatar: string;
  address: string | null;
  phone: string | null;
  password: string | null;
  id: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

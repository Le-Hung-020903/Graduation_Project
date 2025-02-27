export interface LogoutData {
  id: number;
  email: string;
  address: string | null;
  status: boolean;
  phone: string;
  avatar: string | null;
  created_at: Date;
  exp: number;
  accessToken: string;
}

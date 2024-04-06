type User = {
  access_token: string;
  expires_in: number;
  first_name: string;
  id: number;
  initial: string;
  is_cashier: boolean;
  is_head: boolean;
  last_name: string;
  // password : string
  middle_name?: string;
  refresh_token: string;
  school: string;
  scope: string;
  token_type: 'Bearer';
  username: string;
  apiUrl: string;
  subdomain: string;
  permissions: string[];
  employee_no: string;
  is_college: boolean;
  education_type : string | null;
};
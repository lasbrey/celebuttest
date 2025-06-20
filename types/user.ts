export type User = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status?: string;
  isOnline?: boolean;
};
export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  business_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  industry?: string;
  avatar?: string;
  is_verified?: boolean;
  account_type?: "user" | "business";
  [key: string]: any;
};

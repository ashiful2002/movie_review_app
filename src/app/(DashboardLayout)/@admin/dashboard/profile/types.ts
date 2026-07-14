export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;

  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;

  role: string;
  emailVerified: boolean;
  isPremium: boolean;

  createdAt: string;
  updatedAt: string;
}
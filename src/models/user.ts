import { Profile } from './profile';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordSalt: string;
  linkedin: string;
  profile: Profile;
  phone: string;
  address: {
    street?: string,
    number?: string,
    complement?: string,
    neighborhood?: string,
    postalCode?: string,
    city?: string,
    state?: string,
    country?: string,
    creationDate?: string,
  };
}

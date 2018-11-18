import { Profile } from './profile';

export class User {
  id?: number;
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  password?: string;
  passwordSalt?: string;
  profile?: Profile;
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

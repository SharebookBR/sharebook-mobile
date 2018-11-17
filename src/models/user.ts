import { Profile } from './profile';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordSalt: string;
  linkedin: string;
  postalCode: string;
  profile: Profile;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

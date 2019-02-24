import { Category } from './category';
import {User} from "./user";

interface Book {
  id: string;
  userId: number;
  title: string;
  author: string;
  imageBytes: string;
  imageName: string;
  imageUrl: string;
  imageSlug: string;
  approved: boolean;
  categoryId: number;
  freightOption: string;
  category: Category;
  user: User;
  synopsis: string;
  totalInterested: number;
  daysInShowcase: number;
  chooseDate: string;
  status: string;
}

const FreightLabels = {
  City: 'Cidade',
  State: 'Estado',
  Country: 'País',
  World: 'Mundo',
  WithoutFreight: 'Não',
};

function isDonated(book: Book) {
  return book.status === 'Doado';
}

export {Book, FreightLabels, isDonated};

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
  freightOption: FreightLabels;
  category: Category;
  user: User;
  synopsis: string;
  totalInterested: number;
  daysInShowcase: number;
  chooseDate: string;
  status: BookRequestStatus;
  donated: boolean;
  trackingNumber: string;
}

enum FreightLabels {
  City = 'Cidade',
  State = 'Estado',
  Country = 'País',
  World = 'Mundo',
  WithoutFreight = 'Não',
}

enum BookRequestStatus {
  DONATED = 'DOADO',
  REFUSED = 'NÃO FOI DESSA VEZ',
  AWAITING_ACTION = 'AGUARDANDO AÇÃO',
  AWAITING_APPROVAL = 'AGUARDANDO APROVAÇÃO',
  AVAILABLE = 'DISPONÍVEL',
  CANCELED = 'CANCELADO'
}

function isDonated(book: Book) {
  return book.status.toUpperCase() === BookRequestStatus.DONATED;
}

function isCanceled(book: Book) {
  return book.status.toUpperCase() === BookRequestStatus.CANCELED;
}

function isAvailable(book: Book) {
  return book.status.toUpperCase() === BookRequestStatus.AVAILABLE;
}

function getStatusColor(status = '') {
  switch (status.toUpperCase()) {
    case BookRequestStatus.AVAILABLE:
      return 'secondary';
    case BookRequestStatus.DONATED:
      return 'orange';
    case BookRequestStatus.REFUSED:
    case BookRequestStatus.CANCELED:
      return 'danger';
    case BookRequestStatus.AWAITING_ACTION:
    case BookRequestStatus.AWAITING_APPROVAL:
      return 'primary-light';
    default:
      return 'primary';
  }
}

interface DonateBookUser {
  userId: string;
  note: string;
}

export {
  Book,
  FreightLabels,
  isDonated,
  BookRequestStatus,
  getStatusColor,
  DonateBookUser,
  isCanceled,
  isAvailable,
};

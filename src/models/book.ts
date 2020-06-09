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
  status: BookStatus;
  donated: boolean;
  trackingNumber: string;
  slug: string;

  state: string;
  city: string;
  postalCode: string;
}

enum FreightOptionsLabels {
  City = 'Cidade',
  State = 'Estado',
  Country = 'País',
  World = 'Mundo',
  WithoutFreight = 'Não',
}

enum FreightOptions {
  City = 'City',
  State = 'State',
  Country = 'Country',
  World = 'World',
  WithoutFreight = 'WithoutFreight',
}

enum BookStatus {
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  AVAILABLE = 'AVAILABLE',
  WAITING_DECISION = 'WAITING_DECISION',
  WAITING_SEND = 'WAITING_SEND',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CANCELED = 'CANCELED',
}

enum BookStatusLabel {
  WAITING_APPROVAL = 'Aguardando aprovação',
  AVAILABLE = 'Disponível',
  WAITING_DECISION = 'Aguardando decisão do doador',
  WAITING_SEND = 'Aguardando envio',
  SENT = 'Enviado',
  RECEIVED = 'Recebido',
  CANCELED = 'Cancelado',
}

function isDonated(book: Book) {
  return book.status === BookStatus.SENT ||
    book.status === BookStatus.RECEIVED;
}

function isCanceled(book: Book) {
  return book.status === BookStatus.CANCELED;
}

function isAvailable(book: Book) {
  return book.status === BookStatus.AVAILABLE;
}

function isWaitingDecision(book: Book) {
  return book.status === BookStatus.WAITING_DECISION;
}

function isDue(book: Book) {
  return book && book.chooseDate ? (
    new Date(book.chooseDate).getTime() < new Date().getTime()
  ) : false;
}

function getStatusColor(status = '') {
  switch (status) {
    case BookStatus.AVAILABLE:
      return 'secondary';
    case BookStatus.SENT:
    case BookStatus.RECEIVED:
      return 'orange';
    case BookStatus.CANCELED:
      return 'danger';
    case BookStatus.WAITING_APPROVAL:
    case BookStatus.WAITING_DECISION:
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
  FreightOptionsLabels,
  isDonated,
  BookStatus,
  getStatusColor,
  DonateBookUser,
  isCanceled,
  isAvailable,
  isDue,
  isWaitingDecision,
};

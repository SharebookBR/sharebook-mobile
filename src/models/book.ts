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
  WAITING_APPROVAL = 'WaitingApproval',
  AVAILABLE = 'Available',
  WAITING_DECISION = 'AwaitingDonorDecision',
  WAITING_SEND = 'WaitingSend',
  WAITING_ACTION = 'WaitingAction',
  SENT = 'Sent',
  RECEIVED = 'Received',
  CANCELED = 'Canceled',
  DENIED = 'Denied',
  DONATED = 'Donated',
}

enum BookStatusLabel {
  WaitingApproval = 'Aguardando aprovação',
  Available = 'Disponível',
  AwaitingDonorDecision = 'Aguardando decisão',
  WaitingSend = 'Aguardando envio',
  Sent = 'Enviado',
  Received = 'Recebido',
  Canceled = 'Cancelado',
  WaitingAction = 'Aguardando ação',
  Donated = 'Doado',
  Denied = 'Negado',
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

function isWaitingSend(book: Book) {
  return book.status === BookStatus.WAITING_SEND;
}

function isDue(book: Book) {
  return book.status === BookStatus.WAITING_ACTION;
}

function hasWinner (book: Book) {
  return book.status === BookStatus.WAITING_SEND
    || book.status === BookStatus.SENT
    || book.status === BookStatus.RECEIVED
}

function getStatusColor(status = '') {
  switch (status) {
    case BookStatus.AVAILABLE:
      return 'secondary';
    case BookStatus.SENT:
    case BookStatus.RECEIVED:
      return 'orange';
    case BookStatus.DENIED:
    case BookStatus.CANCELED:
      return 'danger';
    case BookStatus.WAITING_APPROVAL:
    case BookStatus.WAITING_DECISION:
    case BookStatus.WAITING_ACTION:
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
  FreightOptions,
  isDonated,
  BookStatus,
  getStatusColor,
  DonateBookUser,
  isCanceled,
  isAvailable,
  isDue,
  isWaitingDecision,
  BookStatusLabel,
  isWaitingSend,
  hasWinner,
};

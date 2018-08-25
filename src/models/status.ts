export class Status {

  static ERROR = 1;
  static SUCCESS = 2;
  static DOWNLOADING = 3;
  static UPLOADING = 4;
  static CREATING = 5;
  static EDITING = 6;
  static PICKING = 7;
  static DONE = 8;
  static CANCELED = 9;
  static REFRESHING = 10;
  static PROCESSING = 11;
  static FORBIDDEN = 12;
  static UNLOADED = 13;
  static NOT_FOUND = 14;
  static NO_ACCESS = 15;
  static INVALID = 16;
  static VALID = 17;
  static INFINITING = 18;

  private status;

  constructor() {

  }

  setAsValid() {
    this.status = Status.VALID;
  }

  setAsInvalid() {
    this.status = Status.INVALID;
  }

  setAsNoAccess() {
    this.status = Status.NO_ACCESS;
  }

  setAsNotFound() {
    this.status = Status.NOT_FOUND;
  }

  setAsUnloaded() {
    this.status = Status.UNLOADED;
  }

  setAsError() {
    this.status = Status.ERROR;
  }

  setAsSuccess() {
    this.status = Status.SUCCESS;
  }

  setAsDownloading() {
    this.status = Status.DOWNLOADING;
  }

  setAsUploading() {
    this.status = Status.UPLOADING;
  }

  setAsCreating() {
    this.status = Status.CREATING;
  }

  setAsEditing() {
    this.status = Status.EDITING;
  }

  setAsPicking() {
    this.status = Status.PICKING;
  }

  setAsDone() {
    this.status = Status.DONE
  }

  setAsCanceled() {
    this.status = Status.CANCELED;
  }

  setAsRefreshing() {
    this.status = Status.REFRESHING;
  }

  setAsProcessing() {
    this.status = Status.PROCESSING;
  }

  setAsForbidden() {
    this.status = Status.FORBIDDEN;
  }

  isNoAccess() {
    return this.status === Status.NO_ACCESS;
  }

  isNotFound() {
    return this.status === Status.NOT_FOUND;
  }

  isUnloaded(): boolean {
    return this.status === Status.UNLOADED;
  }

  isRefreshing(): boolean {
    return this.status === Status.REFRESHING;
  }

  isCanceled(): boolean {
    return this.status === Status.CANCELED;
  }

  isDone(): boolean {
    return this.status === Status.DONE;
  }

  isError(): boolean {
    return this.status === Status.ERROR;
  }

  isSuccess(): boolean {
    return this.status === Status.SUCCESS;
  }

  isDownloading(): boolean {
    return this.status === Status.DOWNLOADING;
  }

  isUploading(): boolean {
    return this.status === Status.UPLOADING;
  }

  isCreating(): boolean {
    return this.status === Status.CREATING;
  }

  isEditing(): boolean {
    return this.status === Status.EDITING;
  }

  isPicking(): boolean {
    return this.status === Status.PICKING;
  }

  isProcessing(): boolean {
    return this.status === Status.PROCESSING;
  }

  isForbidden(): boolean {
    return this.status === Status.FORBIDDEN;
  }

  isInvalid(): boolean {
    return this.status === Status.INVALID;
  }

  isValid(): boolean {
    return this.status == Status.VALID;
  }

  isInfiniting(): boolean {
    return this.status == Status.INFINITING
  }

  setAsInfiniting() {
    this.status = Status.INFINITING;
  }
}

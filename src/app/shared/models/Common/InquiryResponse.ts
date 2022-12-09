import { Response } from "./Response";

export class InquiryResponse extends Response {
  returnValues: Array<any> = new Array<any>();
  hasMorePages: boolean = true;
  totalItems: number = 0;
  pageReturned: number = 0;
}

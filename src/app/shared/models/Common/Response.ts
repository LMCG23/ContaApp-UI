import { MessageInfo } from "./MessageInfo";

export class Response {
  hasErrors:boolean = false;
  messages:  Array<MessageInfo> = new Array<MessageInfo>();
  operationSuccess:boolean = true;
  data:any;
}

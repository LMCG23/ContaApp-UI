import { MessageInfo } from "./MessageInfo";

export class response {
  HasErrors:boolean = false;
  Messages:  Array<MessageInfo>
  OperationSuccess:boolean = true;
}

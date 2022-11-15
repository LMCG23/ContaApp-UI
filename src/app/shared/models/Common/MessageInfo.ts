import { MessageTypeEnum } from "../Enums/MessageTypeEnum.Enum";

export class MessageInfo {
  type:MessageTypeEnum = MessageTypeEnum.None;
  code:string  = '';
  text:string = '';
}

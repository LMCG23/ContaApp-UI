import { MessageTypeEnum } from "../Enums/MessageTypeEnum.Enum";

export class MessageInfo {
  Type:MessageTypeEnum = MessageTypeEnum.None;
  Code:string  = '';
  Text:string = '';
}

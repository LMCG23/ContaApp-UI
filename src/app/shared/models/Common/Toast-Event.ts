import { EventTypes } from "../Enums/EventTypes";

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}

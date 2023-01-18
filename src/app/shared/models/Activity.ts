import { Base } from "./Base";
import { Client } from "./Client";

export class Activity extends Base {
  clients?: Array<Client> = new Array<Client>();
  id: number = 0;
  name: string = "";
}

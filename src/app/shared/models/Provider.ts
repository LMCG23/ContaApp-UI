import { Base } from "./Base";
import { Client } from "./Client";

export class Provider extends Base {
  client: Client = new Client();
  clientId: number = 0;
  dni: string = "";
  id: number = 0;
  name: string = "";
}

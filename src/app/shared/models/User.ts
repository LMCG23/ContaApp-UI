import { AccountingFirm } from "./AccountingFirm";
import { Base } from "./Base";
import { Roles } from "./Enums/Roles.enum";

export class User extends Base {
  accountingFirmId?: number = 0;
  email?: string = "";
  id?: number = 0;
  lastName?: string = "";
  name?: string = "";
  password: string = "";
  rol?: Roles;
  token?: string = "";
  userName: string = "";
}

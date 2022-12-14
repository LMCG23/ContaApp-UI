import { AccountingFirm } from "./AccountingFirm";
import { Base } from "./Base";

export class Client extends Base {
  accountingFirm: AccountingFirm = new AccountingFirm();
  accountingFirmId: number = 0;
  children?: number;
  dni: string = "";
  hasMate: boolean = false;
  id: number = 0;
  isLegalPerson: boolean = false;
  isSalaried: boolean = false;
  lastName: string = "";
  name: string = "";
}

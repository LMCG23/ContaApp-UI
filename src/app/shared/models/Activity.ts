import { AccountingFirm } from "./AccountingFirm";
import { Base } from "./Base";

export class Activity extends Base {
  id: number = 0;
  accountingFirmId: number = 0;
  name: string = "";
  accountingFirm: AccountingFirm = new AccountingFirm();
}

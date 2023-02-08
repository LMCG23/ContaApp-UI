import { AccountingFirm } from "./AccountingFirm";
import { Activity } from "./Activity";
import { ActivityClient } from "./ActivityClient";
import { Base } from "./Base";

export class Client extends Base {
  accountingFirm: AccountingFirm = new AccountingFirm();
  accountingFirmId: number = 0;
  activities: Array<ActivityClient> = new Array<ActivityClient>();
  children?: number;
  dni: string = "";
  hasMate: boolean = false;
  id: number = 0;
  isLegalPerson: boolean = false;
  isSalaried: boolean = false;
  lastName: string = "";
  name: string = "";
}

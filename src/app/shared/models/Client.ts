import { Base } from "./Base";

export class Client extends Base {
 id:number = 0;
 accountingFirmId:number =0;
 name:string = '';
 dni:string='';
 lastName:string='';
 isLegalPerson:boolean=false;
 hasMate:boolean=false;
 children?:number;
 isSalaried:boolean = false;
}

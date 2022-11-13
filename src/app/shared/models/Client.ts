import { Base } from "./Base";

export class Client extends Base {
 Id:number = 0;
 AccountingFirmId:number =0;
 Name:string = '';
 Dni:string='';
 LastName:string='';
 IsLegalPerson:boolean=false;
 HasMate:boolean=false;
 Children?:number;
 IsSalaried:boolean = false;
}

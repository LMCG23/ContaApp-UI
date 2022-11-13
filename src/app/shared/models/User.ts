import { Base } from "./Base";
import { Roles } from "./Enums/Roles.enum";

export class User extends Base {
   Id:number = 0;
   AccountingFirmId:number = 0;
   Name:string = '';
   LastName:string = '';
   Email:string = '';
   UserName:string = '';
   Password:string = '';
   Token?:string = '';
   Rol:Roles;
}

import { Base } from "./Base";
import { Roles } from "./Enums/Roles.enum";

export class User extends Base {
   id?:number = 0;
   accountingFirmId?:number = 0;
   name?:string = '';
   lastName?:string = '';
   email?:string = '';
   userName:string = '';
   password:string = '';
   token?:string = '';
   rol?:Roles;

}

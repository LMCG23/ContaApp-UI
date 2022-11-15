export class Base {
	createdBy?:string = '';
	modifiedBy?:string = '';
	createdTS?:Date = new Date();
	modifiedTS?:Date = new Date();
	isActive?:boolean = false;
}

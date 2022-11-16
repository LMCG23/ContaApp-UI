export class InquiryResponse extends Response {
  returnValues:Array<any> = new Array<any>();
  HasMorePages:boolean =true;
  TotalItems:number = 0;
  PageReturned:number = 0;



}

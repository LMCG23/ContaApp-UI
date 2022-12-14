export class InquiryResquest {
  pageSize: number = 25;
  pageNumber: number = 1;
  withPaging: boolean = true;
  accountingFirmId: number = 0;
  showInactive: boolean = false;

  constructor(paging: boolean = true, size: number = 20, num: number = 1) {
    this.pageSize = size;
    this.pageNumber = num;
    this.withPaging = paging;
  }

  /**
   * Gets the current instance of the request filters,parses into an get style querystring and returns it
   * @returns string
   */
  parseQueryString(): string {
    let parsedString = "?";
    const arrayToParse = [];

    arrayToParse.push(`pageSize=${this.pageSize}`);
    arrayToParse.push(`pageNumber=${this.pageNumber}`);
    arrayToParse.push(`withPaging=${this.withPaging}`);
    arrayToParse.push(`showInactive=${this.showInactive}`);

    // site id is nullabe, need to check if the field has content before parsing
    this.accountingFirmId
      ? arrayToParse.push(`accountingFirmId=${this.accountingFirmId}`)
      : null;

    parsedString += arrayToParse.join("&");

    return parsedString;
  }
}

import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-client-select",
  templateUrl: "./client-select.component.html",
  styleUrls: ["./client-select.component.scss"],
})
export class ClientSelectComponent implements OnInit {
  // variables
  closeResult: string = "";

  selectedCar: number = 0;

  cars = [
    { id: 1, name: "Volvo" },
    { id: 2, name: "Saab" },
    { id: 3, name: "Opel" },
    { id: 4, name: "Audi" },
  ];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  /**
   * this method allow open the modal
   * @returns {void}
   */
  public open(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  /**
   * this method allow to get Dismiss Reason
   * @param {reason:any}  the reason
   * @returns {void}
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * this method allow to dimiss the modal
   * @param {reason:any}  the reason
   * @returns {void}
   */
  close() {
    this.modalService.dismissAll();
  }
}

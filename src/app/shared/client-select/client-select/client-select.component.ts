import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Client } from "../../../shared/models/Client";
import { InquiryResquest } from "../../../shared/models/Common/InquiryRequest";
import { InquiryResponse } from "../../../shared/models/Common/InquiryResponse";
import { environment } from "../../../../environments/environment";
import { AdminService } from "../../../admin-module/service/admin.service";

@Component({
  selector: "app-client-select",
  templateUrl: "./client-select.component.html",
  styleUrls: ["./client-select.component.scss"],
})
export class ClientSelectComponent implements OnInit {
  // variables
  closeResult: string = "";
  modalcontent: any;
  title = "angular-mat-select-app";

  selected: string = "";

  clientSelectForm: FormGroup = new FormGroup({});
  //List of clients
  public clientList: Array<Client> = new Array<Client>();

  constructor(
    private modalService: NgbModal,
    @Inject(AdminService) private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();

    this.fetchAllClientsByAcountingFirmId();
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  public open(content: any): void {
    this.modalcontent = content;
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
      this.open(this.modalcontent);
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
    let clientSelected =
      localStorage.getItem(environment.localStorage.clientId) || null;
    if (clientSelected !== null) {
      this.modalService.dismissAll();
    }
  }

  /**
   * this method allow to build the form group
   * @returns {void}
   */
  buildFormGroup() {
    this.clientSelectForm = new FormGroup({
      clientSelected: new FormControl(null, [Validators.required]),
    });
  }

  public fetchAllClientsByAcountingFirmId(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.accountingFirmId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    request.showInactive = false;
    this.adminService
      .getAllClientsByAccoutingFirmId(request)
      .subscribe((result: InquiryResponse) => {
        if (result.operationSuccess) {
          this.clientList = result.returnValues;
        }
      });
  }

  public setClientLocalStorage() {
    localStorage.setItem(environment.localStorage.clientId, this.selected);
    this.close();
  }
}

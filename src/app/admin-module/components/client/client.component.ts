import { Component, Inject, OnInit } from "@angular/core";
import { AdminService } from "../../../admin-module/service/admin.service";
import { MessageService } from "../../../shared/message/message.service";
import { ToastService } from "../../../shared/toastService/toast.service";
import { Client } from "../../../shared/models/Client";
import { environment } from "../../../../environments/environment";
import { InquiryResquest } from "../../../shared/models/Common/InquiryRequest";
import { InquiryResponse } from "../../../shared/models/Common/InquiryResponse";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResultHelper } from "../../../shared/models/Common/ResultHelper";
import { AccountingFirm } from "../../../shared/models/AccountingFirm";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  //List of clients
  public clientList: Array<Client> = new Array<Client>();

  //Variables
  accountingId: number = 0;
  clientForm: FormGroup = new FormGroup({});
  closeResult: string = "";
  modalTitle: string = "";

  // management client variable
  managementClient: Client = new Client();

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    private adminService: AdminService,
    @Inject(ToastService) private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountingId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    if (this.accountingId) {
      this.fetchAllClientsByAcountingFirmId();
      this.buildFormGroup();
    }
  }

  public fetchAllClientsByAcountingFirmId(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.accountingFirmId = this.accountingId;
    this.adminService
      .getAllClientsByAccoutingFirmId(request)
      .subscribe((result: InquiryResponse) => {
        if (result.operationSuccess) {
          this.clientList = result.returnValues;
        } else {
          this.toastService.showErrorToast(
            "Error al obtener la lista de clientes",
            "Ocurrio un error al obtener la lista de clientes intente mas tarde..."
          );
        }
      });
  }

  /**
   * this method allow to build the form group
   * @returns {void}
   */
  buildFormGroup() {
    this.clientForm = new FormGroup({
      clientName: new FormControl(null, [Validators.required]),
      clientLastName: new FormControl(null, [Validators.required]),
      clientDni: new FormControl(null, [Validators.required]),
      clientChildren: new FormControl(null, [Validators.required]),
      clientLegalPerson: new FormControl(false),
      clientHasMate: new FormControl(false),
      clientIsSalaried: new FormControl(false),
    });
  }

  /**
   * this method allow to fill the form group
   * @returns {void}
   */
  fillFormGroup() {
    this.clientForm.controls.clientName.setValue(this.managementClient.name);
    this.clientForm.controls.clientLastName.setValue(
      this.managementClient.lastName
    );
    this.clientForm.controls.clientDni.setValue(this.managementClient.dni);
    this.clientForm.controls.clientChildren.setValue(
      this.managementClient.children
    );
    this.clientForm.controls.clientLegalPerson.setValue(
      this.managementClient.isLegalPerson
    );
    this.clientForm.controls.clientHasMate.setValue(
      this.managementClient.hasMate
    );
    this.clientForm.controls.clientIsSalaried.setValue(
      this.managementClient.isSalaried
    );
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  open(content: any, client?: Client): void {
    if (client) {
      this.managementClient = client;
      this.fillFormGroup();
      this.modalTitle = `Editar Client ${client.name}`;
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
    } else {
      this.modalTitle = `Nuevo Cliente`;
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
  }

  /**
   * this method allow to get Dismiss Reason
   * @param {reason:any}  the reason
   * @returns {void}
   */
  private getDismissReason(reason: any): string {
    this.buildFormGroup();
    this.managementClient = new Client();
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * this method allow create or update the client
   * @param {reason:any}  the reason
   * @returns {void}
   */
  private UpdateCreateClient() {
    this.buildClientObject();
    if (this.managementClient.id !== 0) {
      this.adminService
        .updateClient(this.managementClient)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Actulización de Cliente",
              "El Cliente se actualizó correctamente"
            );
            this.fetchAllClientsByAcountingFirmId();
          } else {
            this.toastService.showErrorToast(
              "Actulización de Actividad",
              `${response.errors[0]}`
            );
          }
        });
    } else {
      this.adminService
        .createClient(this.managementClient)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Nuevo Cliente",
              "El Cliente se creó correctamente"
            );
            this.fetchAllClientsByAcountingFirmId();
          } else {
            this.toastService.showErrorToast(
              "Nuevo Cliente",
              `${response.errors[0]}`
            );
          }
        });
    }
  }

  /**
   * this method allow create client Object
   * @param {reason:any}  the reason
   * @returns {void}
   */
  buildClientObject(): void {
    this.managementClient.name = this.clientForm.controls.clientName.value;
    this.managementClient.lastName =
      this.clientForm.controls.clientLastName.value;
    this.managementClient.dni = this.clientForm.controls.clientDni.value;
    this.managementClient.children =
      this.clientForm.controls.clientChildren.value;
    this.managementClient.isLegalPerson =
      this.clientForm.controls.clientLegalPerson.value;
    this.managementClient.isSalaried =
      this.clientForm.controls.clientIsSalaried.value;
    this.managementClient.hasMate =
      this.clientForm.controls.clientHasMate.value;
    this.managementClient.accountingFirmId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    this.managementClient.isActive = true;
    this.managementClient.accountingFirm = new AccountingFirm();
  }

  /**
   * this is called when the user select the save button
   * @param {reason:any}  the reason
   * @returns {void}
   */
  public saveClient() {
    if (this.clientForm.valid) {
      this.UpdateCreateClient();
      this.modalService.dismissAll();
    } else {
      this.clientForm.markAllAsTouched();
      this.toastService.showErrorToast("Error", "Campos requeridos");
    }
  }
}

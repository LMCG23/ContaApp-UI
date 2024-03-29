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
import { Activity } from "../../../shared/models/Activity";
import { ActivityClient } from "../../../shared/models/ActivityClient";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  dropdownList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};

  //List of clients
  public clientList: Array<Client> = new Array<Client>();
  public Activities: Map<number, string> = new Map<number, string>();
  //Variables
  accountingId: number = 0;
  clientForm: FormGroup = new FormGroup({});
  closeResult: string = "";
  modalTitle: string = "";
  showInactive: boolean = false;
  legalPerson: boolean = false;

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
      this.fetchAllActivities();

      this.dropdownSettings = {
        singleSelection: false,
        idField: "item_id",
        textField: "item_text",
        selectAllText: "Seleccionar Todos",
        unSelectAllText: "Deseleccionar Todos ",
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
    }
  }

  public fetchAllClientsByAcountingFirmId(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.accountingFirmId = this.accountingId;
    request.showInactive = this.showInactive;
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
      clientActive: new FormControl(true),
      clientActivities: new FormControl(1, [Validators.required]),
    });
    this.selectedItems = [];
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
    this.clientForm.controls.clientActive.setValue(
      this.managementClient.isActive
    );
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  open(content: any, client?: Client): void {
    if (client) {
      this.managementClient = client;
      client.activities.forEach((element: ActivityClient) => {
        this.selectedItems.push({
          item_id: element.activityId,
          item_text: this.Activities.get(element.activityId),
        });
      });

      this.fillFormGroup();
      this.modalTitle = `Editar Client ${client.name}`;
      this.legalPerson = client.isLegalPerson ? true : false;
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
      this.legalPerson = false;
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
      if (this.managementClient.isLegalPerson) {
        this.managementClient.isSalaried = false;
        this.managementClient.hasMate = false;
        this.managementClient.lastName = "NA";
        this.managementClient.children = 0;
      }
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
    this.managementClient.isActive =
      this.clientForm.controls.clientActive.value;
    this.managementClient.accountingFirm = new AccountingFirm();
    this.managementClient.activities = new Array<ActivityClient>();
    this.selectedItems.forEach((element) => {
      let activityClient: ActivityClient = {
        clientId: this.managementClient.id,
        activityId: element.item_id,
      };
      this.managementClient.activities.push(activityClient);
    });
  }

  /**
   * this is called when the user select the save button
   * @param {reason:any}  the reason
   * @returns {void}
   */
  public saveClient() {
    if (this.clientForm.valid && this.selectedItems.length > 0) {
      this.UpdateCreateClient();
      this.modalService.dismissAll();
    } else {
      this.clientForm.markAllAsTouched();
      this.toastService.showErrorToast("Error", "Campos requeridos");
    }
  }

  /**
   * this is called when the user select the delete button, make inactive the activity
   * @param {reason:any}  the reason
   * @returns {void}
   */
  public makeInactive(client: Client) {
    this.messageService
      .showAlertQuestion("Eliminar Cliente", "Desea eliminar el Cliente?")
      .then((result: any) => {
        client.isActive = false;
        client.modifiedBy =
          localStorage.getItem(environment.localStorage.userName) || "";
        this.adminService
          .updateClient(client)
          .subscribe((response: ResultHelper) => {
            if (response.success) {
              this.toastService.showSuccessToast(
                "Eliminar Cliente",
                "El Cliente se ha eliminado correctamente"
              );
              this.fetchAllClientsByAcountingFirmId();
            } else {
              this.toastService.showErrorToast(
                "Eliminar Cliente",
                `${response.errors[0]}`
              );
            }
          });
      });
  }

  /**
   * this is called when the user select the show inactive checkbox, show the inactives clients
   * @returns {void}
   */
  showInactives(): void {
    this.fetchAllClientsByAcountingFirmId();
  }

  /**
   * this is called when the user select the legal person checkbox
   * @returns {void}
   */
  IsLegalPerson(): void {
    this.legalPerson = !this.legalPerson;
    if (this.legalPerson === true) {
      this.clientForm.controls.clientChildren.setValue(0);
      this.clientForm.controls.clientLastName.setValue("NA");
    } else {
      this.clientForm.controls.clientChildren.setValue(null);
      this.clientForm.controls.clientLastName.setValue(null);
    }
  }

  /**
   * this method fill the activity dropdown
   * @returns {void}
   */
  public fetchAllActivities(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.showInactive = false;
    this.adminService
      .getAllActivitiesByAccoutingFirmId(request)
      .subscribe((result: InquiryResponse) => {
        if (result.operationSuccess) {
          result.returnValues.forEach((element: Activity) => {
            this.Activities.set(element.id, element.name);
            this.dropdownList.push({
              item_id: element.id,
              item_text: element.name,
            });
          });
        } else {
          this.toastService.showErrorToast(
            "Error al obtener la lista de actividades",
            "Ocurrio un error al obtener la lista de actividades intente mas tarde..."
          );
        }
      });
  }
}

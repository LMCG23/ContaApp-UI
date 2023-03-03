import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResultHelper } from "../../../shared/models/Common/ResultHelper";
import { environment } from "../../../../environments/environment";
import { MessageService } from "../../../shared/message/message.service";
import { Activity } from "../../../shared/models/Activity";
import { InquiryResquest } from "../../../shared/models/Common/InquiryRequest";
import { InquiryResponse } from "../../../shared/models/Common/InquiryResponse";
import { ToastService } from "../../../shared/toastService/toast.service";
import { AdminService } from "../../service/admin.service";
import { Provider } from "../../../shared/models/Provider";
@Component({
  selector: "app-provider",
  templateUrl: "./provider.component.html",
  styleUrls: ["./provider.component.scss"],
})
export class ProviderComponent implements OnInit {
  //List of Activities
  public providerList: Array<Provider> = new Array<Provider>();

  //Variables
  clientId: number = 0;
  providerForm: FormGroup = new FormGroup({});
  closeResult: string = "";
  modalTitle: string = "";
  showInactive: boolean = false;

  //management activity variables
  managementProvider: Provider = new Provider();

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    private adminService: AdminService,
    @Inject(ToastService) private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.clientId = parseInt(
      localStorage.getItem(environment.localStorage.clientId) || ""
    );
    if (this.clientId) {
      this.fetchAllProviders();
      this.buildFormGroup();
    }
  }

  public fetchAllProviders(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.clientId = this.clientId;
    request.showInactive = this.showInactive;
    this.adminService
      .getAllProvidersByClientId(request)
      .subscribe((result: InquiryResponse) => {
        if (result.operationSuccess) {
          this.providerList = result.returnValues;
        } else {
          this.toastService.showErrorToast(
            "Error al obtener la lista de proveedors",
            "Ocurrio un error al obtener la lista de proveedores intente mas tarde..."
          );
        }
      });
  }

  /**
   * this method allow to build the form group
   * @returns {void}
   */
  buildFormGroup() {
    this.providerForm = new FormGroup({
      providerName: new FormControl(null, [Validators.required]),
      providerDni: new FormControl(null, [Validators.required]),
      providerActive: new FormControl(true),
    });
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  open(content: any, provider?: Provider): void {
    if (provider) {
      this.managementProvider = provider;
      this.providerForm.controls.providerName.setValue(provider.name);
      this.providerForm.controls.providerDni.setValue(provider.dni);
      this.providerForm.controls.providerActive.setValue(provider.isActive);
      this.modalTitle = `Editar Proveedor ${provider.name}`;
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
      this.modalTitle = `Nuevo Proveedor`;
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
    this.providerForm.controls.providerName.setValue("");
    this.managementProvider = new Provider();
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * this method allow create or update the activity
   * @param {reason:any}  the reason
   * @returns {void}
   */
  private UpdateCreate() {
    this.managementProvider.name =
      this.providerForm.controls.providerName.value;
    this.managementProvider.dni = this.providerForm.controls.providerDni.value;
    this.managementProvider.isActive =
      this.providerForm.controls.providerActive.value;
    this.managementProvider.createdBy =
      localStorage.getItem(environment.localStorage.userName) || "";
    this.managementProvider.modifiedBy =
      localStorage.getItem(environment.localStorage.userName) || "";
    this.managementProvider.clientId = this.clientId;
    if (this.managementProvider.id !== 0) {
      this.adminService
        .updateProvider(this.managementProvider)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Actulización del Proveedor",
              "El Proveedor se actualizó correctamente"
            );
            this.fetchAllProviders();
          } else {
            this.toastService.showErrorToast(
              "Actulización del Proveedor",
              `${response.errors[0]}`
            );
          }
        });
    } else {
      this.adminService
        .createProvider(this.managementProvider)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Nuevo Proveedor",
              "El Proveedor se creó correctamente"
            );
            this.fetchAllProviders();
          } else {
            this.toastService.showErrorToast(
              "Nuevo Proveedor",
              `${response.errors[0]}`
            );
          }
        });
    }
  }

  /**
   * this is called when the user select the save button
   * @param {reason:any}  the reason
   * @returns {void}
   */
  public saveProvider() {
    if (this.providerForm.valid) {
      this.UpdateCreate();
      this.modalService.dismissAll();
    } else {
      this.providerForm.markAllAsTouched();
      this.toastService.showErrorToast("Error", "Campos requeridos");
    }
  }

  /**
   * this is called when the user select the delete button, make inactive the provider
   * @param {provider:Provider}  the provider to be updated
   * @returns {void}
   */
  public makeInactive(provider: Provider) {
    this.messageService
      .showAlertQuestion("Eliminar Actividad", "Desea eliminar la actividad?")
      .then((result: any) => {
        provider.isActive = false;
        provider.modifiedBy =
          localStorage.getItem(environment.localStorage.userName) || "";
        this.adminService
          .updateProvider(provider)
          .subscribe((response: ResultHelper) => {
            if (response.success) {
              this.toastService.showSuccessToast(
                "Eliminar Proveedor",
                "El Proveedor se ha eliminado correctamente"
              );
              this.fetchAllProviders();
            } else {
              this.toastService.showErrorToast(
                "Eliminar Proveedor",
                `${response.errors[0]}`
              );
            }
          });
      });
  }

  /**
   * this is called when the user select the show inactive checkbox, show the inactives activities
   * @returns {void}
   */
  showInactives(): void {
    this.fetchAllProviders();
  }
}

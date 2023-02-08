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

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
})
export class ActivityComponent implements OnInit {
  //List of Activities
  public activityList: Array<Activity> = new Array<Activity>();

  //Variables
  accountingId: number = 0;
  activityForm: FormGroup = new FormGroup({});
  closeResult: string = "";
  modalTitle: string = "";
  showInactive: boolean = false;

  //management activity variables
  managementActivity: Activity = new Activity();

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
      this.fetchAllActivities();
      this.buildFormGroup();
    }
  }

  public fetchAllActivities(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.showInactive = this.showInactive;
    this.adminService
      .getAllActivitiesByAccoutingFirmId(request)
      .subscribe((result: InquiryResponse) => {
        if (result.operationSuccess) {
          this.activityList = result.returnValues;
        } else {
          this.toastService.showErrorToast(
            "Error al obtener la lista de actividades",
            "Ocurrio un error al obtener la lista de actividades intente mas tarde..."
          );
        }
      });
  }

  /**
   * this method allow to build the form group
   * @returns {void}
   */
  buildFormGroup() {
    this.activityForm = new FormGroup({
      activityName: new FormControl(null, [Validators.required]),
      activityActive: new FormControl(true),
    });
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  open(content: any, activity?: Activity): void {
    if (activity) {
      this.managementActivity = activity;
      this.activityForm.controls.activityName.setValue(activity.name);
      this.activityForm.controls.activityActive.setValue(activity.isActive);
      this.modalTitle = `Editar Actividad ${activity.name}`;
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
      this.modalTitle = `Nueva Actividad`;
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
    this.activityForm.controls.activityName.setValue("");
    this.managementActivity = new Activity();
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
  private UpdateCreateActivity() {
    this.managementActivity.name =
      this.activityForm.controls.activityName.value;
    this.managementActivity.isActive =
      this.activityForm.controls.activityActive.value;
    this.managementActivity.createdBy =
      localStorage.getItem(environment.localStorage.userName) || "";
    this.managementActivity.modifiedBy =
      localStorage.getItem(environment.localStorage.userName) || "";
    if (this.managementActivity.id !== 0) {
      this.adminService
        .updateActivity(this.managementActivity)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Actulización de Actividad",
              "La Actividad se actualizó correctamente"
            );
            this.fetchAllActivities();
          } else {
            this.toastService.showErrorToast(
              "Actulización de Actividad",
              `${response.errors[0]}`
            );
          }
        });
    } else {
      this.adminService
        .createActivity(this.managementActivity)
        .subscribe((response: ResultHelper) => {
          if (response.success) {
            this.toastService.showSuccessToast(
              "Nueva Actividad",
              "La Actividad se creó correctamente"
            );
            this.fetchAllActivities();
          } else {
            this.toastService.showErrorToast(
              "Nueva de Actividad",
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
  public saveActivity() {
    if (this.activityForm.valid) {
      this.UpdateCreateActivity();
      this.modalService.dismissAll();
    } else {
      this.activityForm.markAllAsTouched();
      this.toastService.showErrorToast("Error", "Campos requeridos");
    }
  }

  /**
   * this is called when the user select the delete button, make inactive the activity
   * @param {activity:Activity}  the activity to be updated
   * @returns {void}
   */
  public makeInactive(activity: Activity) {
    this.messageService
      .showAlertQuestion("Eliminar Actividad", "Desea eliminar la actividad?")
      .then((result: any) => {
        activity.isActive = false;
        activity.modifiedBy =
          localStorage.getItem(environment.localStorage.userName) || "";
        this.adminService
          .updateActivity(activity)
          .subscribe((response: ResultHelper) => {
            if (response.success) {
              this.toastService.showSuccessToast(
                "Eliminar Actividad",
                "La Actividad se ha eliminado correctamente"
              );
              this.fetchAllActivities();
            } else {
              this.toastService.showErrorToast(
                "Eliminar Actividad",
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
    this.fetchAllActivities();
  }
}

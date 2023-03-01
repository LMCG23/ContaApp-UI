import {
  Component,
  AfterViewInit,
  Inject,
  ViewChild,
  OnInit,
} from "@angular/core";
import { MessageService } from "../shared/message/message.service";
import Swal from "sweetalert2";
import { EventTypes } from "../shared/models/Enums/EventTypes";
import { ToastService } from "../shared/toastService/toast.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../environments/environment";
//declare var require: any;

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild("content") private content: any;

  subtitle: string;
  closeResult: string = "";

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ToastService) private toastService: ToastService,
    private modalService: NgbModal
  ) {
    this.subtitle = "This is some text within a card block.";
  }

  /**
   * this method allow open the modal
   * @returns {void}
   */
  public open(content?: any): void {
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
      this.open(this.content);
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  EventTypes = EventTypes;

  ngAfterViewInit() {
    let clientSelected =
      localStorage.getItem(environment.localStorage.clientId) || null;
    if (clientSelected == null) {
      this.open(this.content);
    }
  }

  // Examples how to use the alerts
  showErrorAlert() {
    this.messageService.showError("Test Error");
  }
  showWarningAlert() {
    this.messageService.showWarning("Test Warning");
  }
  showQuestionAlert() {
    this.messageService
      .showAlertQuestion("Test Question", "Do you want to save the changes?")
      .then((result: any) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }
  // Examples how to use the alerts

  // Examples how to use toast
  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast(
          "Success toast title",
          "This is a success toast message."
        );
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast(
          "Warning toast title",
          "This is a warning toast message."
        );
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast(
          "Error toast title",
          "This is an error toast message."
        );
        break;
      default:
        this.toastService.showInfoToast(
          "Info toast title",
          "This is an info toast message."
        );
        break;
    }
  }
  // Examples how to use toast
}

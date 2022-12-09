import { Component, Inject, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
import {
  Employee,
  Product,
  TableRows,
  TopSelling,
} from "../../../component/table/table-data";
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
  topSelling: Product[];

  trow: TableRows[];

  //List of Activities
  public activityList: Array<Activity> = new Array<Activity>();

  //Variables
  accountingId: number = 0;
  constructor(
    @Inject(MessageService) private messageService: MessageService,
    private adminService: AdminService,
    @Inject(ToastService) private toastService: ToastService
  ) {
    this.topSelling = TopSelling;

    this.trow = Employee;
  }

  ngOnInit(): void {
    this.accountingId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    if (this.accountingId) {
      this.fetchAllActivitiesByAcountingFirmId();
    }
  }

  public fetchAllActivitiesByAcountingFirmId(): void {
    let request: InquiryResquest = new InquiryResquest();
    request.accountingFirmId = this.accountingId;
    debugger;
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
}

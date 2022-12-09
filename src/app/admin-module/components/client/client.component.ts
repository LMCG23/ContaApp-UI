import { Component, Inject, OnInit } from "@angular/core";
import { AdminService } from "../../../admin-module/service/admin.service";
import { MessageService } from "../../../shared/message/message.service";
import { ToastService } from "../../../shared/toastService/toast.service";
import { Client } from "../../../shared/models/Client";
import { environment } from "../../../../environments/environment";
import { InquiryResquest } from "../../../shared/models/Common/InquiryRequest";
import { InquiryResponse } from "../../../shared/models/Common/InquiryResponse";

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

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    private adminService: AdminService,
    @Inject(ToastService) private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.accountingId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    if (this.accountingId) {
      this.fetchAllClientsByAcountingFirmId();
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
}

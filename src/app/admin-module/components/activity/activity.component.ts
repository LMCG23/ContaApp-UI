import { Component, OnInit } from "@angular/core";
import { Activity } from "../../../shared/models/Activity";
import { environment } from "../../../../environments/environment";
import {
  Employee,
  Product,
  TableRows,
  TopSelling,
} from "../../../component/table/table-data";

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
  accountingId: number;
  constructor() {
    this.accountingId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    if (this.accountingId) {
      // this.fetchActivityByAccountingId();
    }
    this.topSelling = TopSelling;

    this.trow = Employee;
  }

  ngOnInit(): void {}

  // fetchActivityByAccountingId() {}
}

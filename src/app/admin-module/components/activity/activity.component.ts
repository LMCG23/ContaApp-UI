import { Component, OnInit } from '@angular/core';
import { Employee, Product, TableRows, TopSelling } from '../../../component/table/table-data';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  topSelling:Product[];

  trow:TableRows  [];

  constructor() {

    this.topSelling=TopSelling;

    this.trow=Employee;
  }

ngOnInit(): void {

}

}

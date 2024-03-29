import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { environment } from "../../../environments/environment";
import { AdminService } from "../../admin-module/service/admin.service";
import { AuthserviceService } from "../authentication/authservice.service";
import { ClientSelectComponent } from "../client-select/client-select/client-select.component";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public userName: string = `${localStorage.getItem(
    environment.localStorage.nameOfuser
  )} ${localStorage.getItem(environment.localStorage.userLastName)}`;
  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  public myCompOneObj: any;
  btnName: string = "";
  constructor(
    private modalService: NgbModal,
    @Inject(AuthserviceService) private authSvs: AuthserviceService,
    private router: Router,
    @Inject(AdminService) private adminService: AdminService
  ) {}

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: "btn-danger",
      icon: "ti-link",
      title: "Luanch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      btn: "btn-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM",
    },
    {
      btn: "btn-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM",
    },
    {
      btn: "btn-warning",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/user1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM",
    },
    {
      useravatar: "assets/images/users/user2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM",
    },
    {
      useravatar: "assets/images/users/user4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  public selectedLanguage: any = {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  };

  public languages: any[] = [
    {
      language: "English",
      code: "en",
      type: "US",
      icon: "us",
    },
    {
      language: "Español",
      code: "es",
      icon: "es",
    },
    {
      language: "Français",
      code: "fr",
      icon: "fr",
    },
    {
      language: "German",
      code: "de",
      icon: "de",
    },
  ];

  ngAfterViewInit() {
    this.btnName =
      localStorage.getItem(environment.localStorage.clientName) || "";
  }

  ngOnInit(): void {
    this.myCompOneObj = new ClientSelectComponent(
      this.modalService,
      this.adminService
    );
  }

  logout() {
    this.authSvs.logout();
    this.router.navigate(["/login-page"]);
  }
}

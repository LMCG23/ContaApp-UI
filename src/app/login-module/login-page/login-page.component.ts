import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "../../shared/toastService/toast.service";
import { AuthserviceService } from "../../shared/authentication/authservice.service";
import { User } from "../../shared/models/User";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(AuthserviceService) private authService: AuthserviceService,
    @Inject(ToastService) private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  /*
   * this method build the formGroup
   */
  buildFormGroup() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  /*
   * this method do the login behaviour
   */
  onLogin() {
    const user: User = new User();
    user.userName = this.loginForm.controls.userName.value;
    user.password = this.loginForm.controls.password.value;
    this.authService.login(user).subscribe((res) => {
      if (res.operationSuccess && res.data) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.toastService.showErrorToast(
          "Error al iniciar sesión",
          "El usuario o la contraseña no son correctos"
        );
      }
    });
  }
}

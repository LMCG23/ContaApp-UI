import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { MessageService } from "../../shared/message/message.service";
import { ResultHelper } from "../../shared/models/Common/ResultHelper";
import { User } from "../../shared/models/User";
import { ToastService } from "../../shared/toastService/toast.service";
import { ProfileService } from "../service/profile.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  // Variables
  userId: number = 0;
  profileForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ToastService) private toastService: ToastService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(
      localStorage.getItem(environment.localStorage.userId) || ""
    );
    this.buildFormGroup();
    if (this.userId !== 0) {
      this.getUserById();
    }
  }

  /**
   * this method allow to build the form group
   * @returns {void}
   */
  buildFormGroup(): void {
    this.profileForm = new FormGroup({
      nameOfUser: new FormControl(null, [Validators.required]),
      userLastName: new FormControl(null, [Validators.required]),
      userEmail: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * this method allow to fill the form group
   * @param {values:ResultHelper}  the Activity to be created
   * @returns {void}
   */
  fillFormGroup(values: ResultHelper): void {
    this.profileForm.controls.nameOfUser.setValue(values.value.name);
    this.profileForm.controls.userLastName.setValue(values.value.lastName);
    this.profileForm.controls.userEmail.setValue(values.value.email);
  }
  /**
   * this method allow gets the user by the id
   * @returns {void}
   */
  public getUserById(): void {
    this.profileService
      .getUserById(this.userId)
      .subscribe((result: ResultHelper) => {
        if (result.success) {
          this.fillFormGroup(result);
        } else {
          this.toastService.showErrorToast(
            "Error al obtener el usuario",
            "Usuario no encontrado..."
          );
        }
      });
  }

  /**
   * this method allow to update the user
   * @returns {void}
   */
  updateUser(): void {
    const user: User = new User();
    user.name = this.profileForm.controls.nameOfUser.value;
    user.lastName = this.profileForm.controls.userLastName.value;
    user.email = this.profileForm.controls.userEmail.value;
    user.id = this.userId;
    user.accountingFirmId = parseInt(
      localStorage.getItem(environment.localStorage.userAccountingFirm) || ""
    );
    user.modifiedBy =
      localStorage.getItem(environment.localStorage.userName) || "";
    user.modifiedTS = new Date();
    if (this.profileForm.valid) {
      this.messageService
        .showAlertQuestion("Actualizar Usuario", "Desea actualizar el usuario?")
        .then((result: any) => {
          if (result.isConfirmed) {
            this.profileService
              .updateUser(user)
              .subscribe((response: ResultHelper) => {
                if (response.success) {
                  this.toastService.showSuccessToast(
                    "Actulización de usuario",
                    "El Usuario se actualizó correctamente"
                  );
                  this.getUserById();
                } else {
                  this.toastService.showErrorToast(
                    "Actulización de usuario",
                    `${response.errors[0]}`
                  );
                }
              });
          }
        });
    } else {
      this.profileForm.markAllAsTouched();
      this.toastService.showErrorToast(
        "Error al actualizar el usuario",
        "Campos requeridos"
      );
    }
  }
}

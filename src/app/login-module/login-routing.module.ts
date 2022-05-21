import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";

const routes:Routes = [{
    component:LoginPageComponent,
    path:''
  },
{component:LoginPageComponent,path:'login-page'}]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class LoginRoutingModule {}

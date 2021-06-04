import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth.component";

const routes:Routes=[
    {path:'',component:AuthComponent},
    {path:'account',component:AccountComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class AuthRoutingModule{}
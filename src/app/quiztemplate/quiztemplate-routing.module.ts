import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";


import { QuiztemplateComponent } from "./quiztemplate.component";
import { ResultComponent } from "./result/result.component";

const routes:Routes =[
    {path: '',component: QuiztemplateComponent,canActivate:[AuthGuard] },
    {path:'result',component:ResultComponent,canActivate:[AuthGuard]},
];

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class QuiztemplateRoutingModule{}
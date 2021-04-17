import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { QuiztemplateComponent } from "./quiztemplate.component";
import { ResultComponent } from "./result/result.component";

const routes:Routes =[
    {path: '',component: QuiztemplateComponent },
    {path:'result',component:ResultComponent},
];

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class QuiztemplateRoutingModule{}
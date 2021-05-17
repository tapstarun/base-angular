import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FourzerofourComponent } from "./fourzerofour.component";
const route:Routes=[
    {path: '',component: FourzerofourComponent},
];
@NgModule({
    exports:[],
    imports:[CommonModule,RouterModule.forChild(route)],

})
export class FourzerofourModule{}
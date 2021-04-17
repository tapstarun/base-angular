import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { QuizComponent } from "./quiz.component";

const route: Routes =[
    {path:'',component:QuizComponent}
];
@NgModule({
    declarations:[QuizComponent],
    imports:[
        RouterModule.forChild(route),
        CommonModule
    ],

})
export class QuizModule{}
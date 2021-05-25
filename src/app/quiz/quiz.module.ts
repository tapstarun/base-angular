import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

import { QuizComponent } from "./quiz.component";
import { SlickCarouselModule } from 'ngx-slick-carousel';

const route: Routes =[
    {
        path:'',
        redirectTo:'auth',
        pathMatch:'full',
    },
    {
        path:':slug',
        component:QuizComponent,
        canActivate:[AuthGuard]      
    }

];
@NgModule({
    declarations:[
        QuizComponent,
    ],
    imports:[
        RouterModule.forChild(route),
        CommonModule,
        SharedModule,
        SlickCarouselModule
        
    ],

})
export class QuizModule{}
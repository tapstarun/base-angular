import { CommonModule  } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth.guard";
import { MemberComponent } from "./member.component";
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
const route:Routes=[
    {path:'',component:MemberComponent,canActivate:[AuthGuard] },
];

@NgModule({
    declarations:[
        MemberComponent,
    ],
    imports:[
        RouterModule.forChild(route),
        CommonModule,
        CarouselModule,
        SharedModule,
        SlickCarouselModule
    ]
})

export class MemberModule{}
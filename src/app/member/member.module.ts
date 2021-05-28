import { CommonModule  } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth.guard";
import { MemberComponent } from "./member.component";
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';


// Video controller 
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

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
        SharedModule,
        SlickCarouselModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,  
    ]
})

export class MemberModule{}
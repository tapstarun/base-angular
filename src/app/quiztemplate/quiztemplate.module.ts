import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from '@angular/material/dialog';


// Video controller 
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

import { QuestionComponent } from "./questions/questions.component";
import { QuiztemplateComponent } from "./quiztemplate.component";
import { PitchComponent } from "./result/pitch/pitch.component";
import { ResultComponent } from "./result/result.component";
import { VideosComponent } from "./videos/videos.component";
import { QuiztemplateRoutingModule } from "./quiztemplate-routing.module";


@NgModule({
    declarations:[
        QuiztemplateComponent,
        QuestionComponent,
        ResultComponent,
        PitchComponent,
        VideosComponent
    ], 
    imports:[
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,     
        RouterModule,
        CommonModule,       
        QuiztemplateRoutingModule,
        MatDialogModule,
    ],
    entryComponents:[ResultComponent]
})
export class QuiztemplateModule{}
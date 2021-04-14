import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Video controller 
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';


import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuiztemplateComponent } from './quiztemplate/quiztemplate.component';
import { QuestionComponent } from './quiztemplate/questions/questions.component';  
import { ResultComponent } from './quiztemplate/result/result.component';  
import { PitchComponent } from './quiztemplate/result/pitch/pitch.component';
import { VideosComponent } from './quiztemplate/videos/videos.component';



@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    QuiztemplateComponent,
    QuestionComponent,
    ResultComponent,
    PitchComponent,
    VideosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ResultComponent]
})
export class AppModule { }

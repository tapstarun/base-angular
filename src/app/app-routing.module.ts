import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { QuizComponent } from './quiz/quiz.component';
import { QuiztemplateComponent } from './quiztemplate/quiztemplate.component';

const routes: Routes = [
  {path:'quiztemplate',component:QuiztemplateComponent},
  {path:'quiz',component:QuizComponent},
  {path:'',redirectTo:'quiz', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

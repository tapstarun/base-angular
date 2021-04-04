import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { QuizComponent } from './quiz/quiz.component';
import { QuiztemplateComponent } from './quiz/quiztemplate/quiztemplate.component';

const routes: Routes = [
  {path:'quiz/start/:id',component:QuiztemplateComponent},
  {path:'quiz',component:QuizComponent},
  {path:'',redirectTo:'quiz', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

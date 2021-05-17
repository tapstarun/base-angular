import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'quiztemplate',loadChildren:()=>import('./quiztemplate/quiztemplate.module').then(m=>m.QuiztemplateModule)},
  {path:'quiz',loadChildren:()=>import('./quiz/quiz.module').then(m=>m.QuizModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'member',loadChildren:()=>import('./member/member.module').then(m=>m.MemberModule)},
  {path:'',redirectTo:'member', pathMatch: 'full'},
  {path:'**',loadChildren:()=>import('./fourzerofour/Fourzerofour.module').then(m=>m.FourzerofourModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

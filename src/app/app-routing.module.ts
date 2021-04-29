import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component'
const routes: Routes = [
  {path:'quiztemplate',loadChildren:()=>import('./quiztemplate/quiztemplate.module').then(m=>m.QuiztemplateModule)},
  {path:'quiz',loadChildren:()=>import('./quiz/quiz.module').then(m=>m.QuizModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'member',component:MemberComponent},
  {path:'',redirectTo:'quiz', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

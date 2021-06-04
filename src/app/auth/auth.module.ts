import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule , FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AccountComponent } from './account/account.component';
    
@NgModule({
    declarations:[
        
    AccountComponent],
    imports:[
        AuthRoutingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports:[]
})
export class AuthModule{}
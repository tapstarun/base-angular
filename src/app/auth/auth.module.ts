import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule , FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
    
@NgModule({
    declarations:[
        
    ],
    imports:[
        AuthRoutingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    exports:[]
})
export class AuthModule{}
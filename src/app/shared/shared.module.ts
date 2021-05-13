import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

import { LoaderComponent } from "./loader/loader.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
@NgModule({
    declarations:[
        ProgressBarComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports:[
        CommonModule,
        NgxSpinnerModule
    ],
    exports:[
        ProgressBarComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent
    ],
})
export class SharedModule{}
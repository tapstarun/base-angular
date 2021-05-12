import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader/loader.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
    declarations:[
        ProgressBarComponent,
        LoaderComponent
    ],
    imports:[
        CommonModule,
        NgxSpinnerModule
    ],
    exports:[
        ProgressBarComponent,
        LoaderComponent
    ],
})
export class SharedModule{}
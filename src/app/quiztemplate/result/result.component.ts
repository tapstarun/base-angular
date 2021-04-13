import { Component, Input, OnInit,Inject } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PitchComponent } from './pitch/pitch.component';


@Component({
    selector:'app-result',
    templateUrl:'./result.component.html',
    styleUrls:['./result.component.css']
})
export class ResultComponent implements OnInit{
    @Input() resultPageData:any;
    showBreakDown=false;

    constructor(public dialog: MatDialog) {}

    ngOnInit(){
        console.log('result page call ');
        console.log(this.resultPageData);
    }

    openBreakDown(){
        console.log("after button clicked ");
        this.showBreakDown=true;
        
        const dialogRef = this.dialog.open(PitchComponent,{
            data: this.resultPageData
          });

        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
    }
}

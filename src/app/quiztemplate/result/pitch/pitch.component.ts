import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  ans:boolean,
  userAns:string,
  correctAns:string,
  totalQuestion:number,
  correctQuestion:number,
  isQuizSwing:boolean,
  avgMsTime:number
}
@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.css']
})
export class PitchComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public dialogref: MatDialogRef<PitchComponent>) {}

  ngOnInit() {
        this.updateSize();
    }

    updateSize() {
        this.dialogref.updateSize("80%", "");
    }

  closePopup(){
    this.dialogref.close();
  }

}

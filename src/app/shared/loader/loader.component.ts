import { Component, Input, OnChanges } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements  OnChanges {
  @Input() showloader:boolean;
  constructor(private SpinnerService: NgxSpinnerService) { }

  

  ngOnChanges(){
    this.SpinnerService.hide()
    if(this.showloader){
      this.SpinnerService.show();    
    }
    
  }
 
}

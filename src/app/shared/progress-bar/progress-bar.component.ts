import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
  <div class="progress-bar-container">
     <div class="progress-bar {{color}}" 
      [ngStyle]="{'width': progress + '%'}">
      
     </div>
  </div>
  `,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() public progress: number;
  @Input() public total: number;
  color: string;
  constructor() { }

 
 

  ngOnInit(): void {     
    //  console.log('on init of progress bar');
    this.progressBarUpdate();
  }


  progressBarUpdate(){
       //if we don't have progress, set it to 0.
       if(!this.progress) {
        this.progress = 0;
      }
      //if we don't have a total aka no requirement, it's 100%.
      if(this.total === 0) {
        this.total = this.progress;
      } else if(!this.total) {
        this.total = 100;
      }
      //if the progress is greater than the total, it's also 100%.
      if(this.progress > this.total) {
        this.progress = 100;
        this.total = 100;
      }
      this.progress = (this.progress / this.total) * 100;
      if(this.progress < 55) {
        this.color = 'red';
      } else if(this.progress < 75) {
        this.color= 'yellow';
      } else {
      this.color = 'green';
      }

      console.log(this.progress);
  }
}

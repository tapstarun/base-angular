import { Component,OnInit,Input } from "@angular/core";

@Component({
    selector:'app-questions',
    templateUrl:'./questions.component.html'
})

export class QuestionComponent implements OnInit{
@Input() question:object;
    constructor(){}

    ngOnInit(){
        console.log(this.question);
    }
}
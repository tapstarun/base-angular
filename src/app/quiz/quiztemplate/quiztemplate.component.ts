import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiztemplate',
  templateUrl: './quiztemplate.component.html',
  styleUrls: ['./quiztemplate.component.css']
})
export class QuiztemplateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const indexId=this.activatedRoute.snapshot.params.id;
    console.log(indexId);
  }

}

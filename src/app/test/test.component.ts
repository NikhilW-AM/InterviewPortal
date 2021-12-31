import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [],
})
export class TestComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  testJsonDetails?: any;
  testArray?: any;
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.questionService
      .getJsonDetails()
      .subscribe((data) => (this.testJsonDetails = data));
  }

  onSelect(test: any, question: any) {
    this.router.navigate(['/test', test, question]);
  }
}

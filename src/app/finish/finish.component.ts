import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styles: [``],
})
export class FinishComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private answerService: AnswerService
  ) {}
  testJsonDetails?: any;
  testId?: any;
  testName: string = '';
  questionLength: number = 0;
  qSet: any;
  correct: any;
  correctCount: number = 0;
  wrongCount: number = 0;

  ngOnInit(): void {
    this.getData();
    this.getParameter();
    this.getLocalData();

    //this.getTestName();

    //this.checkAns();
  }

  getData() {
    this.questionService.getJsonDetails().subscribe((data) => {
      this.testJsonDetails = data;
      this.getTestName();
    });
  }

  getParameter() {
    let id = this.route.snapshot.paramMap.get('fid');
    this.testId = id;
  }

  getLocalData() {
    let data = localStorage.getItem('option');
    if (data === null) return;

    this.correct = JSON.parse(data);
  }
  getTestName() {
    let index = 0;
    for (let i = 0; i < this.testJsonDetails.tests.length; i++) {
      if (this.testId === this.testJsonDetails.tests[i]._id) {
        this.testName = this.testJsonDetails.tests[i].name;
        this.questionLength = this.testJsonDetails.tests[i].questions.length;
        index = i;
      }
    }
    this.qSet = this.testJsonDetails.tests[index].questions;

    if (this.qSet && this.correct) {
      this.checkAns();
    }
  }

  checkAns() {
    this.getLocalData();
    let j = 0;
    let checkBoxop: any[] = [];
    let checkBoxFlag: Boolean = true;
    let correctCheckBoxArray: number[] = [];
    for (let i = 0; i < this.qSet.length; i++) {
      if (this.qSet[i].type) {
        checkBoxop = this.correct[i];
        correctCheckBoxArray = this.qSet[i].correctOptionIndex;
        for (j = 0; j < this.qSet[i].correctOptionIndex.length; j++) {
          if (checkBoxop && checkBoxop.includes(correctCheckBoxArray[j])) {
            checkBoxFlag = true;
          } else {
            checkBoxFlag = false;
            break;
          }
        }
        if (checkBoxFlag) {
          this.correctCount++;
        } else {
          this.wrongCount++;
        }
      } else {
        if (this.qSet[i].correctOptionIndex === this.correct[i]) {
          this.correctCount++;
        } else {
          this.wrongCount++;
        }
      }
    }
  }

  clear() {
    localStorage.clear();
  }
}

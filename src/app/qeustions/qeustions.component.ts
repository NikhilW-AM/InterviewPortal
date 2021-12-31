import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-qeustions',
  templateUrl: './qeustions.component.html',
  styles: [],
})
export class QeustionsComponent implements OnInit {
  testId: any;
  testName: any;
  testDeatilsArray?: any;
  testArray?: any;
  questionData?: any;
  index: number = 0;
  questionArray?: any;
  questionIndex: number = 0;
  j: number = 0;
  qSet?: any;
  questionName?: string;
  optionArray: string[] = [];
  isNext: boolean = false;
  isPrevious: boolean = false;
  correctOption: any[] = [];
  correct: any[] = [];
  cbarr: number[] = [];
  checkBoxArray: number[] = [];
  values: string[] = [];
  qid: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getParameter();
    this.isDisabled();
    this.getLocalData();
    this.route.paramMap.subscribe((info: ParamMap) => {
      this.qid = info.get('qid');

      if (this.qSet) {
        this.fun();
      }
    });
  }

  getData() {
    this.questionService.getJsonDetails().subscribe((data) => {
      this.testDeatilsArray = data;
      this.CompareTestName();
    });
  }
  getParameter() {
    let id = this.route.snapshot.paramMap.get('tid');
    this.testId = id;
  }

  CompareTestName() {
    for (let i = 0; i < this.testDeatilsArray.tests.length; i++) {
      if (this.testId === this.testDeatilsArray.tests[i]._id) {
        this.questionIndex = i;
        this.testName = this.testDeatilsArray.tests[i].name;
      }
    }
    this.qSet = this.testDeatilsArray.tests[this.questionIndex].questions;
    this.answerService.checkCorrectAns(this.qSet);
    this.fun();

    this.optionArray = this.qSet[this.j].options;
    this.isDisabled();
  }

  fun() {
    for (let i = 0; i < this.qSet.length; i++) {
      if (this.qid === this.qSet[i]._id) {
        this.j = i;
        break;
      }
    }
  }
  nextQuestion() {
    this.j++;
    this.isDisabled();
    this.setQuestionUrl(this.qSet[this.j]._id);
    this.cbarr = [];
  }
  previousQuestion() {
    this.j--;
    this.isDisabled();
    this.setQuestionUrl(this.qSet[this.j]._id);
  }

  setQuestionUrl(qSet: any) {
    this.router.navigate(['/test', this.testId, qSet]);
  }
  isDisabled() {
    if (this.j) {
      this.isNext = this.isPrevious = false;
      if (this.j === this.qSet.length - 1) {
        this.isNext = true;
      }
    } else {
      this.isPrevious = true;
    }
  }

  optionsStore(queId: any, index: any) {
    if (queId.hasOwnProperty('type')) {
      if (!this.cbarr.includes(index)) {
        this.cbarr.push(index);
      } else {
        let i = this.cbarr.indexOf(index);
        this.cbarr.splice(i, 1);
        //console.log(this.cbarr);
      }
      this.correct[this.j] = this.cbarr;
    } else {
      this.correct[this.j] = index;
    }
    localStorage.setItem('option', JSON.stringify(this.correct));
  }

  isTrue(index: number, value: number) {
    if (value) {
      if (this.correct[this.j] && this.correct[this.j].includes(index)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.correct[this.j] === index) {
        return true;
      } else {
        return false;
      }
    }
  }

  getLocalData() {
    let data = localStorage.getItem('option');
    if (data === null) return;

    this.correct = JSON.parse(data);
  }

  checkAns() {
    this.getLocalData();
    let c = 0,
      j = 0;
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
          c++;
        }
      } else {
        if (this.qSet[i].correctOptionIndex === this.correct[i]) {
          c++;
        }
      }
    }

    //console.log(c);
    if (this.testId) this.router.navigate(['/finish', this.testId]);
    //this.answerService.check(this.qSet, this.correct);
  }
}

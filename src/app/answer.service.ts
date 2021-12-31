import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor() {}
  correct?: any;
  option: any[] = [];
  data?: any;
  qSet?: any;

  c: number = 0;
  getArray() {
    this.data = localStorage.getItem('option');
    this.correct = JSON.parse(this.data);
    //console.log(this.correct);
  }

  checkCorrectAns(questionSet: any) {
    this.qSet = questionSet;
  }

  check(qSet: any, correctOP: any) {
    let c = 0;
    let checkBoxop: any[];
    let checkBoxFlag: Boolean = true;
    for (let i = 0; i < qSet.length; i++) {
      if (qSet[i].type) {
        checkBoxop = correctOP[i];
        for (let j = 0; j < qSet[i].correctOptionIndex.length; j++) {
          if (!qSet[i].correctOptionIndex.includes(checkBoxop[j])) {
            checkBoxFlag = false;
            break;
          }
        }
        if (checkBoxFlag) {
          c++;
        }
      } else {
        if (qSet[i].correctOptionIndex === correctOP[i]) {
          c++;
        }
      }
    }
    // console.log(c);
  }
}

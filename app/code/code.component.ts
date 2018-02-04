import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  lp = "assets/images/lp.png"; 
  boca = "assets/images/boca.png";
  bocap = "assets/images/bocap.png";
  ucla = "assets/images/uc.png";
  uclap = "assets/images/uclap.png";
  counter = 0;
  musebuds = "assets/images/musebuds.png";
  musebudsP = "assets/images/musebudsP.png";
  portfolio = "assets/images/pro.png";
  portfolioP = "assets/images/proP.png";

  count() {
    this.counter++;
    if (this.counter > 3) {
      this.counter = 0;
    }
  }

  countB() {
    this.counter--;
    if (this.counter < 0) {
      this.counter = 3;
    }
  }
  getImage(choice: string) {
    if (choice === 'lp') {
      return this.lp;
    }
    else if (choice === 'boca') {
      return this.boca;
    }
    else if (choice === 'bocap') {
      return this.bocap;
    }
    else if (choice === 'ucla'){
      return this.ucla;
    }
    else if (choice === 'uclap') {
      return this.uclap;
    }
    else if (choice === 'portfolio') {
      return this.portfolio;
    }
    else if (choice === 'portfoliop') {
      return this.portfolioP;
    }
    else if (choice === 'musebuds') {
      return this.musebuds;
    }
    else if (choice === 'musebudsp') {
      return this.musebudsP;
    }
  }

  selectFL() {
      return 'select';
  }

  selectFB() {
    if (this.counter !== 1) {
      return 'select';
    }
  }

  selectFF() {
    if (this.counter === 2 || this.counter === 3) {
      return 'select';
    }
  }

  selectB() {
    if (this.counter === 1 || this.counter === 2 ) {
      return 'select';
    }
  }


  constructor() { }

  ngOnInit() {
  }

}

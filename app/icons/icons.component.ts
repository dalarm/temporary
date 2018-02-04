import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent{
  check = false;
  home = 'assets/images/home.png';
  note = 'assets/images/notes2.png';
  combine = 'assets/images/combined.png';
  cat = 'assets/images/cat.png';
  dance = 'assets/images/dance.png';
  postb = 'assets/images/postb.png';
  hover = false;
  currentURL = window.location.href;
  pathArray = this.currentURL.split('/');

@Output('change') change = new EventEmitter();

  toggle() {
    this.hover = !this.hover;
  }

  getImage(choice: string) {
    if (this.pathArray[3] === 'music' && choice === 'note') {
        return this.home;
    }
    else if (choice === 'note') {
        if (this.hover === true) {
            return this.combine;
        }
        return this.note;
    }
    else if (this.pathArray[3] === 'code' && choice === 'cat'){
        return this.home;
    }
    else if (choice === 'cat') {
      return this.cat;
    }
    else if (choice === 'dance'){
      return this.dance;
    }
    else if (choice === 'postb'){
      return this.postb;
    }
  }

  getLink() {
    if (this.pathArray[3] === 'music') {
      return '';
    }
    else {
      return 'music';
    }
  }

  getLinkC() {
    if(this.pathArray[3] === 'code') {
      return '';
    }
    else {
      return 'code';
    }
  }

  changeBG() {
    this.currentURL = window.location.href;
    this.pathArray = this.currentURL.split('/');
    this.getLink();
    this.change.emit();
  }
}

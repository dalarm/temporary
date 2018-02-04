import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent{

first = 'assets/images/first.jpg';
second = 'assets/images/second.jpg';
third = 'assets/images/third.jpg';
fourth = 'assets/images/fourth.jpg';
fifth = 'assets/images/fifth.jpg';

getImage(choice: string) {
  if (choice === 'first') {
    return this.first;
  }
  else if (choice === 'second') {
    return this.second;
  }
  else if (choice === 'third') {
    return this.third;
  }
  else if (choice === 'fourth') {
    return this.fourth;
  }
  else if (choice === 'fifth') {
    return this.fifth;
  }
}

}

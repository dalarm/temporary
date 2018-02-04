import { Component } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
pathArray = [];
currentURL = '';
bg1 = "url('assets/images/ffbg.jpg')";
bg2 = "url('assets/images/bg52.jpg')";

constructor(private http: Http) {
  this.currentURL = window.location.href;
  this.pathArray = this.currentURL.split('/');

}

onClick() {
  this.currentURL = window.location.href;
  this.pathArray = this.currentURL.split('/');
  this.changeBG();
}
changeBG() {
  if (this.pathArray[3] === 'music') {
    return this.bg2;
  }
  else {
    return this.bg1;
  }
}

}

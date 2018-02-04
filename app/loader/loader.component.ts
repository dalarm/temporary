import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  welcome = "assets/sounds/intro.mp3"
  toggle(){
      this.playSound();
      let load = document.getElementById('loader');
      load.parentNode.removeChild(load);
  }

  playSound(){
    let playS = new Audio(this.welcome)
    playS.play();
  }

}

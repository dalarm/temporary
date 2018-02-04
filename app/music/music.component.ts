import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent{

bg1 = "url('assets/images/bg52.jpg')";

loadAPI: Promise<any>;

constructor() {
  this.loadAPI = new Promise((resolve) => {
    this.loadScript();
    resolve(true);
  });
}


public loadScript() {
  let exists = false;
  const script = document.getElementsByTagName('script')
  for (let i = 0; i < script.length; ++i) {
    if (script[i].getAttribute('src') != null && script[i].getAttribute('src').includes('loader')) {
      exists = true;
      }
  }

  if (!exists) {
    const dynamicScripts = ['assets/js/audiovisual.js'];

    for (let i = 0; i < dynamicScripts .length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

}

}

stop(){
  let song = <HTMLAudioElement>document.getElementById("first");
  song.pause();

  let song2 = <HTMLAudioElement>document.getElementById("second");
  song2.pause();
}

changeBG() {
  return this.bg1;
}
}

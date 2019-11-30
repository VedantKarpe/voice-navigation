import { Component, OnInit, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'voiceNavigation';

  speechRecognition;
  @ViewChild('container') private container: ElementRef;

  constructor(private router: Router, private ngZone: NgZone, private renderer: Renderer2) { }

  ngOnInit() {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    this.speechRecognition = new webkitSpeechRecognition();

    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = 'en-us';
    this.speechRecognition.maxAlternatives = 1;

    this.listenInput();
    this.speechRecognition.start();
  }

  listenInput() {
    this.speechRecognition.onresult = (event) => {
      const last = event.results.length - 1;
      console.log(last);
      console.log('Confidence: ', event.results[last][0].transcript);
      console.log('Confidence: ', event.results);
      if (event.results[last][0].transcript.trim() === 'home') {
        this.ngZone.run(() => this.router.navigate(['/home']));
      }
      if (event.results[last][0].transcript.trim() === 'about') {
        this.ngZone.run(() => this.router.navigate(['/about']));
      }

      if (event.results[last][0].transcript.trim() === 'red') {
        this.setColor('red');
      }
      if (event.results[last][0].transcript.trim() === 'blue') {
        this.setColor('blue');
      }
      if (event.results[last][0].transcript.trim() === 'green') {
        this.setColor('green');
      }
      if (event.results[last][0].transcript.trim() === 'yellow') {
        this.setColor('yellow');
      }

    };


  }


  setColor(color) {
    this.renderer.setStyle(this.container.nativeElement, 'color', color);
  }

}

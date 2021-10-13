import { Component } from '@angular/core';
import { PrimeCalculator } from './app.prime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web worker sample';
  prime10 : number = 0;
  prime10000 : number = 0;
  poorCounter: number = 0;
  optimizedCounter: number = 0;

  findPrimeNumber(num) {
    this.prime10 = PrimeCalculator.findNthPrimeNumber(num);
  }

  find10000thPrimeNumberPoorly(num) {
    this.prime10000 = PrimeCalculator.findNthPrimeNumber(num);
  }

  find10000thPrimeNumber(num) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.prime10000 = data;
      };
      worker.postMessage(num);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  incrementPoorCounter() {
    this.poorCounter += 1;
  }

  incrementOptimizedCounter() {
    this.optimizedCounter += 1;
  }
}

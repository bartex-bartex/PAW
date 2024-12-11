import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isFormVisible: boolean = false;

  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('imageSection') imageSection!: ElementRef;

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.section1.nativeElement) {
            console.log(this.section1)
            this.isFormVisible = true;
          }
        } else {
          if (entry.target === this.section1.nativeElement) {
            console.log(this.section1)
            this.isFormVisible = false;
          }
        }
      });
    }, {
      threshold: 0.5 // Element musi być widoczny w co najmniej 50% na ekranie
    });

    // Obserwujemy oba elementy
    observer.observe(this.section1.nativeElement);
    // observer.observe(this.imageSection.nativeElement);
  }
}

import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {

  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT)private document1: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll():void{
    if(window.pageYOffset || this.document1.documentElement.scrollTop || this.document1.body.scrollTop > 100){
      this.windowScrolled = true;
      console.log('windowScrolled: true');
    }
    else if(this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10){
      this.windowScrolled = false;
      console.log('windowScrolled: false');
    }
  }

  ngOnInit(): void {
    (function smoothscroll(): void{
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if(currentScroll > 0){
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

}

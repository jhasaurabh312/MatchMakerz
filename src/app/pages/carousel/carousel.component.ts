import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule, BsDropdownModule } from 'ngx-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig] 
})
export class CarouselComponent implements OnInit {

  check1 : boolean;
  check2 : boolean;
  check3 : boolean;

  // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
// showNavigationArrows = false;
//   showNavigationIndicators = false;
//   images = [

//     '../../../assets/icons/Group_1.png',
//     // '../../../assets/icons/Group_2.png',
//     // '../../../assets/icons/Group_3.png'
//   ]

  constructor(config: NgbCarouselConfig, public router : Router) {
    // customize default values of carousels used by this component tree
    // config.showNavigationArrows = true;
    // config.showNavigationIndicators = true;
  }

  ngOnInit(){

    if(localStorage.getItem('token') != null)
       this.router.navigate(['/clients']);
    else{
      this.check1 = true;
      this.check2 = false;
      this.check3 = false;
    }   
    
  }

  check(data){
    if(data === 1){
      this.check1 = false;
      this.check2 = true;
      this.check3 = false;
    }

    if(data === 2){
      this.check1 = false;
      this.check2 = false;
      this.check3 = true;
    }

    if(data === 3){
      this.router.navigate(['/get-otp']);
    }
  }
}
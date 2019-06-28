import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule, BsDropdownModule } from 'ngx-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig] 
})
export class CarouselComponent implements OnInit {

  // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [

    '../../../assets/icons/Group_1.png',
    '../../../assets/icons/Group_2.png',
    '../../../assets/icons/Group_3.png'
  ]

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(){

  }
}
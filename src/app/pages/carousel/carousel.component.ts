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

  // images = [
  //   '../../../assets/images/Group 1110.png',
  //   '../../../assets/images/Group 2058.png',
  //   '../../../assets/images/Group 2062.png',
  // ].map(() => `images`);
  constructor() { 
  
  }

  ngOnInit() {
  }

}

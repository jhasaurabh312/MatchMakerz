import { Component, OnInit } from '@angular/core';
import { staticProductDetail} from './clients.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  productDetail: Array<{
    img: string;
    name : string;
    marraige: string;
    age: number;
    qualification: string;
    height : string;
    job: string;
    about: string;
    location: string;
    }> = staticProductDetail;
  constructor() { }

  ngOnInit() {
    console.log(this.productDetail.length);
  }

  imageStyle(img) {
    return {
      'height': '40vh',
      'width' : '50%',
      'float' : 'left',
      'background-image':  `url('../../../assets/images/${img}')`
    };
  }
}

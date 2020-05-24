import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() value = 0;
  @Input() size = 'large';

  constructor() { }

  ngOnInit() {
  }

  public IsSmall(): boolean {

    return this.size === 'small';

  }
}

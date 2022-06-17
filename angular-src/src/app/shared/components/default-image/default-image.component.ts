import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-image',
  templateUrl: './default-image.component.html',
  styleUrls: ['./default-image.component.scss']
})
export class DefaultImageComponent implements OnInit {
  readonly defaultImage: string = '../../../../assets/cymptom_logo.svg';

  @Input() src: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  defaultSrc(event: any) {
    event.target.src = this.defaultImage;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-image',
  templateUrl: './default-image.component.html',
  styleUrls: ['./default-image.component.scss']
})
export class DefaultImageComponent implements OnInit {
  readonly defaultImage: string = '../../../../assets/cymptom_logo.svg';

  @Input() src: string = '';
  @Input() width: number = 20;
  @Input() height: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  defaultSrc(event: Event) {
    const { target } = event;
    if (target)
      (target as HTMLImageElement).src = this.defaultImage;
  }
}

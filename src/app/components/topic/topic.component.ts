import { Component } from '@angular/core';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})

export class TopicComponent {
  availableColors: any[] = [
    { name: 'none', color: undefined, selected: true },
    { name: 'Primary', color: 'primary', selected: false },
    { name: 'Accent', color: 'accent', selected: false },
    { name: 'Warn', color: 'warn', selected: false },
  ];
}


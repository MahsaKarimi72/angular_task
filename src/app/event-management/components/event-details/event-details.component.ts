import { Component, Input } from '@angular/core';
import { EventItem } from '../../models/event.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: false,
})
export class EventDetailsComponent {
  @Input() event!: EventItem;
  constructor(private msg: NzMessageService) {}
  async copyLink() {
    const url = `${location.origin}/events/view/${this.event.id}`;
    await navigator.clipboard.writeText(url);
    this.msg.success('Public link copied!');
  }
}

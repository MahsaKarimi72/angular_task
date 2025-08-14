import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  standalone: false,
})
export class MyEventsComponent {
  constructor(private modal: NzModalService) {}

  openCreateEvent() {
    this.modal.create({
      nzTitle: 'Create Event',
      nzContent: CreateEventComponent,
      nzFooter: null,
      nzWidth: 600,
    });
  }
}

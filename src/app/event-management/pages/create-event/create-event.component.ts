import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventItem } from '../../models/event.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  standalone: false,
})
export class CreateEventComponent {
  constructor(
    private svc: EventService,
    private modalRef: NzModalRef,
    private router: Router
  ) {}

  onSubmit(payload: Partial<EventItem>) {
    this.svc.create({
      ...(payload as EventItem),
      organizer: { id: 'org-1', businessName: 'Event Corp' },
      status: 'Active',
      id: '',
    });

    this.modalRef.close(); 
  }
}

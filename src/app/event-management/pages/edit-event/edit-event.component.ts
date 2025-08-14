import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventItem } from '../../models/event.model';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  standalone: false,
})
export class EditEventComponent implements OnInit {
  vm$!: Observable<EventItem>;

  constructor(
    private svc: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: { eventId?: string }
  ) {}

  ngOnInit() {
    const id =
      this.data?.eventId || this.route.snapshot.paramMap.get('id') || '';

    this.vm$ = this.svc.byId$(id).pipe(
      filter((event): event is EventItem => !!event) // ensures vm$ never emits undefined
    );
  }

  onSubmit(id: string, patch: Partial<EventItem>) {
    this.svc.update(id, patch);
    this.modalRef.close();
    // only navigate if opened as page
    if (!this.data?.eventId) {
      this.router.navigateByUrl('/p/events');
    }
  }
}

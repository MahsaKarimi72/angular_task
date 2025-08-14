import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventItem } from '../../models/event.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { EditEventComponent } from '../../pages/edit-event/edit-event.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  standalone: false,
})
export class EventListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 5;
  loading = true;
  q = '';
  visibility: 'all' | 'public' | 'private' = 'all';
  sort: 'asc' | 'desc' = 'desc';

  data$!: Observable<EventItem[]>;
  counts$!: Observable<{ total: number; public: number; private: number }>;

  constructor(
    private svc: EventService,
    private msg: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    const src$ = this.svc.myEvents$();
    this.data$ = combineLatest([src$]).pipe(
      map(([list]) => {
        this.loading = false;
        return this.svc.filterSearchSort(list, {
          q: this.q,
          visibility: this.visibility,
          sort: this.sort,
        });
      })
    );
    this.counts$ = src$.pipe(map((list) => this.svc.counts(list)));
  }

  applyFilters() {
    this.ngOnInit();
  }

  confirmDelete(it: EventItem) {
    this.modal.confirm({
      nzTitle: `Delete "${it.title}"?`,
      nzContent: 'This action cannot be undone.',
      nzOkDanger: true,
      nzOnOk: () => {
        this.svc.delete(it.id);
        this.msg.success('Event deleted');
      },
    });
  }

  openEdit(id: string) {
    this.modal.create<EditEventComponent>({
      nzTitle: 'Edit Event',
      nzContent: EditEventComponent,
      nzData: { eventId: id }, // pass data to modal component
      nzFooter: null,
      nzWidth: 600,
    });
  }
}

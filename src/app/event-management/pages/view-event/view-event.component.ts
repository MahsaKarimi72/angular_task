import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  standalone: false,
})
export class ViewEventComponent {
  vm$;

  constructor(private route: ActivatedRoute, private svc: EventService) {
    this.vm$ = this.route.paramMap.pipe(
      switchMap((params) => this.svc.byId$(params.get('id')!))
    );
  }
}

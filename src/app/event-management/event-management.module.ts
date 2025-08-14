import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { EventManagementRoutingModule } from './event-management-routing.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EventListComponent,
    EventFormComponent,
    EventDetailsComponent,
    MyEventsComponent,
    CreateEventComponent,
    EditEventComponent,
    ViewEventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EventManagementRoutingModule,
    RouterModule,
    // NG-ZORRO
    NzTableModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzSelectModule,
    NzUploadModule,
    NzImageModule,
    NzIconModule,
    NzTagModule,
    NzEmptyModule,
    NzTypographyModule,
    NzMessageModule,
    NzModalModule,
    NzToolTipModule,
    NzSpinModule,
  ],
})
export class EventManagementModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';

const routes: Routes = [
  { path: '', component: MyEventsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'edit/:id', component: EditEventComponent },
  { path: 'view/:id', component: ViewEventComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class EventManagementRoutingModule {}

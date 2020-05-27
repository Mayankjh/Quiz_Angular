import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

//imported modules
import { HostRoutingModule } from './host-routing.module'
import { SharedModule } from '../shared/shared.module';

// Import components
import { DetailsComponent } from './details/details.component';
import { SummaryComponent } from './summary/summary.component';
import {HostComponent} from './host.component'


@NgModule({
  declarations: [
    HostComponent,
    DetailsComponent,
    SummaryComponent
  ],
  imports: [
    HostRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class HostModule { }

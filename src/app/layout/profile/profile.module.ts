/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from "./profile.component";
import {CalendarModule} from 'primeng/calendar';
import { ProfileViewComponent } from './component/info/profileview.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        CalendarModule,
        PaginatorModule,
        PageHeaderModule,
        FileUploadModule,
        ProfileRoutingModule,
    ],
    declarations: [ProfileComponent,ProfileViewComponent],
})
export class ProfileModule {}

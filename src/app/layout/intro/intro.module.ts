import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {PageHeaderModule} from "../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {CalendarModule} from 'primeng/calendar';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { IntroRoutingModule } from './intro-routing.module';
import {IntroListComponent} from "./component/introlist.component";
import {IntroViewComponent} from "./component/introview.component";
import {IntroEditComponent} from "./component/introedit.component";
import {IntroComponent} from "./intro.component";
import {DialogModule} from "primeng/dialog";
import {TabViewModule} from 'primeng/tabview';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        NgbModalModule,
        PaginatorModule,
        PageHeaderModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FileUploadModule,
        CKEditorModule,
        IntroRoutingModule,
    ],
    declarations: [IntroComponent,IntroEditComponent,IntroListComponent,IntroViewComponent]
})
export class IntroModule {}

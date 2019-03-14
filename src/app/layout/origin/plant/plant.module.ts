/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { PlantRoutingModule } from './plant-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {PlantComponent} from "./plant.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {TabViewModule} from 'primeng/tabview';
import {PlantListComponent} from "./component/plantlist.component";
import {PlantEditComponent} from "./component/plantedit.component";
import {PlantViewComponent} from "./component/plantview.component";
import {DialogModule} from "primeng/dialog";
import {ContentItemEditModule} from "./component/contentitemedit.module";
import {MediaItemEditModule} from "./component/mediaitemedit.module";
import {ContentItemEditComponent} from "./component/contentitemedit.component";
import {MediaItemEditComponent} from "./component/mediaitemedit.component";
import {PlantSelectModule} from "./component/plantselect.module";
import {PlantSelectComponent} from "./component/plantselect.component";
import {ManagePlantComponent} from "./component/manageplant.component";


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
        FileUploadModule,
        CKEditorModule,
        DialogModule,
        PlantRoutingModule,
        ContentItemEditModule,
        MediaItemEditModule,
        PlantSelectModule,
    ],
    declarations: [PlantComponent,PlantListComponent,PlantEditComponent,PlantViewComponent,ManagePlantComponent],
    entryComponents:[ContentItemEditComponent,MediaItemEditComponent,PlantSelectComponent],
})
export class PlantModule {}

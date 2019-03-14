/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { BatchRoutingModule } from './batch-routing.module';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {BatchComponent} from "./batch.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {TabViewModule} from 'primeng/tabview';
import {BatchListComponent} from "./batchcode/batchlist.component";
import {BatchEditComponent} from "./batchcode/batchedit.component";
import {BatchViewComponent} from "./batchcode/batchview.component";
import {DialogModule} from "primeng/dialog";

import {ContentItemEditComponent} from "../plant/component/contentitemedit.component";
import {MediaItemEditComponent} from "../plant/component/mediaitemedit.component";
import {ContentItemEditModule} from "../plant/component/contentitemedit.module";
import {MediaItemEditModule} from "../plant/component/mediaitemedit.module";

import {CommodityListComponent} from "./commodity/commoditylist.component";
import {CommodityEditComponent} from "./commodity/commodityedit.component";
import {CommodityViewComponent} from "./commodity/commodityview.component";
import {OriginCodeListComponent} from "./origincode/origincodelist.component";
import {TransItemEditModule} from "./origincode/transitemedit.module";
import {TransItemEditComponent} from "./origincode/transitemedit.component";
import {PlantSelectModule} from "../plant/component/plantselect.module";
import {CommoditySelectModule} from "./commodity/commodityselect.module";
import {PlantSelectComponent} from "../plant/component/plantselect.component";
import {CommoditySelectComponent} from "./commodity/commodityselect.component";
import {OriginCodeViewComponent} from "./origincode/origincodeview.component";
import {OriginCodeGenComponent} from "./origincode/origincodegen.component";

import { QRCodeModule } from 'angularx-qrcode';
import {CalendarModule} from 'primeng/calendar';
import {CheckItemEditModule} from "./batchcode/checkitemedit.module";
import {CheckItemEditComponent} from "./batchcode/checkitemedit.component";
import {MaterielTempListComponent} from "./materiel/materiellist.component";
import {MaterielTempEditComponent} from "./materiel/materieltempedit.component";
import {BatchMaterielEditModule} from "./materiel/batchmaterieledit.module";
import {BatchMaterielEditComponent} from "./materiel/batchmaterieledit.component";
import {ManageCommodityComponent} from "./commodity/managecommodity.component";


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
        CalendarModule,
        DialogModule,
        BatchRoutingModule,
        ContentItemEditModule,
        MediaItemEditModule,
        TransItemEditModule,
        PlantSelectModule,
        CommoditySelectModule,
        QRCodeModule,
        CheckItemEditModule,
        BatchMaterielEditModule
    ],
    declarations: [BatchComponent,BatchListComponent,BatchEditComponent,BatchViewComponent,CommodityListComponent,CommodityEditComponent,CommodityViewComponent,OriginCodeListComponent,
        OriginCodeViewComponent,OriginCodeGenComponent,MaterielTempListComponent,MaterielTempEditComponent,ManageCommodityComponent],
    entryComponents:[ContentItemEditComponent,MediaItemEditComponent,TransItemEditComponent,PlantSelectComponent,CommoditySelectComponent,CheckItemEditComponent,BatchMaterielEditComponent],
})
export class BatchModule {}

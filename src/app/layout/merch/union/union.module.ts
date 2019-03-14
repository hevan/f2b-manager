/**
 * Created by hevan on 2018/6/4.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {PageHeaderModule} from "../../../shared/modules/page-header/page-header.module";
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator'
import { FileUploadModule } from 'primeng/fileupload'
import {PickListModule} from 'primeng/picklist';
import {UnionComponent} from './union.component'
import {DialogModule} from 'primeng/dialog';
import {UnionRoutingModule} from "./union-routing.module";

import {GroupUnionListComponent} from "./component/groupunionlist.component";
import {GroupUnionEditComponent} from "./component/groupunionedit.component";
import {GroupUnionViewComponent} from "./component/groupunionview.component";
import {CorpSelectComponent} from "../corp/component/corpselect.component";
import {CorpSelectModule} from "../corp/component/corpselect.module";
import {JoinUnionListComponent} from "./component/joinunionlist.component";
import {JoinUnionViewComponent} from "./component/joinunionview.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        PickListModule,
        DialogModule,
        FileUploadModule,
        PaginatorModule,
        PageHeaderModule,
        UnionRoutingModule,
        CorpSelectModule,
    ],
    declarations: [UnionComponent,GroupUnionListComponent,GroupUnionEditComponent,GroupUnionViewComponent,JoinUnionListComponent,JoinUnionViewComponent],
    entryComponents:[CorpSelectComponent]
})
export class UnionModule {}

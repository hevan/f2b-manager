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
import {ManageComponent} from './manage.component'
import {CorpManagerListComponent} from "./component/corpmanager.component";
import {CorpDepartComponent} from "./component/depart.component";
import {CorpRoleComponent} from "./component/role.component";
import {CorpRoleMenuComponent} from "./component/rolemenu.component";
import {DialogModule} from 'primeng/dialog';
import {ManageRoutingModule} from "./manage-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        PickListModule,
        DialogModule,
        PaginatorModule,
        PageHeaderModule,
        ManageRoutingModule,
    ],
    declarations: [ManageComponent, CorpManagerListComponent,CorpDepartComponent,CorpRoleComponent,CorpRoleMenuComponent],
})
export class ManageModule {}

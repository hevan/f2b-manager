import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import {WarehouseListComponent} from "./component/warehouselist.component";
import {WarehouseEditComponent} from "./component/warehouseedit.component";
import {WarehouseViewComponent} from "./component/warehouseview.component";

const routes: Routes = [
    {
        path: '',
        component: WarehouseComponent,
        children: [
            { path: '', redirectTo: 'warehouselist' },
            { path: 'warehouselist', component: WarehouseListComponent },
            { path: 'warehouseedit', component: WarehouseEditComponent },
            { path: 'warehouseview', component: WarehouseViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseRoutingModule {}

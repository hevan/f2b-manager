import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmsComponent } from './wms.component';

const routes: Routes = [
    {
        path: '',
        component: WmsComponent,
        children: [
            { path: '', redirectTo: 'warehouse' },
            { path: 'warehouse', loadChildren: './warehouse/warehouse.module#WarehouseModule' },
            { path: 'stock', loadChildren: './stock/stock.module#StockModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WmsRoutingModule {}

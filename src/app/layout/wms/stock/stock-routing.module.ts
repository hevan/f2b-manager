import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';

import {EnterStockListComponent} from "./enter/enterstocklist.component";
import {EnterStockEditComponent} from "./enter/enterstockedit.component";
import {EnterStockViewComponent} from "./enter/enterstockview.component";
import {OutStockListComponent} from "./out/outstocklist.component";
import {OutStockEditComponent} from "./out/outstockedit.component";
import {OutStockViewComponent} from "./out/outstockview.component";
import {ProductStockComponent} from "./product/productstock.component";


const routes: Routes = [
    {
        path: '',
        component: StockComponent,
        children: [
            { path: '', redirectTo: 'enterstocklist' },
            { path: 'enterstocklist', component: EnterStockListComponent },
            { path: 'enterstockedit', component: EnterStockEditComponent },
            { path: 'enterstockview', component: EnterStockViewComponent },
            { path: 'outstocklist', component: OutStockListComponent },
            { path: 'outstockedit', component: OutStockEditComponent },
            { path: 'outstockview', component: OutStockViewComponent },
            { path: 'productstock', component: ProductStockComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule {}

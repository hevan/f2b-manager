import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleComponent } from './sale.component';

const routes: Routes = [
    {
        path: '',
        component: SaleComponent,
        children: [
            { path: '', redirectTo: 'salepurchase' },
            { path: 'salepurchase', loadChildren: './purchase/salepurchase.module#SalePurchaseModule' },
            { path: 'salefarm', loadChildren: './farm/salefarm.module#SaleFarmPurchaseModule' },
            { path: 'transit', loadChildren: './transit/transit.module#TransitBillModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaleRoutingModule {}

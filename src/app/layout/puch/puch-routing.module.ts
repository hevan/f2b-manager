import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuchComponent } from './puch.component';

const routes: Routes = [
    {
        path: '',
        component: PuchComponent,
        children: [
            { path: '', redirectTo: 'purchase' },
            { path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
            { path: 'farm', loadChildren: './farm/farm.module#FarmPurchaseModule' },
            { path: 'recvtransit', loadChildren: './recvtransit/recvtransit.module#RecvTransitBillModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuchRoutingModule {}

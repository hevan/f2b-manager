import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './component/order/orderlist.component';
import { OrderViewComponent } from './component/order/orderview.component';

const routes: Routes = [
    {
        path: '',
        component: OrderComponent,
        children: [
            { path: '', redirectTo: 'orderlist' },
            { path: 'orderview', component: OrderViewComponent },
            { path: 'orderlist', component: OrderListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {}

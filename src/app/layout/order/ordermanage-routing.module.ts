import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderManageComponent} from "./ordermanage.component";

const routes: Routes = [
    {
        path: '',
        component: OrderManageComponent,
        children: [
            { path: '', redirectTo: 'buy' },
            { path: 'buy', loadChildren: './sale/order.module#OrderModule' },
            { path: 'after', loadChildren: './after/after.module#AfterModule' },
            { path: 'trans', loadChildren: './trans/transorder.module#TransOrderModule' },
            { path: 'tuan', loadChildren: './tuan/tuan.module#TuanModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderManageRoutingModule {}

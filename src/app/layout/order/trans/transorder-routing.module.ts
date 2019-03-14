import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransOrderComponent } from './transorder.component';
import { TransOrderListComponent } from './component/transorderlist.component';
import { TransOrderViewComponent } from './component/transorderview.component';

const routes: Routes = [
    {
        path: '',
        component: TransOrderComponent,
        children: [
            { path: '', redirectTo: 'translist' },
            { path: 'transview', component: TransOrderViewComponent },
            { path: 'translist', component: TransOrderListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransOrderRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleFarmPurchaseComponent } from './salefarm.component';
import {SaleFarmPurchaseListComponent} from "./component/salefarmlist.component";
import {SaleFarmPurchaseEditComponent} from "./component/salefarmedit.component";
import {SaleFarmPurchaseViewComponent} from "./component/salefarmview.component";

const routes: Routes = [
    {
        path: '',
        component: SaleFarmPurchaseComponent,
        children: [
            { path: '', redirectTo: 'salefarmlist' },
            { path: 'salefarmlist', component: SaleFarmPurchaseListComponent },
            { path: 'salefarmedit', component: SaleFarmPurchaseEditComponent },
            { path: 'salefarmview', component: SaleFarmPurchaseViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaleFarmPurchaseRoutingModule {}

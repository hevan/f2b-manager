import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import {PurchaseListComponent} from "./component/purchaselist.component";
import {PurchaseEditComponent} from "./component/purchaseedit.component";
import {PurchaseViewComponent} from "./component/purchaseview.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
        children: [
            { path: '', redirectTo: 'purchaselist' },
            { path: 'purchaselist', component: PurchaseListComponent },
            { path: 'purchaseedit', component: PurchaseEditComponent },
            { path: 'purchaseview', component: PurchaseViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule {}

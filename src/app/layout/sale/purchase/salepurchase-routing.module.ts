import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalePurchaseComponent } from './salepurchase.component';
import {SalePurchaseListComponent} from "./component/salepurchaselist.component";
import {SalePurchaseEditComponent} from "./component/salepurchaseedit.component";
import {SalePurchaseViewComponent} from "./component/salepurchaseview.component";

const routes: Routes = [
    {
        path: '',
        component: SalePurchaseComponent,
        children: [
            { path: '', redirectTo: 'salepurchaselist' },
            { path: 'salepurchaselist', component: SalePurchaseListComponent },
            { path: 'salepurchaseedit', component: SalePurchaseEditComponent },
            { path: 'salepurchaseview', component: SalePurchaseViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalePurchaseRoutingModule {}

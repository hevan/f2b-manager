import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmPurchaseComponent } from './farm.component';
import {FarmPurchaseListComponent} from "./component/farmlist.component";
import {FarmPurchaseEditComponent} from "./component/farmedit.component";
import {FarmPurchaseViewComponent} from "./component/farmview.component";

const routes: Routes = [
    {
        path: '',
        component: FarmPurchaseComponent,
        children: [
            { path: '', redirectTo: 'farmlist' },
            { path: 'farmlist', component: FarmPurchaseListComponent },
            { path: 'farmedit', component: FarmPurchaseEditComponent },
            { path: 'farmview', component: FarmPurchaseViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FarmPurchaseRoutingModule {}

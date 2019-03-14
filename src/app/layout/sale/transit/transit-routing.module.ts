import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransitBillComponent } from './transit.component';
import {TransitBillListComponent} from "./component/transitlist.component";
import {TransitBillEditComponent} from "./component/transitedit.component";
import {TransitBillViewComponent} from "./component/transitview.component";

const routes: Routes = [
    {
        path: '',
        component: TransitBillComponent,
        children: [
            { path: '', redirectTo: 'transitlist' },
            { path: 'transitlist', component: TransitBillListComponent },
            { path: 'transitedit', component: TransitBillEditComponent },
            { path: 'transitview', component: TransitBillViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransitBillRoutingModule {}

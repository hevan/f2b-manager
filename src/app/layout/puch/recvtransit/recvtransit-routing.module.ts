import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecvTransitBillComponent } from './recvtransit.component';
import {RecvTransitBillListComponent} from "./component/recvtransitlist.component";
import {RecvTransitBillEditComponent} from "./component/recvtransitedit.component";
import {RecvTransitBillViewComponent} from "./component/recvtransitview.component";

const routes: Routes = [
    {
        path: '',
        component: RecvTransitBillComponent,
        children: [
            { path: '', redirectTo: 'transitlist' },
            { path: 'transitlist', component: RecvTransitBillListComponent },
            { path: 'transitedit', component: RecvTransitBillEditComponent },
            { path: 'transitview', component: RecvTransitBillViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecvTransitBillRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositComponent } from './deposit.component';
import {DepositListComponent} from "./component/depositlist.component";
import {DepositEditComponent} from "./component/depositedit.component";
import {DepositViewComponent} from "./component/depositview.component";

const routes: Routes = [
    {
        path: '',
        component: DepositComponent,
        children: [
            { path: '', redirectTo: 'depositlist' },
            { path: 'depositlist', component: DepositListComponent },
            { path: 'depositedit', component: DepositEditComponent },
            { path: 'depositview', component: DepositViewComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepositRoutingModule {}

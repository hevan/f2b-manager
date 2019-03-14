import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from './finance.component';

const routes: Routes = [
    {
        path: '',
        component: FinanceComponent,
        children: [
            { path: '', redirectTo: 'deposit' },
            { path: 'deposit', loadChildren: './deposit/deposit.module#DepositModule' },
            { path: 'apply', loadChildren: './apply/apply.module#SpecialApplyModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinanceRoutingModule {}

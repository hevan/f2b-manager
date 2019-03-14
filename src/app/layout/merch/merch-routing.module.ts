import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchComponent } from './merch.component';

const routes: Routes = [
    {
        path: '',
        component: MerchComponent,
        children: [
            { path: '', redirectTo: 'corp' },
            { path: 'corp', loadChildren: './corp/corp.module#CorpModule' },
            { path: 'manage', loadChildren: './manager/manage.module#ManageModule' },
            { path: 'union', loadChildren: './union/union.module#UnionModule' },
            { path: 'group', loadChildren: './group/group.module#GroupModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MerchRoutingModule {}

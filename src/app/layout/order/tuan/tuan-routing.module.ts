import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuanComponent } from './tuan.component';
import { TuanDistributListComponent } from './component/distributlist.component';
import { TuanDistributViewComponent } from './component/distributview.component';

const routes: Routes = [
    {
        path: '',
        component: TuanComponent,
        children: [
            { path: '', redirectTo: 'distributlist' },
            { path: 'distributview', component: TuanDistributViewComponent },
            { path: 'distributlist', component: TuanDistributListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TuanRoutingModule {}

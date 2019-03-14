import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterComponent } from './after.component';
import { AfterListComponent } from './component/afterlist.component';
import { AfterViewComponent } from './component/afterview.component';

const routes: Routes = [
    {
        path: '',
        component: AfterComponent,
        children: [
            { path: '', redirectTo: 'afterlist' },
            { path: 'afterview', component: AfterViewComponent },
            { path: 'afterlist', component: AfterListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AfterRoutingModule {}

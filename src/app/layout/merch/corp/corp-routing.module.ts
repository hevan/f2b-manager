import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpComponent } from './corp.component';
import {CorpViewComponent} from "./component/corpview.component";

const routes: Routes = [
    {
        path: '',
        component: CorpComponent,
        children: [
            { path: '', redirectTo: 'corpview' },
            { path: 'corpview', component: CorpViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CorpRoutingModule {}

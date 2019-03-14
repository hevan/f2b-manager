import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialApplyComponent } from './apply.component';
import {SpecialApplyListComponent} from "./component/applylist.component";
import {SpecialApplyEditComponent} from "./component/applyedit.component";
import {SpecialApplyViewComponent} from "./component/applyview.component";

const routes: Routes = [
    {
        path: '',
        component: SpecialApplyComponent,
        children: [
            { path: '', redirectTo: 'applylist' },
            { path: 'applylist', component: SpecialApplyListComponent },
            { path: 'applyedit', component: SpecialApplyEditComponent },
            { path: 'applyview', component: SpecialApplyViewComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialApplyRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnionComponent } from './union.component';
import {GroupUnionListComponent} from "./component/groupunionlist.component";
import {GroupUnionEditComponent} from "./component/groupunionedit.component";
import {GroupUnionViewComponent} from "./component/groupunionview.component";
import {JoinUnionListComponent} from "./component/joinunionlist.component";
import {JoinUnionViewComponent} from "./component/joinunionview.component";


const routes: Routes = [
    {
        path: '',
        component: UnionComponent,
        children: [
            { path: '', redirectTo: 'groupunionlist' },
            { path: 'groupunionlist', component: GroupUnionListComponent },
            { path: 'groupunionedit', component: GroupUnionEditComponent },
            { path: 'groupunionview', component: GroupUnionViewComponent },
            { path: 'joinunionlist', component: JoinUnionListComponent },
            { path: 'joinunionview', component: JoinUnionViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnionRoutingModule {}

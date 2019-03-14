import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import {GroupCorpListComponent} from "./component/groupcorplist.component";


const routes: Routes = [
    {
        path: '',
        component: GroupComponent,
        children: [
            { path: '', redirectTo: 'groupcorplist' },
            { path: 'groupcorplist', component: GroupCorpListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule {}

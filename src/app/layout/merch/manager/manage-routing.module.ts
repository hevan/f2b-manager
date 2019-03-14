import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import {CorpDepartComponent} from "./component/depart.component";
import {CorpRoleComponent} from "./component/role.component";
import {CorpManagerListComponent} from "./component/corpmanager.component";
import {CorpRoleMenuComponent} from "./component/rolemenu.component";

const routes: Routes = [
    {
        path: '',
        component: ManageComponent,
        children: [
            { path: '', redirectTo: 'depart' },
            { path: 'depart', component: CorpDepartComponent },
            { path: 'role', component: CorpRoleComponent },
            { path: 'user', component: CorpManagerListComponent },
            { path: 'rolemenu', component: CorpRoleMenuComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageRoutingModule {}

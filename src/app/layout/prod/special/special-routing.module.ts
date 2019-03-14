import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialProductComponent } from './special.component';
import {SpecialProductListComponent} from "./component/speciallist.component";
import {SpecialProductEditComponent} from "./component/specialedit.component";
import {SpecialProductViewComponent} from "./component/specialview.component";

const routes: Routes = [
    {
        path: '',
        component: SpecialProductComponent,
        children: [
            { path: '', redirectTo: 'speciallist' },
            { path: 'speciallist', component: SpecialProductListComponent },
            { path: 'specialedit', component: SpecialProductEditComponent },
            { path: 'specialview', component: SpecialProductViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialProductRoutingModule {}

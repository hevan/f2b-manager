import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';
import {BrandListComponent} from "./component/brandlist.component";

const routes: Routes = [
    {
        path: '',
        component: BrandComponent,
        children: [
            { path: '', redirectTo: 'brandlist' },
            { path: 'brandlist', component: BrandListComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import {ProductListComponent} from "./component/productlist.component";
import {ProductEditComponent} from "./component/productedit.component";
import {ProductViewComponent} from "./component/productview.component";

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            { path: '', redirectTo: 'productlist' },
            { path: 'productlist', component: ProductListComponent },
            { path: 'productedit', component: ProductEditComponent },
            { path: 'productview', component: ProductViewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}

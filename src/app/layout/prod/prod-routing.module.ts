import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdComponent } from './prod.component';

const routes: Routes = [
    {
        path: '',
        component: ProdComponent,
        children: [
            { path: '', redirectTo: 'product' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },
            { path: 'brand', loadChildren: './brand/brand.module#BrandModule' },
            { path: 'special', loadChildren: './special/special.module#SpecialProductModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleDetailListComponent} from "./detail/saledetaillist.component";
import {AnalysisComponent} from "./analysis.component";



const routes: Routes = [
    {
        path: '',
        component: AnalysisComponent,
        children:[
            {path: '', redirectTo: 'saledetail' },
            {path: 'saledetail', component: SaleDetailListComponent},

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalysisRoutingModule {}

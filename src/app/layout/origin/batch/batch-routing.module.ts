import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch.component';
import {BatchListComponent} from "./batchcode/batchlist.component";
import {BatchEditComponent} from "./batchcode/batchedit.component";
import {BatchViewComponent} from "./batchcode/batchview.component";
import {CommodityListComponent} from "./commodity/commoditylist.component";
import {CommodityEditComponent} from "./commodity/commodityedit.component";
import {CommodityViewComponent} from "./commodity/commodityview.component";
import {OriginCodeListComponent} from "./origincode/origincodelist.component";
import {OriginCodeViewComponent} from "./origincode/origincodeview.component";
import {OriginCodeGenComponent} from "./origincode/origincodegen.component";
import {MaterielTempListComponent} from "./materiel/materiellist.component";
import {ManageCommodityComponent} from "./commodity/managecommodity.component";


const routes: Routes = [
    {
        path: '',
        component: BatchComponent,
        children: [
            { path: '', redirectTo: 'batchlist' },
            { path: 'batchlist', component: BatchListComponent },
            { path: 'batchedit', component: BatchEditComponent },
            { path: 'batchview', component: BatchViewComponent },
            { path: 'commoditylist', component: CommodityListComponent },
            { path: 'commodityedit', component: CommodityEditComponent },
            { path: 'commodityview', component: CommodityViewComponent },
            { path: 'managecommodity', component: ManageCommodityComponent },
            { path: 'origincodelist', component: OriginCodeListComponent },
            { path: 'origincodeview', component: OriginCodeViewComponent },
            { path: 'origincodegen', component: OriginCodeGenComponent },
            { path: 'tempmateriel', component: MaterielTempListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BatchRoutingModule {}

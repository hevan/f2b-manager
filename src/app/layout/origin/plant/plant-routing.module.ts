import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantComponent } from './plant.component';
import {PlantListComponent} from "./component/plantlist.component";
import {PlantEditComponent} from "./component/plantedit.component";
import {PlantViewComponent} from "./component/plantview.component";
import {ManagePlantComponent} from "./component/manageplant.component";

const routes: Routes = [
    {
        path: '',
        component: PlantComponent,
        children: [
            { path: '', redirectTo: 'plantlist' },
            { path: 'plantlist', component: PlantListComponent },
            { path: 'plantedit', component: PlantEditComponent },
            { path: 'plantview', component: PlantViewComponent },
            { path: 'manageplant', component: ManagePlantComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlantRoutingModule {}

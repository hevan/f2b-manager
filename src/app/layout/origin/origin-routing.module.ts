import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OriginComponent } from './origin.component';

const routes: Routes = [
    {
        path: '',
        component: OriginComponent,
        children: [
            { path: '', redirectTo: 'plant' },
            { path: 'plant', loadChildren: './plant/plant.module#PlantModule' },
            { path: 'batch', loadChildren: './batch/batch.module#BatchModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OriginRoutingModule {}

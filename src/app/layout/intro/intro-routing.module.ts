import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IntroListComponent} from "./component/introlist.component";
import {IntroEditComponent} from "./component/introedit.component";
import {IntroViewComponent} from "./component/introview.component";
import {IntroComponent} from "./intro.component";


const routes: Routes = [
    {
        path: '',
        component: IntroComponent,
        children:[
            {path: '', redirectTo: 'introlist' },
            {path: 'introlist', component: IntroListComponent},
            {path: 'introedit', component: IntroEditComponent},
            {path: 'introview', component: IntroViewComponent},
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IntroRoutingModule {}

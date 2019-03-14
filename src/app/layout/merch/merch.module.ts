import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchRoutingModule } from './merch-routing.module';
import { MerchComponent } from './merch.component';

@NgModule({
    imports: [
        CommonModule,
        MerchRoutingModule
    ],
    declarations: [MerchComponent]
})
export class MerchModule {}

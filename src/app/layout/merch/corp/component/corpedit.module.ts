import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CorpEditComponent} from './corpedit.component';
import { FileUploadModule } from 'primeng/fileupload'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule,FileUploadModule, RouterModule],
    declarations: [CorpEditComponent],
    exports: [CorpEditComponent]
})
export class CorpEditModule {}

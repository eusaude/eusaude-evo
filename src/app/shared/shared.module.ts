import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo-component/logo.component';
import { ProcessingComponent } from './processing/processing.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LogoComponent
    ],
    declarations:[
        LogoComponent,
        ProcessingComponent
    ]
})
export class SharedModule
{
}

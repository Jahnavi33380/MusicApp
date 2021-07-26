import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '../view/view.component';

@NgModule({
  declarations: [ViewComponent],
  exports:[CommonModule,NgxPaginationModule,FormsModule],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }

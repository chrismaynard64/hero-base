import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryDataService } from './in-memory-data.service';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [
     NotFoundComponent
  ]
})
export class CoreModule { }

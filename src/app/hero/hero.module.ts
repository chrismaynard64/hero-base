import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeroComponent],
  providers: [ HeroService ],
  imports: [
    CommonModule
  ],
  exports: [HeroComponent]
})
export class HeroModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero/hero.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
    { path: 'hero',      component: HeroComponent, pathMatch: 'full' },
  { path: '',      component: HeroComponent, pathMatch: 'full' },
 { path: '**',    component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

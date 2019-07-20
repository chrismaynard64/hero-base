import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

 heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
      this.heroes$ = this.heroService.get();
  }

}

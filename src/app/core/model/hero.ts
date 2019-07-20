import { HeroType } from '../globals';

export class Hero {
    id: number;
    name: string = '';
    portrait: string = '';
    type: HeroType;


    constructor() {
        if (!this.id)  
            this.id = 20 + Math.floor((Math.random() * 10000));
    }
}
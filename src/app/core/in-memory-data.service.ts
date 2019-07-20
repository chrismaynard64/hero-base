/**
 * Hero-oriented InMemoryDbService with method overrides.
 */
import { Injectable } from '@angular/core';

import {
  RequestInfo,
  RequestInfoUtilities,
  ParsedRequestUrl
} from 'angular-in-memory-web-api';

import { Hero, Villain } from './model';
import { HeroType } from './globals';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService {
  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  /** In-memory database data */
  db: Db = {};

  /** Create the in-memory database on start or by command */
  createDb(reqInfo?: RequestInfo) {
    this.db = getDbData();

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        // tslint:disable-next-line:forin
        for (const coll in this.db) {
          this.db[coll].length = 0;
        }
      }

      this.active = !!body.active;
    }
    return this.db;
  }

  /**
   * Simulate generating new Id on the server
   * All collections in this db have numeric ids.
   * Seed grows by highest id seen in any of the collections.
   */
  genId(collection: { id: number }[], collectionName: string) {
    this.maxId =
      1 +
      collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
    return this.maxId;
  }

  /**
   * Override `parseRequestUrl`
   * Manipulates the request URL or the parsed result.
   * If in-mem is inactive, clear collectionName so that service passes request thru.
   * If in-mem is active, after parsing with the default parser,
   * @param url from request URL
   * @param utils for manipulating parsed URL
   */
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const parsed = utils.parseRequestUrl(url);
    const isDefaultRoot = parsed.apiBase === 'api/';
    parsed.collectionName =
      this.active && isDefaultRoot
        ? mapCollectionName(parsed.collectionName)
        : undefined;
    return parsed;
  }
}

/**
 * Remap a known singular collection name ("hero")
 * to the plural collection name ("heroes"); else return the name
 * @param name - collection name from the parsed URL
 */
function mapCollectionName(name: string): string {
  return (
    ({
      hero: 'heroes',
      villain: 'villains'
    } as any)[name] || name
  );
}

/**
 * Development data
 */
function getDbData() {
  const heroes: Hero[] = [
    { id: 11, "name": "Mr. Nice", portrait: "01", type: HeroType.HERO_TYPE_HERO },
    { id: 12, "name": "Narco", portrait: "02", type: HeroType.HERO_TYPE_HERO },
    { id: 13, "name": "Bombasto", portrait: "03", type: HeroType.HERO_TYPE_HERO },
    { id: 14, "name": "Celeritas", portrait: "04", type: HeroType.HERO_TYPE_HERO },
    { id: 15, "name": "Magneta", portrait: "05", type: HeroType.HERO_TYPE_HERO },
    { id: 16, "name": "RubberMan", portrait: "06", type: HeroType.HERO_TYPE_HERO },
    { id: 17, "name": "Dynama", portrait: "07", type: HeroType.HERO_TYPE_HERO },
    { id: 18, "name": "Dr IQ", portrait: "08", type: HeroType.HERO_TYPE_HERO },
    { id: 19, "name": "Magma", portrait: "09", type: HeroType.HERO_TYPE_HERO },
    { id: 20, "name": "Tornado", portrait: "10", type: HeroType.HERO_TYPE_HERO },

    { id: 21, "name": "Bil",     portrait: "11", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 22, "name": "Mike",    portrait: "12", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 23, "name": "Ted", portrait: "13", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 24, "name": "Jim", portrait: "14", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 25, "name": "Paul", portrait: "15", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 26, "name": "David", portrait: "16", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 27, "name": "Scott", portrait: "17", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 28, "name": "Mike", portrait: "18", type: HeroType.HERO_TYPE_VILLAIN},
    { id: 29, "name": "Simon", portrait: "19", type: HeroType.HERO_TYPE_VILLAIN}
  ];

  const villains: Villain[] = [
    { "id": 11, "name": "Mr. Nice", portrait: "01" },
    { "id": 12, "name": "Narco", portrait: "02" },
    { "id": 13, "name": "Bombasto", portrait: "03" },
    { "id": 14, "name": "Celeritas", portrait: "04" },
    { "id": 15, "name": "Magneta", portrait: "05" },
    { "id": 16, "name": "RubberMan", portrait: "06" },
    { "id": 17, "name": "Dynama", portrait: "07" },
    { "id": 18, "name": "Dr IQ", portrait: "08" },
    { "id": 19, "name": "Magma", portrait: "09" },
    { "id": 20, "name": "Tornado", portrait: "11" }
  ];

  return { heroes, villains } as Db;
}

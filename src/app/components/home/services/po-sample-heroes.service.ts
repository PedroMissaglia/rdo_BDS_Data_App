import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PoMultiselectFilter, PoMultiselectOption } from '@po-ui/ng-components';
import { PoSampleHeroesService } from './po-multiselect-response.service';

interface HeroesResponse {
  items: PoMultiselectOption[];
}

@Injectable()
export class SamplePoMultiselectHeroesService implements PoMultiselectFilter {
  constructor(private http: HttpClient, private poSampleHeroesService: PoSampleHeroesService) {}

  // getFilteredData method should return an observable with type 'PoMultiselectOption[]'
  getFilteredData(value: any): Observable<Array<PoMultiselectOption>> {
    const params = { filter: value }; // Assuming you might use 'params' here if needed

    // Explicitly tell TypeScript that the response has an 'items' property
    return this.poSampleHeroesService.getHeroes().pipe(
      map((response: HeroesResponse) => response.items) // Now we expect 'response' to be of type HeroesResponse
    );
  }

  // Same here for the getObjectsByValues method
  getObjectsByValues(value: Array<string | number>): Observable<Array<PoMultiselectOption>> {
    return this.http
      .get<{ items: PoMultiselectOption[] }>(`https://po-sample-api.onrender.com/v1/heroes/?value=${value.toString()}`)
      .pipe(map(response => response.items)); // Extract 'items' from the response
  }
}

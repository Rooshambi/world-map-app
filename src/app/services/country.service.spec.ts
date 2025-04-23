import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { map }                from 'rxjs/operators';

export interface CountryInfo {
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  population: number;
  area: number;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private base = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  /** 
   * Fetches detailed data for `code` (2-letter ISO code) 
   */
  getCountryInfo(code: string): Observable<CountryInfo> {
    // Request JSON with full details (&format=json)
    return this.http
      .get<any[]>(`${this.base}/${code}?format=json&per_page=1`)
      .pipe(
        map(response => {
          const raw = response[1][0];
          return {
            name:        raw.name,
            capitalCity: raw.capitalCity,
            region:      raw.region.value,
            incomeLevel: raw.incomeLevel.value,
            population:  +raw.population,
            area:        +raw.area
          };
        })
      );
  }
}
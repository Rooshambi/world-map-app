import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

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
  // Requirement F: Base URL for World Bank API calls
  private baseUrl = 'https://api.worldbank.org/v2';

  // Requirement F: Inject Angular's HttpClient for making HTTP calls
  constructor(private http: HttpClient) {}

  /**
   * Requirement F:
   * Fetches all needed pieces of country data (info, population, area)
   * and composes them into a single CountryInfo object.
   */
  getCountryInfo(code: string): Observable<CountryInfo> {
     // 1) Raw country metadata
    const info$ = this.http.get<any>(`${this.baseUrl}/country/${code}?format=json`);

    // 2) Population indicator for 2021
    const pop$  = this.http
      .get<any>(`${this.baseUrl}/country/${code}/indicator/SP.POP.TOTL?date=2021&format=json`);
    const area$ = this.http

    // 3) Area indicator for 2021
      .get<any>(`${this.baseUrl}/country/${code}/indicator/AG.LND.TOTL.K2?date=2021&format=json`);

    // parse out the JSON structure returned by the World Bank
    return forkJoin([info$, pop$, area$]).pipe(
      map(([infoRes, popRes, areaRes]) => {
        const meta = infoRes[1][0];
        const pop  = popRes[1][0].value;
        const area = areaRes[1][0].value;

    // Requirement F: return a consolidated CountryInfo

        return {
          name:       meta.name,
          capitalCity: meta.capitalCity,
          region:     meta.region.value,
          incomeLevel: meta.incomeLevel.value,
          population:  pop,
          area:        area
        };
      })
    );
  }
}
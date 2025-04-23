import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountryService, CountryInfo } from '../services/country.service';

// Requirement E: Wire SVG <path> tags to click handlers

@Component({
  selector: 'app-world',
  standalone: true,                  
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './world.component.html',
  styleUrls:   ['./world.component.css']
})
export class WorldComponent {
  country: CountryInfo | null = null;

  constructor(private countrySvc: CountryService) {}

  onMapClick(evt: MouseEvent) {
    const path = evt.target as SVGPathElement;
    const countryCode = path.id;     // e.g. "US", "CN", etc.

    this.countrySvc
      .getCountryInfo(countryCode)
      .subscribe(info => this.country = info);

    console.log('fetched country data:', this.country);
  }
}
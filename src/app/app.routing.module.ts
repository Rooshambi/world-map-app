import { NgModule }           from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldComponent }     from './world/world.component';

// Requirement C: “Add routing for /world”
const routes: Routes = [
  { path: '',    redirectTo: 'map',   pathMatch: 'full' },
  { path: 'map', component: WorldComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
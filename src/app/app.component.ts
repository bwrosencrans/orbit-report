import { Satellite } from "./satellite";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() satellites: Satellite[];
  title = 'orbit-report';
  displayList: Satellite[];
  sourceList: Satellite[];
  name: string='';
  
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    this.displayList = this.sourceList.slice(0);
    
    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        let fetchedSatellites = data.satellites;
        for (let i = 0; i < fetchedSatellites.length; i++) {
          let sat = new Satellite(fetchedSatellites[i].name,
            fetchedSatellites[i].type,
            fetchedSatellites[i].launchDate,
            fetchedSatellites[i].orbitType,
            fetchedSatellites[i].operational);
          this.sourceList.push(sat);
        }
          this.displayList = this.sourceList.slice(0);
        
      }.bind(this));
    }.bind(this));

  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }
}



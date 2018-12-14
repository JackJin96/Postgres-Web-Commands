import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
    setInterval(() => {
      if (this.searchString) {
        this.search();
      }
    }, 1000);
    // setInterval(() => {
    //   if (this.searchString && this.isChanged) {
    //     this.makeRequest();
    //     this.isChanged = false;
    //   }
    // }, 1000);
  }

  searchString = "";
  isChanged = false;
  searchResults = []

  searchHeaders = new HttpHeaders()
  // .set('Authorization', 'my-auth-token')
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');

  search = () => {
    const search_params = new HttpParams()
      .set('search_string', this.searchString);

    this.http.get('http://localhost:3000/api/v1/search', {headers: this.searchHeaders, params: search_params})
      .subscribe(data => {
        if (data) {
          this.searchResults = [];
          for (const key in data) {
            this.searchResults.push(data[key]);
          }
        }
        console.log(typeof(data));
        console.log(data);
      });
  }

  searchDrug = (drugId) => {
    const drug_params = new HttpParams()
      .set('drug_id', drugId);

    this.http.get('http://localhost:3000/api/v1/drug', {headers: this.searchHeaders, params: drug_params})
      .subscribe(data => console.log(data));
  }

  searchMechanism = (mechanismId) => {
    const mechanism_params = new HttpParams()
      .set('mechanism_id', mechanismId);

    this.http.get('http://localhost:3000/api/v1/mechanism', {headers: this.searchHeaders, params: mechanism_params})
    .subscribe(data => console.log(data));
  }

  onClick = (category, id) => {
    if (category === "drug") {
      this.searchDrug(id);
    } else if (category === 'mechanism') {
      this.searchMechanism(id);
    } else {
      alert('category does not exist!');
    }
  }

}

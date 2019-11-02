import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    console.log(f.value.queryString);  // { first: '', last: '' }
    this.search(f.value.queryString);
    console.log(f.valid);  // false
  }

  submitAandV(f: NgForm) {
    console.log(f);
    console.log(f.value.Attributes);
    console.log(f.value.Values);
    console.log(this.tableSelection);
    console.log(this.actionSelection);
    switch(this.actionSelection) {
      case 'Insert':
        this.insert(f.value.Attributes, f.value.Values);
        break;
      case 'Delete':
        this.delete(f.value.Attributes, f.value.Values);
        break;
      case 'Update':
        this.update(f.value.Attributes, f.value.Values);
        break;
      default:
        break;
    }
  }

  isChanged = false;
  searchResults = []
  tableSelection = "Table Selection"
  actionSelection = "Action Selection"
  updateDisabled = false;

  changeTableSelection = (s) => {
    if (s === "Checkins") {
      this.updateDisabled = true;
      this.changeActionSelection("Insert");
    } else {
      this.updateDisabled = false;
    }
    this.tableSelection = s;
  }

  changeActionSelection = (s) => {
    this.actionSelection = s;
  }

  commands = [
    "SELECT * FROM Users WHERE Users.review_count >= 1",
    "SELECT Users.name FROM Users WHERE Users.review_count <= 2",
    "SELECT * FROM Businesses WHERE Businesses.active = FALSE",
    "SELECT B.business_name FROM Businesses B WHERE B.categories = 'Pizza Restaurants' AND B.stars >= 4",
    "SELECT COUNT(Checkins.business_id) FROM Checkins WHERE Checkins.Friday >= 1",
    "SELECT R.review_text FROM Reviews R, Businesses B WHERE R.business_id = B.business_id AND B.business_name = 'Arcadia Tavern'",
    "SELECT DISTINCT B.business_name FROM Reviews R, Businesses B WHERE R.business_id = B.business_id AND B.categories LIKE '%Restaurants%' AND R.stars <= 2",
    "SELECT AVG(Businesses.stars) AS average_rating, SUM(Businesses.review_count) as total_number_of_reviews FROM Businesses WHERE Businesses.business_name = 'Kfc'",
    "SELECT Businesses.business_id FROM Businesses ORDER BY Businesses.review_count DESC LIMIT 10",
    "SELECT U.name FROM Users U ORDER BY U.review_count DESC limit 1"
  ]

  searchHeaders = new HttpHeaders()
  // .set('Authorization', 'my-auth-token')
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Headers', 'Content-Type')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');

  search = (searchString) => {
    this.searchResults = [];
    const search_params = new HttpParams()
      .set('search_string', searchString);

    this.http.get('http://localhost:3000/api/v1/search', {headers: this.searchHeaders, params: search_params})
      .subscribe(data => {
        if (data) {
          this.searchResults = [];
          for (const key in data) {
            this.searchResults.push(data[key]);
            // console.log(data[key]);
            if (this.searchResults.length > 100) {
              break;
            }
          }
          console.log(this.searchResults);
        }
        console.log(typeof(data));
        // console.log(data);
      });
  }

  insert = (insertAttributes, insertValues) => {
    this.searchResults = [];
    const insert_params = new HttpParams()
      .set('insert_attributes', insertAttributes)
      .set('insert_values', insertValues)
      .set('insert_table', this.tableSelection);

    this.http.get('http://localhost:3000/api/v1/insert', {headers: this.searchHeaders, params: insert_params})
    .subscribe(data => {
      if (data) {
        this.searchResults = [];
        for (const key in data) {
          this.searchResults.push(data[key]);
          // console.log(data[key]);
          if (this.searchResults.length > 100) {
            break;
          }
        }
        console.log(this.searchResults);
      }
      console.log(typeof(data));
      // console.log(data);
    });
  }

  delete = (deleteAttributes, deleteValues) => {
    this.searchResults = [];
    const delete_params = new HttpParams()
      .set('delete_attributes', deleteAttributes)
      .set('delete_values', deleteValues)
      .set('delete_table', this.tableSelection);

    this.http.get('http://localhost:3000/api/v1/delete', {headers: this.searchHeaders, params: delete_params})
    .subscribe(data => {
      if (data) {
        this.searchResults = [];
        for (const key in data) {
          this.searchResults.push(data[key]);
          // console.log(data[key]);
          if (this.searchResults.length > 100) {
            break;
          }
        }
        console.log(this.searchResults);
      }
      console.log(typeof(data));
      // console.log(data);
    });
  }

  update = (updateAttributes, updateValues) => {
    this.searchResults = [];
    const update_params = new HttpParams()
      .set('update_attributes', updateAttributes)
      .set('update_values', updateValues)
      .set('update_table', this.tableSelection);

    this.http.get('http://localhost:3000/api/v1/update', {headers: this.searchHeaders, params: update_params})
    .subscribe(data => {
      if (data) {
        this.searchResults = [];
        for (const key in data) {
          this.searchResults.push(data[key]);
          // console.log(data[key]);
          if (this.searchResults.length > 100) {
            break;
          }
        }
        console.log(this.searchResults);
      }
      console.log(typeof(data));
      // console.log(data);
    });
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

export interface Config {
  results: string[]
}

@Injectable({
  providedIn: 'root'
})



export class TIendasServiceService {
  
  
  basepath: string
  private products  = []; 
  
  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}

  constructor(private http : HttpClient) { 
    this.basepath  = 'http://localhost:4000/api/'
  }
  
  
  getAll(term) {
    return this.http.get(this.basepath + term)
  }
}

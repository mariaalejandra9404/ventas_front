import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectUnsubscribedError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class TIendasServiceService {
  
  
  basepath: string
   

  constructor(private http : HttpClient) { 
    this.basepath  = 'http://localhost:4000/api/'
  }
  
  
  getAll(term) {
    return this.http.get(this.basepath + term)
  }

  getById(term, id: number) {
    return this.http.get(this.basepath + term + '/' + id);
  }

  create(term, objeto) {
    return this.http.post(this.basepath + term, objeto);
  }

  update(term, objeto, id) {
    console.log("er", term, objeto,id)
    return this.http.put(this.basepath + term +'/' + id, objeto);
  }

  delete(term,id: number) {
    return this.http.delete(this.basepath + term + '/' + id);
  }
}

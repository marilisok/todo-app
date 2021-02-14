import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PORT = 3000;

@Injectable()
export class HttpService{
  constructor(private http: HttpClient){}
  getTodos(){
    return this.http.get('http://localhost:' + PORT + '/todo');
  }
  addTodo(body){
    return this.http.put('http://localhost:' + PORT + '/todo', body);
  }
  deleteTodo(id){
    return this.http.delete('http://localhost:' + PORT + '/todo/' + id);
  }
  changeTodo(id, body){
    return this.http.post('http://localhost:' + PORT + '/todo/' + id, body);
  }

}

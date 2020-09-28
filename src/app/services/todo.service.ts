import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'http://jsonplaceholder.typicode.com/todos'
  todosLimit:number = 20;

  constructor(private http:HttpClient) {  }

  getTodos():Observable<Todo[]>{
    // get request from external todos API
    return this.http.get<Todo[]>(`${this.todosUrl}?_limit=${this.todosLimit}`);
  }

  toggleTodo(todo:Todo):Observable<any>{
    const url:string = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    const url:string = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}

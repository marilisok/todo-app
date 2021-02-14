import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import {Todo} from '../../models/todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [HttpService]
})

export class TodosComponent implements OnInit {
  public title = '';
  public todos: Todo[] = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    const indexArr = new Set();
    while (indexArr.size < 10) {
      indexArr.add(Math.floor(Math.random() * 201) + 1);
    }
    this.http.getTodos().subscribe((data: any) => {
        this.todos = data.filter(item => indexArr.has(Number(item.id)));
    });
  }

  delete(id): void{
    for (const todo of this.todos){
      if (todo.id === Number(id)){
        this.todos.splice(this.todos.indexOf(todo), 1);
      }
    }
    this.http.deleteTodo(id).subscribe();
  }
  onComplete(id): void{
    let td;
    for (const todo of this.todos){
      if (todo.id === Number(id)){
        td = todo;
        const idx = this.todos.indexOf(todo);
        this.todos[idx].completed = !this.todos[idx].completed;
      }
    }
    this.http.changeTodo(id, td).subscribe();
  }
  add(): void{
    const id = Math.floor(Math.random() * 1000) + 200;
    const todo = new Todo(this.title, false, id);
    this.todos.push(todo);
    this.title = '';
    this.http.addTodo(todo).subscribe();
  }
  edit(id): void{
    let td;
    for (const todo of this.todos){
      if (todo.id === Number(id)){
        td = todo;
      }
    }
    this.http.changeTodo(id, td).subscribe();
  }

}

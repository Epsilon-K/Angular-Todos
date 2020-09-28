import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  setClasses(){
    let classes = {
      'not-complete': true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggled(todo:Todo){
    // local data toggle
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleTodo(todo).subscribe(todo => console.log(todo));
  }
  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

}

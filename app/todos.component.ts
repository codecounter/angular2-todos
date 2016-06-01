import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'todos',
    template: `
   	<form>
    	<input #addText type="text" value="" />
    	<button (click)="onAddClicked(addText.value);addText.value = '';">Add</button>
    </form>
    <h3>unfinished</h3>
    <ul class="unchecked" *ngIf="uncheckedTodos.length">
    	<li *ngFor="let todo of uncheckedTodos">
    		<span>{{ todo.text }}</span>
    		<input type="checkbox" [attr.data-todo-id]="todo.id" (change)="onCheckChanged($event)" />
    	</li>
    </ul>
    <h3>finished</h3>
    <ul class="checked" *ngIf="checkedTodos.length">
    	<li *ngFor="let todo of checkedTodos">
    		<span>{{ todo.text }}</span>
    		<input type="checkbox" [attr.data-todo-id]="todo.id" (change)="onCheckChanged($event)" checked="checked" />
    	</li>
    </ul>
    `,
    providers: [TodoService]
})
export class TodosComponent {

	todos: Todo[];
	checkedTodos: Todo[] = [];
	uncheckedTodos: Todo[] = [];

	constructor(private todoService: TodoService) {
		this.getTodos();
	}

	getTodos() {
		var self = this;
		this.todoService.getTodos().then(function(todos) {
			self.todos = todos;
			todos.forEach(function(todo) {
				if (todo.checked) {
					self.checkedTodos.push(todo);
				} else {
					self.uncheckedTodos.push(todo);
				}
			});
		});
	}

	onAddClicked(text) {
		var todo = new Todo(Math.round(Math.random() * 100000), text, false);
		this.todos.unshift(todo);
		this.uncheckedTodos.unshift(todo);
    }

    onCheckChanged(e) {
    	var self = this;
    	var id = parseInt(e.target.dataset.todoId);
    	var checked = e.target.checked;

    	var todo: Todo;
    	this.todos.forEach(function(t) {
    		if (t.id == id) {
    			todo = t;
    		}	
    	});

    	if (todo && todo.id > 0) {
    		todo.checked = checked;
    	}

    	this.checkedTodos = [];
    	this.uncheckedTodos = [];
    	this.todos.forEach(function(t) {
			if (t.checked) {
				self.checkedTodos.push(t);
			} else {
				self.uncheckedTodos.push(t);
			}
		});
    }
}
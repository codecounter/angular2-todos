import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

	private todos: Todo[] = [
		new Todo(1, 'todo1', false),
		new Todo(2, 'todo2', false)
	];
	
	getTodos(): Promise<Todo[]> {
		var self = this;
		var promise = new Promise<Todo[]>(function(resolve, reject) {
			setTimeout(function() {
				resolve(self.todos);
			}, 2000);
		});
		return promise;
	}

}
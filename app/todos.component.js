"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_service_1 = require('./todo.service');
var todo_1 = require('./todo');
var TodosComponent = (function () {
    function TodosComponent(todoService) {
        this.todoService = todoService;
        this.checkedTodos = [];
        this.uncheckedTodos = [];
        this.getTodos();
    }
    TodosComponent.prototype.getTodos = function () {
        var self = this;
        this.todoService.getTodos().then(function (todos) {
            self.todos = todos;
            todos.forEach(function (todo) {
                if (todo.checked) {
                    self.checkedTodos.push(todo);
                }
                else {
                    self.uncheckedTodos.push(todo);
                }
            });
        });
    };
    TodosComponent.prototype.onAddClicked = function (text) {
        var todo = new todo_1.Todo(Math.round(Math.random() * 100000), text, false);
        this.todos.unshift(todo);
        this.uncheckedTodos.unshift(todo);
    };
    TodosComponent.prototype.onCheckChanged = function (e) {
        var self = this;
        var id = parseInt(e.target.dataset.todoId);
        var checked = e.target.checked;
        var todo;
        this.todos.forEach(function (t) {
            if (t.id == id) {
                todo = t;
            }
        });
        if (todo && todo.id > 0) {
            todo.checked = checked;
        }
        this.checkedTodos = [];
        this.uncheckedTodos = [];
        this.todos.forEach(function (t) {
            if (t.checked) {
                self.checkedTodos.push(t);
            }
            else {
                self.uncheckedTodos.push(t);
            }
        });
    };
    TodosComponent = __decorate([
        core_1.Component({
            selector: 'todos',
            template: "\n   \t<form>\n    \t<input #addText type=\"text\" />\n    \t<button (click)=\"onAddClicked(addText.value)\">Add</button>\n    </form>\n    <h3>unfinished</h3>\n    <ul class=\"unchecked\" *ngIf=\"uncheckedTodos.length\">\n    \t<li *ngFor=\"let todo of uncheckedTodos\">\n    \t\t<span>{{ todo.text }}</span>\n    \t\t<input type=\"checkbox\" [attr.data-todo-id]=\"todo.id\" (change)=\"onCheckChanged($event)\" />\n    \t</li>\n    </ul>\n    <h3>finished</h3>\n    <ul class=\"checked\" *ngIf=\"checkedTodos.length\">\n    \t<li *ngFor=\"let todo of checkedTodos\">\n    \t\t<span>{{ todo.text }}</span>\n    \t\t<input type=\"checkbox\" [attr.data-todo-id]=\"todo.id\" (change)=\"onCheckChanged($event)\" checked=\"checked\" />\n    \t</li>\n    </ul>\n    ",
            providers: [todo_service_1.TodoService]
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map
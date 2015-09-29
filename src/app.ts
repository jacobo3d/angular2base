/// <reference path="../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {FirebaseOnValuePipe} from './firebasepipe';
@Component({
	selector: 'display'
})
@View({
	template: `
	  <p>Todos:</p>
	  <ul>
	  	<li *ng-for="#key of 'https://test-stuff.firebaseio.com/angular2' | firebasevalue:'child_added'">
	  		{{ key }}
	  	</li>
	  </ul>
	  <input #todotext>
	  <buton (click)="addTodo(todotext.value)">Add Todo</button>
	`,
	directives: [NgFor],
  pipes: [FirebaseOnValuePipe]
})

class TodoList {
	todos: Dictionary;
	todoDatabase: Firebase;
	constructor() {
		// var self = this;
		// self.todos = {};
		// self.todoDatabase = new Firebase("");
		// self.todoDatabase.on("child_added", function(snapshot) {
		// 	console.log(self.todos);
		// 	var key = snapshot.key();
		// 	self.todos[key] = snapshot.val();
		// });
	}
	keys(): Array<string> {
		return Object.keys(this.todos);
	}
	addTodo(todo: string) {
		this.todoDatabase.push(todo);
	}
	doneTyping($event) {
		if ($event.which === 13) {
			this.addTodo($event.target.value);
			$event.target.value = null;
		}
	}
}

interface Dictionary {
	[ index: string ]: string
}

bootstrap(TodoList);
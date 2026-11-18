import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/model/todoInterface';
import { SnackBarService } from 'src/app/snack-bar.service';
import { UuidService } from 'src/app/uuid.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @ViewChild('todoItem') //@viewChild is finds the html element having the reference
  todoItemref!: ElementRef;//todoItemref:store its reference and ElementRef:provide access to underlying dom Element
  @ViewChild('isCompletedRef') isCompletedRef!: ElementRef<HTMLInputElement>
  private editId!: string;
  todosArr: Array<Itodo> = [
    {
      todoItem: "HTML",
      todoId: "101",
      isCompleted: true
    },
    {
      todoItem: "CSS",
      todoId: "102",
      isCompleted: true
    },
    {
      todoItem: "JAVASCRIPT",
      todoId: "103",
      isCompleted: false
    }
  ]
  isEditMode: boolean = false;


  constructor(private _uuidService: UuidService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }
  onAddTodo() {
    let todo: Itodo = {
      todoItem: this.todoItemref.nativeElement.value,
      todoId: this._uuidService.getUuid(),
      // isCompleted: this.isCompletedRef.nativeElement.value === 'yes' ? true : false
      isCompleted: this.isCompletedRef.nativeElement.value === 'yes'

    }
    this.todosArr.push(todo)
    this.todoItemref.nativeElement.value = ''//to reset the form 
    this.isCompletedRef.nativeElement.value = '';
    this._snackBar.openSnackBar(`The new todo item with ${todo.todoId} is added successfully`)
  }



  onEditTodo(todo: Itodo) {
    this.editId = String(todo.todoId);
    this.todoItemref.nativeElement.value = todo.todoItem;
    this.isCompletedRef.nativeElement.value = todo.isCompleted ? 'yes' : 'no';
    this.isEditMode = true;
  }

  //update
  onUpdateTodo() {
    let updated_obj: Itodo = {
      todoItem: this.todoItemref.nativeElement.value,
      todoId: this.editId,
      isCompleted: this.isCompletedRef.nativeElement.value === 'yes'
    }
    let getIndex = this.todosArr.findIndex(todo => todo.todoId === this.editId);
    this.todosArr[getIndex] = updated_obj;
    this.isEditMode = false;
    this.todoItemref.nativeElement.value = '';
    this.isCompletedRef.nativeElement.value = '';
    this._snackBar.openSnackBar(`The new todo item with ${updated_obj.todoId} is Updated successfully`)
  }


  //Remove
  onRemoveTodo(todo: Itodo) {
    let getConfirm = confirm(`Are You Sure, You want to remove the todo item with id ${todo.todoId}`)
    if (getConfirm) {
      let getIndex = this.todosArr.findIndex(t => t.todoId === todo.todoId);
      this.todosArr.splice(getIndex, 1);
      this._snackBar.openSnackBar(`The new todo item with ${todo.todoId} is Removed successfully`)

    }
  }


  onUpdateCheckbox(todo: Itodo) {

    todo.isCompleted = !todo.isCompleted;
    console.log(this.todosArr);
    // let getIndex = this.todosArr.findIndex(todos => todos.todoId === todo.todoId);
    // this.todosArr[getIndex].isCompleted = updatedObj.isCompleted;
    this._snackBar.openSnackBar(`CheckBox is updated successfully`);
  }
}










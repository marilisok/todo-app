export class Todo {
  constructor(public title: string, public completed: boolean, public id: number) {
    this.title = title;
    this.completed = completed;
    this.id = id;
  }
}

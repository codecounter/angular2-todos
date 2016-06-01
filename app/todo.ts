export class Todo {

    id: number;
    text: string;
    checked: boolean;
    
    constructor(id: number, text: string, checked: boolean) {
        this.id = id;
        this.text = text;
        this.checked = checked;
    }

}
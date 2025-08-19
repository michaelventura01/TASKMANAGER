export enum TaskStatus { Pending, InProgress, Completed };
export class TaskDto {
    public id?:string;
    public title:string;
    public description?:string;
    public createdAt:Date;
    public dueDate?:Date;
    public status:TaskStatus;
    
    constructor(){
        this.id = "";
        this.title="";
        this.description="";
        this.createdAt = new Date();
        this.dueDate = new Date();
        this.status = TaskStatus.Pending;
    }

}
export class TaskCreationDto {
    public title:string;
    public description?:string;
    public createdAt:Date;
    public dueDate?:Date;
    public status:TaskStatus;
    
    constructor(){
        this.title="";
        this.description="";
        this.createdAt = new Date();
        this.dueDate = new Date();
        this.status = TaskStatus.Pending;
    }

}
export interface ITask {
    TaskID: number
    Name: string;
    Priority: number;
    Description: string;
    Status: string;
    BeginDate: Date;
    EndDate: Date;
}
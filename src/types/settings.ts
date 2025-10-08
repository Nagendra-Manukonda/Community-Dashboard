export interface TaskType {
    time: number;
    label: string;
    color: string;
    priority: "Low" | "Medium" | "High";
}
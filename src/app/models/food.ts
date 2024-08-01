export interface Food{
    id: number;
    name: string;
    properties: {
        calories: number;
        protein: number;
    }
}
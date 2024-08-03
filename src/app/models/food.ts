export interface Food{
    id: number;
    name: string;
    properties: {
        calories: number;
        protein: number;
    }
    servingSize: {
        amount: number;
        unit: string; // e.g., grams, ounces, cups, etc.
    };
    hour: number; //esta bueno por si alguien comio a una hora anterior
}
export interface Meal {
  id: string;
  meal: string;
  food: string;
  calories: number;
}

export interface mealApi {
  [id: string]: Meal;
}
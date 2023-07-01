export type LoadingProps = {
    isPageLoaded: boolean;
};
export type ingredientDataType = {
    id?: number;
    name: string;
    quantity?: number;
    unit?: string;
};
export type recipeDataType = {
    recipe: {
        id: number;
        name: string;
        cuisine?: string;
        ingredients: ingredientDataType[];
        steps: string[];
        prepTime?: number;
        cookTime?: number;
        totalTime?: number;
        servings?: number;
        rating?: number;
        image?: string;
    };
};
export type recipeListDataType = {
    gptRecipes?: recipeDataType[];
    recipes?: recipeDataType[];
};

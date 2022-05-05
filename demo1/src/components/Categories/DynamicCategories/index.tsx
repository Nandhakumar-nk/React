import React from "react";
import { ICategory } from "..";
import { CategoryListItem } from "../CategoryListItem";

export interface IDynamicCategoriesProps {
  categories: ICategory[];
  switchCategory: (categoryId: string) => void;
}

export function DynamicCategories(props: IDynamicCategoriesProps) {
  const elements = props.categories.map((category, index) => {
    return (
      <CategoryListItem
        category={category}
        key={category._id}
        switchCategory={props.switchCategory}
      />
    );
  });

  return (
    <div>
      <ul className="dynamic-list">{elements}</ul>
    </div>
  );
}

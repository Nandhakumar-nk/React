import React, { useState } from "react";

export interface INewCategoryAdderProps {
  addCategory: (categoryName: string) => void;
  showShedulingIcons: (displayShedulingIcons: boolean) => void;
}

export function NewCategoryAdder(props: INewCategoryAdderProps) {
  const [category, setCategory] = useState("");

  function addCategory(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && category.length > 0) {
      props.addCategory(category);
      setCategory("");
    }
  }
  return (
    <div className="new-list-container">
      <div className="new-list-left-container">
        <div className="add-icon-container">
          <i className="material-icons add-icon blue-icon">add</i>
        </div>

        <input
          className="new-list-input-box new-list"
          id="newCategoryInputBox"
          type="text"
          value={category}
          placeholder="New List"
          onClick={() => props.showShedulingIcons(false)}
          onChange={(event) => setCategory(event.target.value)}
          onKeyUp={addCategory}
        />
      </div>

      <div className="note-icon-container">
        <i className="material-icons add-icon blue-icon note-add-icon">
          note_add_outlined
        </i>
      </div>
    </div>
  );
}

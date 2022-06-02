import React from "react";

import { IMenuListItem, MenuListItem } from "../MenuListItem";

interface IRightMenuBoxProps {
  items: IMenuListItem[];
}

export function RightMenuBox(props: IRightMenuBoxProps) {
  const listItems = props.items.map((item, index) => {
    return <MenuListItem item={item} key={index} />;
  });

  return <ul className="right-menu-container">{listItems}</ul>;
}

"use client";

import { useState } from "react";

const useProductFilter = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectedItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetSelectedItems = () => setSelectedItems([]);

  const selectAll = (ids: string[]) => {
    setSelectedItems(ids);
  };

  const isSelected = (id: string) => selectedItems.includes(id);

  return {
    selectedItems,
    toggleSelectedItem,
    resetSelectedItems,
    selectAll,
    isSelected,
  };
};

export default useProductFilter;

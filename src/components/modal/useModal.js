import { useState } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSelectedButtonActive, setIsSelectedButtonActive] = useState(false);
  
    const handleSelectClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSelectCategory = (category) => {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((item) => item !== category);
        } else {
          return [...prev, category];
        }
      });
    };
  
    const handleCompleteSelection = () => {
      setIsModalOpen(false);
      setIsSelectedButtonActive(true);
    };

  return {
    isModalOpen,
    selectedCategories,
    isSelectedButtonActive,
    handleSelectClick,
    handleCloseModal,
    handleSelectCategory,
    handleCompleteSelection
  };
};

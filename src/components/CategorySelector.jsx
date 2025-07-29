import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../store/categoriesSlice';
import { setSelectedCategories } from '../store/topHistorySlice';
import {
  selectCategoriesList,
  selectCategoriesLoading,
  selectCategoriesError,
  selectSelectedCategories,
} from '../selectors/index';
import '../style/App.scss';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesList);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const selectedCategories = useSelector(selectSelectedCategories);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleChange = (id) => {
    let newSelected;
    if (selectedCategories.includes(id)) {
      newSelected = selectedCategories.filter(catId => catId !== id);
    } else {
      newSelected = [...selectedCategories, id];
    }
    dispatch(setSelectedCategories(newSelected));
  };

  if (loading) return <div style={{ minWidth: 120 }}>Loading...</div>;
  if (error) return <div style={{ minWidth: 120, color: 'red' }}>Error</div>;

  return (
    <div className='category-selector__wrapper'>
      {categories.map(cat => (
        <label key={cat.id} className='category-selector__label'>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => handleChange(cat.id)}
          />
          {cat.name}
        </label>
      ))}
    </div>
  );
};

export default CategorySelector;
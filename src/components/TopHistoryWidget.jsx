import React from "react";
import CountrySelector from './CountrySelector';
import { useSelector, useDispatch } from 'react-redux';
import { loadTopHistory } from '../store/topHistorySlice';
import TopHistoryChart from './TopHistoryChart';
import CategorySelector from './CategorySelector';
import {
  selectSelectedCountry,
  selectDateFrom,
  selectDateTo,
  selectTopHistory,
  selectSelectedCategories,selectCategoriesList,
} from '../selectors/index';
import '../style/App.scss';

const TopHistoryWidget = () => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(selectSelectedCountry);
  const dateFrom = useSelector(selectDateFrom);
  const dateTo = useSelector(selectDateTo);
  const topHistory = useSelector(selectTopHistory);
  const selectedCategories = useSelector(selectSelectedCategories);
  const categoriesList = useSelector(selectCategoriesList);

  React.useEffect(() => {
    if (selectedCountry && dateFrom && dateTo) {
      dispatch(loadTopHistory({ countryId: selectedCountry, dateFrom, dateTo }));
    }
  }, [dispatch, selectedCountry, dateFrom, dateTo]);

  return (
    <div className="top-history-widget">
      <h2 className="top-history-title">Top History</h2>
      <div className="top-history-controls">
        <CategorySelector />
        <CountrySelector />
      </div>
      <div className="top-history-categories"></div>
      <div className="top-history-chart">
        {topHistory.loading
          ? 'Loading chart...'
          : topHistory.error
          ? `Error: ${topHistory.error}`
          : (
            <TopHistoryChart
              data={topHistory.data}
              selectedCategories={selectedCategories}
              categoriesList={categoriesList}
            />
          )}
      </div>
    </div>
  );
};

export default TopHistoryWidget;
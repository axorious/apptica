import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import countriesReducer from './countriesSlice';
import categoriesReducer from './categoriesSlice';
import topHistoryReducer from './topHistorySlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  categories: categoriesReducer,
  topHistory: topHistoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; 
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCountries } from '../store/countriesSlice';
import { setSelectedCountry } from '../store/topHistorySlice';
import {
  selectSelectedCountry,
  selectCountriesList,
  selectCountriesLoading,
  selectCountriesError,
} from '../selectors/index';

const CountrySelector = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountriesList);
  const loading = useSelector(selectCountriesLoading);
  const error = useSelector(selectCountriesError);
  const selectedCountry = useSelector(selectSelectedCountry);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setSelectedCountry(e.target.value));
  };

  if (loading) return <div style={{ minWidth: 120 }}>Loading...</div>;
  if (error) return <div style={{ minWidth: 120, color: 'red' }}>Error</div>;

  const selected = countries.find(c => String(c.id) === String(selectedCountry));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14, color: '#555', marginRight: 5 }}>Country</span>
      {selected && selected.icon && (
        <img
          src={selected.icon}
          alt={selected.name}
          style={{ width: 20, height: 15}}
        />
      )}
      <select value={selectedCountry || ''} onChange={handleChange} style={{ minWidth: 90 }}>
        <option value='' disabled>Select</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import useCountriesData from '../hooks/useCountriesData';

// Define the shape of the context
interface CountryContextProps {
  countriesData: any[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: any;
  setSelectedCountry: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortAscending: boolean;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
  filterRegion: string;
  setFilterRegion: React.Dispatch<React.SetStateAction<string>>;
  selectedCountries: any[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<any[]>>;
  toggleCountrySelection: (country: any) => void;
  clearSelectedCountries: () => void;
}

// Create the context
const CountryContext = createContext<CountryContextProps | undefined>(undefined);

// CountryProvider component
export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { countriesData, isLoading, error } = useCountriesData();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);

  // Toggle selection of a country for comparison
  const toggleCountrySelection = (country: any) => {
    const isSelected = selectedCountries.some((c: any) => c.name.common === country.name.common);
    if (isSelected) {
      setSelectedCountries(selectedCountries.filter((c: any) => c.name.common !== country.name.common));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  // Clear all selected countries
  const clearSelectedCountries = () => {
    setSelectedCountries([]);
  };

  return (
    <CountryContext.Provider
      value={{
        countriesData,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        selectedCountry,
        setSelectedCountry,
        open,
        setOpen,
        sortAscending,
        setSortAscending,
        filterRegion,
        setFilterRegion,
        selectedCountries,
        setSelectedCountries,
        toggleCountrySelection,
        clearSelectedCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

// Hook to use the CountryContext
export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};

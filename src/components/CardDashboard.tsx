"use client"

import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Image from 'next/image'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useCountriesData from '@/hooks/useCountriesData';

import TextField from '@mui/material/TextField';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useCountryContext } from '@/context/CountryContext';

import ComparisonTable from './ComparisonTable';
import LoadingCircle from './LoadingCircle';
import ErrorAlert from './ErrorAlert';
import RegionsList from './RegionsList';
import FlagCard from './FlagCard';
import CountryCard from './CountryCard';


type Props = {}

const CardDashboard = (props: Props) => {
  const {
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
    toggleCountrySelection,
    clearSelectedCountries,
  } = useCountryContext(); 


  // Unique list of regions from the country data
  const regions = Array.from(new Set(countriesData?.map((country: any) => country.region)));


  if (isLoading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  // Filtering and then sorting the data by name
  const filteredAndSortedCountries = countriesData?
    .filter((item: any) => {
      // Match country name or capital based on the search term
      const nameMatch = item.name?.common?.toLowerCase().includes(searchTerm.toLowerCase());
      const capitalMatch = item.capital?.some((cap: string) =>
        cap.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Filter by region if selected
      const regionMatch = filterRegion === '' || item.region === filterRegion;

      return (nameMatch || capitalMatch) && regionMatch;
    })
    .sort((a: any, b: any) => {
      if (sortAscending) {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.name.common.localeCompare(a.name.common);
      }
    });
  
  
    // Open modal and set selected country
  const handleCardClick = (country: any) => {
    setSelectedCountry(country);
    setOpen(true);  // Open modal
  };

  
  return (
    <div style={{ padding: '20px' }}>
      {/* Search Input */}
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {/* Sort and Filter Options */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {/* Sort Ascending/Descending */}
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={sortAscending}
                onChange={(e) => setSortAscending(e.target.checked)}
                name="sortAscending"
              />
            }
            label="Sort Ascending"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!sortAscending}
                onChange={(e) => setSortAscending(!e.target.checked)}
                name="sortDescending"
              />
            }
            label="Sort Descending"
          />
        </FormGroup>

        {/* Filter by Region */}
        <RegionsList filterRegion={filterRegion} setFilterRegion={setFilterRegion} regions={regions}/>
        
      </div>
      {/* Comparison Section */}
      {selectedCountries?.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            {selectedCountries.length == 1 ? `Add two or more countries to compare`: `Comparison`}
          </Typography>
          <ComparisonTable countries={selectedCountries} />
          {selectedCountries.length == 1 ? null: (
            <Button onClick={clearSelectedCountries} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
            Clear Selection
          </Button>)}
          
        </div>
      )}
      {/* Responsive Grid Layout */}
      <Grid container spacing={3}>
        {filteredAndSortedCountries?.length>0 && filteredAndSortedCountries.map((item: any, index: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <FlagCard item={item} handleCardClick={handleCardClick}/>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Additional Country Details */}
      <CountryCard />
    </div>
  )
}

export default CardDashboard
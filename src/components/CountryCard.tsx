import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useCountryContext } from '@/context/CountryContext';



type Props = {}

const CountryCard = (props: Props) => {
    const {
        selectedCountry,
        setSelectedCountry,
        open,
        setOpen
      } = useCountryContext(); 
    
      // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedCountry(null);  // Reset selected country when modal closes
  };
  return (
    <>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedCountry?.name?.common}</DialogTitle>
        <DialogContent>
          {selectedCountry && (
            <>
              <CardMedia
                component="img"
                alt={`${selectedCountry.name?.common} flag`}
                height="200"
                image={selectedCountry?.flags?.svg?.toString()}
                style={{ objectFit: 'contain', marginBottom: '20px' }}
              />
              <Typography variant="body1">
                <strong>Capital:</strong> {selectedCountry.capital || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Region:</strong> {selectedCountry.region}
              </Typography>
              <Typography variant="body1">
                <strong>Population:</strong> {selectedCountry.population.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Languages:</strong>{' '}
                {selectedCountry?.languages ? Object.values(selectedCountry.languages).join(', ') : 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Currencies:</strong>{' '}
                {selectedCountry?.currencies 
                  ? Object.values(selectedCountry.currencies).map((currency: any) => `${currency.name} (${currency.symbol})`).join(', ')
                  : 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Timezones:</strong> {selectedCountry?.timezones?.join(', ')}
              </Typography>
              {/* Additional information can be added here */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CountryCard
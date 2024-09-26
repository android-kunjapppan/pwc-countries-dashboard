import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useCountryContext } from './../context/CountryContext';


type Props = {
    item: any
    handleCardClick: any
}

const FlagCard = ({item, handleCardClick}: Props) => {
    const {
        selectedCountries,
        toggleCountrySelection
      } = useCountryContext(); 
  return (
    <>
    <Card style={{ cursor: 'pointer' }}>
              {/* Flag Image */}
        
        <CardMedia
        component="div"
        style={{ height: 140, position: 'relative' }}
        onClick={() => handleCardClick(item)}
        >
        <Image
            src={item?.flags?.svg?.toString()}
            alt={`${item.name?.common} flag`}
            layout="fill"
            objectFit="contain"
        />
        </CardMedia>

        {/* Card Content */}
        <CardContent onClick={() => handleCardClick(item)}>
        <Typography variant="h6" component="div">
            {item.name?.common}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            <strong>Capital:</strong> {item.capital || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            <strong>Region:</strong> {item.region}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            <strong>Population:</strong> {item.population.toLocaleString()}
        </Typography>
        </CardContent>
        <FormControlLabel
            control={
            <Checkbox
                checked={selectedCountries.some((c: any) => c.name.common === item.name.common)}
                onChange={() => toggleCountrySelection(item)}
                name={`compare-${item.name.common}`}
                color="primary"
            />
            }
            label="Compare"
        />
    </Card>
    </>
  )
}

export default FlagCard
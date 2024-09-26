import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Props = {
    filterRegion: string;
    setFilterRegion: (region: string) => void;
    regions: string[];
  };

const RegionsList = ({ filterRegion, setFilterRegion, regions }: Props) => {
  return (
    <Select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value as string)}
          displayEmpty
        >
        <MenuItem value="">
        <em>All Regions</em>
        </MenuItem>
        {[].map((region: any, index: any) => (
            <MenuItem key={index} value={region}>
                {region}
            </MenuItem>
        ))}
    </Select>
  )
}

export default RegionsList
"use client"
import React, {useState} from 'react';
import useCountriesData from '@/hooks/useCountriesData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Card, CardContent, CardMedia, Typography, TextField } from '@mui/material';



type Props = {}

const DashboardComponent = (props: Props) => {
    const styles = {
        header: {
          fontWeight: 'bold',
          width: 'max-content',
          minWidth: 150,
        },
      }
    const {countriesData} = useCountriesData();
    console.log(countriesData)
    interface ItemType {
        flags: any;
        name: any
        languages: [{ name?: string }]
        region: string
        population: number
        capital: string[]
        timezones: string[]
        svg: string
        common: string

      }
  return (
    <>
    <TableContainer component={Paper} elevation={10}>
          <Table size='small' aria-label='Countries Table'>
            <TableHead>
              <TableRow>
                <TableCell style={styles.header}>Flag</TableCell>
                <TableCell style={styles.header}>Country Name</TableCell>
                <TableCell style={styles.header}>Capital</TableCell>
                <TableCell style={styles.header}>Region</TableCell>
                <TableCell style={styles.header}>Population</TableCell>
                <TableCell style={styles.header}>Languages</TableCell>
                <TableCell style={styles.header}>Time Zones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countriesData
                ? countriesData.sort((a: any, b: any) => {
                    if (a.name?.common < b.name?.common) return -1;
                    if (a.name?.common > b.name?.common) return 1;
                    return 0;
                  })
                    .map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img src={item?.flags?.svg?.toString()}  
                                alt={`${item.name?.common} flag`} 
                                style={{ width: '40px', height: 'auto' }}/>
                        </TableCell>
                        <TableCell>{item.name?.common}</TableCell>
                        <TableCell>{item.capital}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.population}</TableCell>
                        <TableCell>
                            {item?.languages ? Object.values(item.languages).join(', ') : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {item?.timezones?.toString().split(',').join(' ')}
                        </TableCell>
                        
                      </TableRow>
                    ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  )
}

export default DashboardComponent
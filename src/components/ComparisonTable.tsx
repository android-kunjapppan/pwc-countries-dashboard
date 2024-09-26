import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Comparison table component
const ComparisonTable: React.FC<{ countries: any }> = ({ countries }) => {
    if (countries.length <= 1) {
        return null; // No need to render the table if there aren't multiple countries
    }
    return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label="comparison table">
        <TableHead>
          <TableRow>
            <TableCell>Attribute</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>{country.name.common}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Capital</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>{country.capital.join(', ') || 'N/A'}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Region</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>{country.region}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Population</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>{country.population.toLocaleString()}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Languages</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>
                {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Timezones</TableCell>
            {countries.map((country: any, index: any) => (
              <TableCell key={index}>{country.timezones.join(', ')}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>)
};

export default ComparisonTable;
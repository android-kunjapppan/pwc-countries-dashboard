"use client"
import useSWR from 'swr';


const useCountriesData = () => {
  const endpoint = `https://restcountries.com/v3.1/all`; // make sure it is stored in a env file this is not a good practice

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const {
    data: response,
    error,
    isLoading,
  } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: true,
  });

  return {
    isLoading,
    countriesData: response,
    error,  // Added error to be returned
  };
};

export default useCountriesData;

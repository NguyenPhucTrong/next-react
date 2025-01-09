import { FilterProps } from "@/styles";


// const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '78f132c206msh9fa52d5f36e7bf0p18018bjsn98bc96f134d2',
// 		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
// 	}
// };


// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'x-rapidapi-key': '78f132c206msh9fa52d5f36e7bf0p18018bjsn98bc96f134d2',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  const buildQueryParams = (useLimit = true) => {
    const queryParams = new URLSearchParams();

    if (manufacturer) queryParams.append('make', manufacturer);
    if (year) queryParams.append('year', year.toString());
    if (model) queryParams.append('model', model);
    if (useLimit && limit) queryParams.append('limit', limit.toString());
    if (fuel) queryParams.append('fuel_type', fuel);

    return queryParams.toString();
  };

  const fetchFromApi = async (useLimit = true) => {
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${buildQueryParams(useLimit)}`;
    console.log('Fetching cars with URL:', url);

    const response = await fetch(url, { headers });

    if (!response.ok) {
      // console.error('API Error:', response.statusText);
      throw new Error('API request failed');
    }

    const result = await response.json();
    return result;
  };

  try {
    // Try fetching with the limit parameter
    const cars = await fetchFromApi(true);
    console.log('Fetched cars:', cars);
    return cars;
  } catch (error) {
    console.warn('Primary API failed, falling back to no-limit request:', error);

    try {
      // Fallback: Fetch without the limit parameter
      const fallbackCars = await fetchFromApi(false);
      console.log('Fetched cars from fallback:', fallbackCars);
      return fallbackCars;
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
      return [];
    }
  }
}





export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParamsProps = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
}

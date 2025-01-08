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

  // Build query string only with valid parameters
  const queryParams = new URLSearchParams();

  if (manufacturer) queryParams.append('make', manufacturer);
  if (year) queryParams.append('year', year.toString());
  if (model) queryParams.append('model', model);
  if (limit) queryParams.append('limit', limit.toString());
  if (fuel) queryParams.append('fuel_type', fuel);

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.toString()}`;

  console.log('Fetching cars with URL:', url);

  try {
    const response = await fetch(url, { headers });

    // Check HTTP status
    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return [];
    }

    const result = await response.json();
    console.log('Fetched cars:', result);

    return result;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
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

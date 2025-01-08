"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CustomFilter, Hero, Searchbar, CarCard } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { useSearchParams } from "next/navigation";
import { fetchCars } from "@/utils";
import ShowMore from "@/components/ShowMore";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const params = useSearchParams();

  const getCars2 = async () => {
    setIsLoading(true);
    try {

      const results = await fetchCars({
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      // setAllCars(cars);
      // console.log("Cars:", cars);
      setAllCars(results);
      console.log("Cars:", results);


    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCars2();
  }, [fuel, year, limit, manufacturer, model]);

  // useEffect(() => {
  //   async function getCars() {
  //     const cars = await fetchCars({
  //       manufacturer: params.get("manufacturer") || "",
  //       year: parseInt(params.get('year') || "2022"),
  //       fuel: params.get("fuel") || "",
  //       limit: parseInt(params.get("limit") || "10"),
  //       model: params.get("model") || "",
  //     }
  //     );
  //     setAllCars(cars);
  //     console.log("Cars:", cars);
  //     setIsLoading(false);
  //   }
  //   getCars();
  // }, [params]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length === 0;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          {/* <Searchbar /> */}

          <Searchbar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className='home__filter-container'>
            {/* <CustomFilter title='fuel' options={fuels} /> 
            <CustomFilter title='year' options={yearsOfProduction} />
            */}
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>



        {/* {isLoading ? (
          <div>Loading...</div>
        ) : !isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div> */}
        {/* <ShowMore
              pageNumber={(parseInt(params.get('limit') || '10', 10)) / 10}
              isNext={(parseInt(params.get('limit') || '10', 10)) > allCars.length}
            /> */}

        {/* </section>
      ) : (
      <div className="home__error-container">
        <h2 className="text-black text-xl font-bold">
          Oops, no results found
        </h2>
        <p>
          No cars available at the moment.
        </p>
      </div>
        )} */}

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>

            {isLoading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" alt="loader" width={50} height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />

          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, no results found
            </h2>
            <p>
              No cars available at the moment.
            </p>
          </div>
        )
        }


      </div>
    </main >
  );
}
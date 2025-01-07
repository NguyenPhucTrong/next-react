"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CustomFilter, Hero, Searchbar, CarCard } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { useSearchParams } from "next/navigation";
import { fetchCars } from "@/utils";
import { HomeProps } from "@/styles";
import ShowMore from "@/components/ShowMore";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();

  useEffect(() => {
    async function getCars() {
      const cars = await fetchCars({
        manufacturer: params.get("manufacturer") || "",
        year: parseInt(params.get('year') || "2022"),
        fuel: params.get("fuel") || "",
        limit: parseInt(params.get("limit") || "10"),
        model: params.get("model") || "",
      }
      );
      setAllCars(cars);
      console.log("Cars:", cars);
      setIsLoading(false);
    }
    getCars();
  }, [params]);

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
          <Searchbar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : !isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            {/* <ShowMore /> */}
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
        )}
      </div>
    </main>
  );
}
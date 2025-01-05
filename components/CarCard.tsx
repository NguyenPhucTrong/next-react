"use client";

import React from 'react'
import CustomButton from './CustomButton' 
import { calculateCarRent } from '@/utils'
import Image from 'next/image'

interface CarCardProps {
    car: {
        model: string;
        make: string;
        city_mpg: number;
        transmission: string;
        year: number;
        drive: string;
    };
}

export default function CarCard({ car }: CarCardProps) {
    const { city_mpg, year, make, model, transmission, drive } = car;

    const carRent = calculateCarRent(city_mpg, year);

    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>
            <p className="flex mt-6 text-[32px] font-extrabold">
                <span className="self-start text-[14px] font-semibold">
                    $
                </span>
                {carRent}
                <span className="self-start text-[14px] font-semibold">
                    /day
                </span>
            </p>
            <div className="relative w-full h-40 my-3 object-contain">
            <Image 
    src="/hero.png" 
    width={50} 
    height={50} 
    alt="car model" 
    className="object-contain" 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
/>            </div>
        </div>
    );
}
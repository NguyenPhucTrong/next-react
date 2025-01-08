"use client";

import { useRouter } from 'next/navigation';
import { SearchManufacturer } from './';
import Image from 'next/image';
import React, { useState } from 'react'
import { SearchBarProps } from '@/styles';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`} >
        <Image
            src={"/magnifying-glass.svg"}
            alt={"magnifying glass"}
            width={40}
            height={40}
            className='object-contain'
        />
    </button>
)

export default function Searchbar({ setManufacturer, setModel }: SearchBarProps) {
    const [searchManufacturer, setSearchManufacturer] = useState("");
    const [searchModel, setSearchModel] = useState("");

    // const [manufacturer, setManufacturer] = useState("");
    // const [model, setModel] = useState("");

    const router = useRouter();
    console.log("Router context:", router);


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchManufacturer, searchModel);

        if (searchManufacturer === "" || searchModel === "") {
            return alert("Please fill in the Searchbar");

        }
        setModel(searchModel);
        setManufacturer(searchManufacturer);
    }

    // const updateSearchParams = (searchModel: string, searchManufacturer: string) => {
    //     // Create a new URLSearchParams object using the current URL search parameters
    //     const searchParams = new URLSearchParams(window.location.search);

    //     // Update or delete the 'model' search parameter based on the 'searchModel' value
    //     if (searchModel) {
    //         searchParams.set("searchModel", searchModel);
    //     } else {
    //         searchParams.delete("searchModel");
    //     }

    //     // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    //     if (searchManufacturer) {
    //         searchParams.set("searchManufacturer", searchManufacturer);
    //     } else {
    //         searchParams.delete("searchManufacturer");
    //     }

    //     // Generate the new pathname with the updated search parameters
    //     const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    //     router.push(newPathname);
    // };

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <div className='searchbar__item'>
                    <Image
                        src='/model-icon.png'
                        width={25}
                        height={25}
                        className='absolute w-[20px] h-[20px] ml-4'
                        alt='car model'
                    />
                    <input
                        type='text'
                        name='model'
                        value={searchModel}
                        onChange={(e) => setSearchModel(e.target.value)}
                        placeholder='Tiguan...'
                        className='searchbar__input'
                    />
                    <SearchButton otherClasses='sm:hidden ' />

                </div>
                <SearchButton otherClasses='max-sm:hidden ' />

            </div>
        </form>
    )
}

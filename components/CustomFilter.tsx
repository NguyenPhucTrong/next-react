"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CustomFilterProp } from "@/styles";


export default function CustomFilter<T>({ options, setFilter }: CustomFilterProp<T>) {
    // const router = useRouter();

    // const handleUpadateParams = (e: { title: string, value: string }) => {
    //     const newPathName = updateSearchParamsProps(title, e.value.toLowerCase());
    //     router.push(newPathName)
    // }
    const [selected, setSelected] = useState(options[0]); // State for storing the selected option

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={(e) => { setSelected(e); setFilter(e.value as unknown as T) }}
            >
                <div className="relative w-fit z-10">
                    <ListboxButton className="custom-filter__btn">
                        <span className="block truncate">
                            {selected.title}
                        </span>
                        <Image
                            src="/chevron-up-down.svg"
                            alt="Chevron up"
                            width={20}
                            height={20}
                            className="ml-4 object-contain "
                        />
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="custom-filter__options">
                            {options.map((option, index) => (
                                <ListboxOption
                                    key={option.title}
                                    value={option}
                                    className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                                >
                                    {({ selected }) => (
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                                            {option.title}
                                        </span>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

"use client";


import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@/styles";
import { CustomButton } from "@/components";
import { updateSearchParamsProps } from "@/utils";



export default function ShowMore({ pageNumber, isNext, setLimit }: ShowMoreProps) {

    const router = useRouter();

    const handlNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;

        // const newPathname = updateSearchParamsProps('limit', `${newLimit}`);
        // router.push(newPathname);

        setLimit(newLimit);
    }
    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton
                    title="Show More"
                    btnType="button"
                    containerStyles="bg-primary-blue rounded-full text-white"
                    handleClick={handlNavigation}
                />
            )}
        </div>
    )
}

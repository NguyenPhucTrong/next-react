"use client";
import Image from 'next/image';

import { CustomButtonProps } from '@/styles'
import React from 'react'

export default function CustomButton({ title, containerStyles, handleClick, btnType, textStyles, rightIcon, isDisabled }: CustomButtonProps) {
    return (
        <button
            disabled={false}
            type={btnType || 'button'}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>
            {rightIcon && (
                <div className="relative w-6 h-6">
                    <Image
                        src={rightIcon}
                        alt="arrow_left"
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </button>
    )
}

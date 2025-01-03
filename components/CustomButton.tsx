"use client";

import { CustomButtonProps } from '@/styles'
import React from 'react'

export default function CustomButton({ title, containerStyles, handleClick }: CustomButtonProps) {
    return (
        <button
            disabled={false}
            type={'button'}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1`}>
                {title}
            </span>
        </button>
    )
}

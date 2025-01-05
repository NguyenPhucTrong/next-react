import React from 'react';

interface CustomFilterProps {
    title: string;
}

export default function CustomFilter({ title }: CustomFilterProps) {
    return (
        <div>
            <p>{title}</p>
        </div>
    );
}

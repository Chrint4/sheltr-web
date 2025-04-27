"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import setTitle from "@/lib/setTitle";

export default function FoodBankDetail() {
    const params = useParams();
    const name = decodeURIComponent(params.name);
    const [foodbank, setFoodbank] = useState(null);

    useEffect(() => {
        if (!name) return;
        fetch('https://sheltr-db.onrender.com/getFoodBanks')
            .then(res => res.json())
            .then(data => {
                const found = data.find(fb => fb.name === name);
                setFoodbank(found);
                
                found ? setTitle(found.name) : setTitle("Food bank not found");
            });
    }, [name]);

    if (!foodbank)
        return <p>Loading food bank details...</p>;

    return (
        <>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800">{foodbank.name}</h1>
                <p className="text-gray-600">{foodbank.address}</p>
                <p className="text-gray-600 mt-2">Phone: {foodbank.phone}</p>
                <p className="text-gray-600">Email: {foodbank.email}</p>

                {foodbank.homepage_url && (
                    <p className="text-blue-600 mt-2">
                        <a href={foodbank.homepage_url} target="_blank" rel="noreferrer">
                            Visit homepage
                        </a>
                    </p>
                )}

                <h2 className="text-xl font-semibold mt-6">Shopping List</h2>
                {foodbank.shopping_list_url ? (
                    <>
                        <p className="text-blue-600 mt-2">
                            <a href={foodbank.shopping_list_url} target="_blank" rel="noreferrer">
                                Visit Shopping List
                            </a>
                        </p>

                        {/* DOESNT WORK */}
                        <iframe
                            src={foodbank.shopping_list_url}
                            title="Shopping List"
                            className="w-full h-[600px] mt-4 border rounded-md"
                        />
                    </>
                ) : (
                    <p className="text-gray-500 mt-2">No shopping list available.</p>
                )}
            </div>
        </>
    );
}

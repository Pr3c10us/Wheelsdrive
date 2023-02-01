import React from 'react';

const PriceCard = ({ tier }) => {
    return (
        <div className="mb-8 w-full">
            <div className="h-full rounded-lg border bg-white p-4 shadow-lg">
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-2xl underline font-bold text-[#2f4f4f]">
                            {tier.name}
                        </h2>
                        <p className="text-gray-500">{tier.desc}</p>
                        <div className="mt-4 flex items-center">
                            <span className="text-3xl font-bold text-[#2f4f4f]">
                                ${tier.price}
                            </span>
                            <span className="text-gray-500">/month</span>
                        </div>
                    </div>

                    <div className="mt-4 flex h-full flex-1 flex-col items-center justify-between">
                        <ul className="mb-4">
                            {tier.features.map((feature) => (
                                <li className="flex items-center text-gray-500">
                                    <svg
                                        className="mr-2 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="rounded-lg bg-[#2f4f4f] px-4 py-2 text-white">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCard;

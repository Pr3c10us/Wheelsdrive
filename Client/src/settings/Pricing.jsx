import React from 'react';
import PriceCard from './components/PriceCard';

const priceTier = [
    {
        id: 1,
        name: 'Basic',
        desc: 'Scan unlimited repository from Github',
        price: 20,
        features: [
            'Unlimited Scans',
            'Basic security',
            'Concurrent scans not supported',
        ],
    },
    {
        id: 2,
        name: 'Pro',
        price: 40,
        desc: 'Scan multiple repos at the same time',
        features: [
            'Unlimited Scans',
            'Advanced security',
            'Unlimited Concurrent scans supported',
        ],
    },
    {
        id: 3,
        name: 'Team',
        price: 100,
        desc: 'For teams and organizations with multiple users',
        features: [
            'Unlimited Scans',
            'Advanced security',
            'Unlimited Concurrent scans supported',
            'Support company sso',
            'Manage multiple users',
        ],
    },
];

const Pricing = () => {
    return (
        <div className="mt-8 flex flex-col items-center ">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#2f4f4f] underline">
                    Plans & Pricing
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                {priceTier.map((tier) => (
                    <PriceCard key={tier.id} tier={tier} />
                ))}
            </div>
        </div>
    );
};

export default Pricing;


import React, { useState, useEffect } from 'react';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { BtcIcon } from './icons/BtcIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';

interface MoneyMarketTreasuryProps {
    courtTreasury: number;
}

const AssetCard: React.FC<{ icon: React.ReactNode, label: string, value: number, unit: string }> = ({ icon, label, value, unit }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
        <div className="text-cyan-400 text-2xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-100">{value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-sm text-gray-500">{unit}</span></p>
        </div>
    </div>
);

export const MoneyMarketTreasury: React.FC<MoneyMarketTreasuryProps> = ({ courtTreasury }) => {
    const [assets, setAssets] = useState({
        crypto: 125.5, // BTC
        metals: 5000, // Ounces
    });
    const [conversion, setConversion] = useState({ amount: '', from: 'crypto', to: 'usd' });
    const [transactions, setTransactions] = useState<string[]>([]);
    
    useEffect(() => {
        setTransactions(['Initial Balance Loaded.']);
    }, []);

    const handleConversionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConversion({ ...conversion, [e.target.name]: e.target.value });
    };

    const handleExecuteConversion = () => {
        const { amount, from, to } = conversion;
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return;

        const newTransaction = `[SIMULATED] Converted ${amount} ${from.toUpperCase()} to ${to.toUpperCase()}.`;
        setTransactions(prev => [newTransaction, ...prev.slice(0, 10)]);
        setConversion({ amount: '', from: 'crypto', to: 'usd' });
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <BuildingLibraryIcon className="w-8 h-8 text-cyan-400" />
                    KR0M3D1A Money Market & Treasury
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Centralized hub for managing corporate assets. This module facilitates the distribution and conversion of cryptocurrency and digital commodities into USD/USDT, ensuring liquidity for all KR0M3D1A operations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AssetCard icon={<BuildingLibraryIcon className="w-8 h-8"/>} label="Court Treasury" value={courtTreasury} unit="USD/TRIBUNALS" />
                <AssetCard icon={<BtcIcon className="w-8 h-8"/>} label="Crypto Holdings" value={assets.crypto} unit="BTC" />
                <AssetCard icon={<DiamondIcon className="w-8 h-8"/>} label="Digital Metals Reserve" value={assets.metals} unit="Oz" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Conversion Interface */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-3">
                        <ArrowsRightLeftIcon className="w-6 h-6 text-purple-400"/>
                        Asset Conversion
                    </h3>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
                        <input type="number" name="amount" value={conversion.amount} onChange={handleConversionChange} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="0.00" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="from" className="block text-sm font-medium text-gray-300">From</label>
                            <select name="from" value={conversion.from} onChange={handleConversionChange} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md">
                                <option value="crypto">Crypto (BTC)</option>
                                <option value="metals">Metals (Oz)</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                        <ArrowsRightLeftIcon className="w-6 h-6 text-gray-500 mt-6"/>
                        <div className="flex-1">
                            <label htmlFor="to" className="block text-sm font-medium text-gray-300">To</label>
                            <select name="to" value={conversion.to} onChange={handleConversionChange} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md">
                                <option value="usd">USD/USDT</option>
                                <option value="crypto">Crypto (BTC)</option>
                                <option value="metals">Metals (Oz)</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleExecuteConversion} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">
                        Execute Conversion
                    </button>
                </div>

                {/* Transaction Log */}
                <div className="lg:col-span-3 bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm h-72 flex flex-col">
                    <h3 className="text-cyan-400 mb-2 flex-shrink-0">[TRANSACTION LOG]</h3>
                    <div className="overflow-y-auto flex-grow">
                        {transactions.map((entry, index) => (
                            <p key={index} className="text-green-400 whitespace-pre-wrap animate-fade-in-right">
                                <span className="text-gray-500 mr-2">&gt;</span>{entry}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

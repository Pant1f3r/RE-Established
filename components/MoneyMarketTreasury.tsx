import React, { useState, useEffect } from 'react';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { BtcIcon } from './icons/BtcIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

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

const MOCK_BTC_PRICE = 68000;
const MOCK_METAL_PRICE = 2300; // per Oz

const conversionSteps = [
    'Establishing secure channel with KR0M3D1A Vault...',
    'Validating asset availability with custodian...',
    'Executing trade on decentralized exchange...',
    'Confirming transaction on-chain (1/3)...',
    'Updating treasury balances...'
];

const StepSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ConversionProgressIndicator: React.FC<{ currentStep: number; error?: string; onRetry: () => void; }> = ({ currentStep, error, onRetry }) => {
    return (
        <div className="font-mono text-sm bg-gray-900/50 p-4 rounded-md border border-gray-700 h-full flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-center text-cyan-300 mb-4">Conversion in Progress...</h4>
            <div className="space-y-2">
                {conversionSteps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = currentStep > stepNumber;
                    const isCurrent = currentStep === stepNumber && !error;
                    const hasFailedAtThisStep = currentStep === stepNumber && !!error;
                    
                    return (
                        <div key={index} className="flex items-center gap-3 animate-fade-in-right" style={{ animationDelay: `${index * 100}ms`}}>
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                {hasFailedAtThisStep ? <XCircleIcon className="w-5 h-5 text-red-400" /> : 
                                isCompleted ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : 
                                isCurrent ? <StepSpinner /> : 
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                }
                            </div>
                            <span className={`transition-colors ${isCompleted ? 'text-gray-500 line-through' : isCurrent ? 'text-cyan-300 font-bold' : hasFailedAtThisStep ? 'text-red-400 font-bold' : 'text-gray-600'}`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>

            {error && (
                <div className="mt-4 bg-red-900/30 border border-red-500/50 p-3 rounded-md text-center">
                    <p className="font-bold text-red-300">Conversion Failed</p>
                    <p className="text-xs text-red-200 mt-1">{error}</p>
                    <button
                        onClick={onRetry}
                        className="mt-3 flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        Acknowledge & Reset
                    </button>
                </div>
            )}
        </div>
    );
};


export const MoneyMarketTreasury: React.FC<MoneyMarketTreasuryProps> = ({ courtTreasury }) => {
    const [assets, setAssets] = useState({
        crypto: 125.5, // BTC
        metals: 5000, // Ounces
    });
    const [localCourtTreasury, setLocalCourtTreasury] = useState(courtTreasury);
    const [conversion, setConversion] = useState({ amount: '', from: 'crypto', to: 'usd' });
    const [transactions, setTransactions] = useState<string[]>([]);
    
    // Conversion process state
    const [isConverting, setIsConverting] = useState(false);
    const [conversionProgress, setConversionProgress] = useState<number>(0);
    const [conversionError, setConversionError] = useState('');
    
    useEffect(() => {
        setLocalCourtTreasury(courtTreasury);
        setTransactions(['Initial Balance Loaded.']);
    }, [courtTreasury]);

    const handleConversionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConversion({ ...conversion, [e.target.name]: e.target.value });
    };
    
    const handleReset = () => {
        setIsConverting(false);
        setConversionProgress(0);
        setConversionError('');
        setConversion({ amount: '', from: 'crypto', to: 'usd' });
    };

    const handleExecuteConversion = async () => {
        setConversionError('');
        const amount = parseFloat(conversion.amount);

        // 1. Validation
        if (!amount || amount <= 0) {
            setConversionError("Amount must be a positive number.");
            return;
        }
        if (conversion.from === conversion.to) {
            setConversionError("Cannot convert an asset to itself.");
            return;
        }

        let hasSufficientFunds = false;
        if (conversion.from === 'crypto') hasSufficientFunds = amount <= assets.crypto;
        if (conversion.from === 'metals') hasSufficientFunds = amount <= assets.metals;
        if (conversion.from === 'usd') hasSufficientFunds = amount <= localCourtTreasury;

        if (!hasSufficientFunds) {
            const balance = conversion.from === 'crypto' ? `${assets.crypto.toFixed(4)} BTC` 
                          : conversion.from === 'metals' ? `${assets.metals.toLocaleString()} Oz` 
                          : `$${localCourtTreasury.toLocaleString()}`;
            setConversionError(`Insufficient funds. You only have ${balance}.`);
            return;
        }

        // 2. Start Conversion Process
        setIsConverting(true);

        try {
            for (let i = 0; i < conversionSteps.length; i++) {
                setConversionProgress(i + 1);
                await new Promise(res => setTimeout(res, 800)); // Simulate network delay
            }

            // 3. Update Balances (Simulated)
            let usdValue = 0;
            if (conversion.from === 'crypto') usdValue = amount * MOCK_BTC_PRICE;
            if (conversion.from === 'metals') usdValue = amount * MOCK_METAL_PRICE;
            if (conversion.from === 'usd') usdValue = amount;

            // Decrease 'from' balance
            if (conversion.from === 'crypto') setAssets(prev => ({ ...prev, crypto: prev.crypto - amount }));
            if (conversion.from === 'metals') setAssets(prev => ({ ...prev, metals: prev.metals - amount }));
            if (conversion.from === 'usd') setLocalCourtTreasury(prev => prev - amount);
            
            // Increase 'to' balance
            if (conversion.to === 'crypto') setAssets(prev => ({ ...prev, crypto: prev.crypto + (usdValue / MOCK_BTC_PRICE) }));
            if (conversion.to === 'metals') setAssets(prev => ({ ...prev, metals: prev.metals + (usdValue / MOCK_METAL_PRICE) }));
            if (conversion.to === 'usd') setLocalCourtTreasury(prev => prev + usdValue);
            
            // 4. Log and Reset
            const newTransaction = `[SUCCESS] Converted ${amount.toLocaleString()} ${conversion.from.toUpperCase()} to ${conversion.to.toUpperCase()}.`;
            setTransactions(prev => [newTransaction, ...prev.slice(0, 10)]);
            setTimeout(handleReset, 2000); // Show success for a moment before resetting

        } catch (e: any) {
            const errorMessage = e.message || 'An unknown network error occurred.';
            setConversionError(errorMessage);
            setTransactions(prev => [`[ERROR] Conversion failed: ${errorMessage}`, ...prev.slice(0, 10)]);
        }
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
                <AssetCard icon={<BuildingLibraryIcon className="w-8 h-8"/>} label="Court Treasury" value={localCourtTreasury} unit="USD/TRIBUNALS" />
                <AssetCard icon={<BtcIcon className="w-8 h-8"/>} label="Crypto Holdings" value={assets.crypto} unit="BTC" />
                <AssetCard icon={<DiamondIcon className="w-8 h-8"/>} label="Digital Metals Reserve" value={assets.metals} unit="Oz" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Conversion Interface */}
                <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[300px] flex flex-col">
                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-3 mb-4">
                        <ArrowsRightLeftIcon className="w-6 h-6 text-purple-400"/>
                        Asset Conversion
                    </h3>
                    {isConverting ? (
                        <ConversionProgressIndicator currentStep={conversionProgress} error={conversionError} onRetry={handleReset} />
                    ) : (
                        <div className="space-y-4">
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
                             {conversionError && <p className="text-sm text-red-400 text-center bg-red-900/20 p-2 rounded-md">{conversionError}</p>}
                            <button onClick={handleExecuteConversion} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">
                                Execute Conversion
                            </button>
                        </div>
                    )}
                </div>

                {/* Transaction Log */}
                <div className="lg:col-span-3 bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm h-72 flex flex-col">
                    <h3 className="text-cyan-400 mb-2 flex-shrink-0">[TRANSACTION LOG]</h3>
                    <div className="overflow-y-auto flex-grow">
                        {transactions.map((entry, index) => {
                            const color = entry.startsWith('[SUCCESS]') ? 'text-green-400' : entry.startsWith('[ERROR]') ? 'text-red-400' : 'text-gray-400';
                            return (
                                <p key={index} className={`whitespace-pre-wrap animate-fade-in-right ${color}`}>
                                    <span className="text-gray-500 mr-2">&gt;</span>{entry}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};
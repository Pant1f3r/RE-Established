
import React, { useState, useEffect } from 'react';
import { DiamondIcon } from './icons/DiamondIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';

const StatCard: React.FC<{ label: string; value: string; unit?: string }> = ({ label, value, unit }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 text-center">
        <p className="text-xs uppercase text-gray-400 tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-cyan-400 font-mono">{value} {unit && <span className="text-base text-gray-500">{unit}</span>}</p>
    </div>
);

const Deposit: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => (
    <div className="absolute w-2 h-2" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}>
        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute inset-0 bg-purple-400 rounded-full"></div>
    </div>
);

export const PreciousMetalsDigitalMining: React.FC = () => {
    const [deposits, setDeposits] = useState<{ x: number; y: number; delay: number }[]>([]);
    const [stats, setStats] = useState({ found: 0, value: 0, fees: 0 });
    const [logs, setLogs] = useState<string[]>(['[SYSTEM] Digital Prospector Protocol Initialized.']);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (!isScanning) return;
        
        const scanInterval = setInterval(() => {
            const newX = Math.random() * 98;
            const newY = Math.random() * 98;
            setDeposits(prev => [...prev, { x: newX, y: newY, delay: 0 }]);
            
            const foundValue = Math.random() * 1500;
            const liquidatedFees = foundValue * 0.05;
            setStats(prev => ({
                found: prev.found + 1,
                value: prev.value + foundValue,
                fees: prev.fees + liquidatedFees,
            }));
            setLogs(prev => [`[DEPOSIT FOUND] Estimated value: $${foundValue.toFixed(2)}. Liquidated gas fees: $${liquidatedFees.toFixed(2)}`, ...prev.slice(0, 10)]);

        }, 3000);

        return () => clearInterval(scanInterval);

    }, [isScanning]);

    const handleToggleScan = () => {
        setIsScanning(!isScanning);
        if (!isScanning) {
            setLogs(prev => ['[SYSTEM] Initiating scan for digital mineral deposits...', ...prev.slice(0, 10)]);
        } else {
            setLogs(prev => ['[SYSTEM] Scan paused.', ...prev.slice(0, 10)]);
            setDeposits([]); // Clear deposits on stop
        }
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <DiamondIcon className="w-8 h-8 text-purple-400" />
                    Precious Metals & Stones Digital Mining
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    This KR0M3D1A Bank subsidiary liquidates surplus gas fees to fund digital prospecting operations, searching for tokenized precious metals, stones, and other mineral assets to be accrued and converted to USD.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Deposits Found" value={stats.found.toString()} />
                <StatCard label="Estimated Value" value={`$${stats.value.toLocaleString('en-US', {minimumFractionDigits: 2})}`} />
                <StatCard label="Gas Fees Liquidated" value={`$${stats.fees.toLocaleString('en-US', {minimumFractionDigits: 2})}`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[400px]">
                {/* Visualization */}
                <div className="lg:col-span-3 bg-black border border-gray-700 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-cyan opacity-10"></div>
                    {deposits.map((d, i) => <Deposit key={i} {...d} />)}
                    <button onClick={handleToggleScan} className={`absolute top-4 left-4 px-4 py-2 text-sm font-semibold text-white rounded-md ${isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-600 hover:bg-cyan-700'}`}>
                        {isScanning ? 'Pause Scan' : 'Start Scan'}
                    </button>
                </div>

                {/* Log */}
                <div className="lg:col-span-2 bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm h-full flex flex-col">
                    <h3 className="text-cyan-400 mb-2 flex-shrink-0">[PROSPECTOR LOG]</h3>
                    <div className="overflow-y-auto flex-grow">
                        {logs.map((entry, index) => (
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

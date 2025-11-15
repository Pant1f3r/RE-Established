import React, { useState, useEffect } from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { BtcIcon } from './icons/BtcIcon';
import { DiamondIcon } from './icons/DiamondIcon';
import { HeartIcon } from './icons/HeartIcon';

const AllocationPieChart: React.FC<{ data: { name: string, value: number, color: string }[] }> = ({ data }) => {
    const size = 180;
    const center = size / 2;
    const radius = size / 2 - 10;
    let startAngle = -Math.PI / 2;

    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {data.map((slice, index) => {
                const angle = (slice.value / total) * 2 * Math.PI;
                const endAngle = startAngle + angle;

                const x1 = center + radius * Math.cos(startAngle);
                const y1 = center + radius * Math.sin(startAngle);
                const x2 = center + radius * Math.cos(endAngle);
                const y2 = center + radius * Math.sin(endAngle);

                const largeArcFlag = angle > Math.PI ? 1 : 0;
                
                const pathData = [
                    `M ${center},${center}`,
                    `L ${x1},${y1}`,
                    `A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`,
                    'Z'
                ].join(' ');

                startAngle = endAngle;

                return <path key={index} d={pathData} fill={slice.color} className="transition-all duration-300 ease-in-out hover:opacity-80"><title>{`${slice.name}: ${slice.value}%`}</title></path>;
            })}
        </svg>
    );
};

const TransactionLog: React.FC<{ logs: { id: number, message: string, value: string }[] }> = ({ logs }) => {
    return (
        <div className="h-full overflow-y-auto pr-2">
            {logs.map(log => (
                <div key={log.id} className="font-mono text-xs border-b border-gray-700/50 py-2 animate-fade-in-right">
                    <p className="text-gray-300">{log.message}</p>
                    <p className={`text-right font-bold ${log.value.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{log.value}</p>
                </div>
            ))}
        </div>
    )
};

export const FinancialCommandCenter: React.FC = () => {
    const [totalValue, setTotalValue] = useState(150.5 * 1e6);
    const [allocation] = useState([
        { name: 'Treasury', value: 60, color: '#06b6d4' }, // cyan-500
        { name: 'Crypto', value: 30, color: '#f7931a' }, // btc orange
        { name: 'Metals', value: 10, color: '#a855f7' }  // purple-500
    ]);
    const [logs, setLogs] = useState<{ id: number, message: string, value: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalValue(prev => prev + (Math.random() - 0.45) * 500000);
            
            const logTypes = [
                { msg: 'Asset Conversion: BTC to TRIBUNALS', val: `+${(Math.random() * 50000).toFixed(2)}` },
                { msg: 'Philanthropic Distribution Executed', val: `-${(Math.random() * 10000).toFixed(2)}` },
                { msg: 'Custodial Asset Recovery Yield', val: `+${(Math.random() * 25000).toFixed(2)}` },
                { msg: 'Digital Metals Liquidation', val: `+${(Math.random() * 15000).toFixed(2)}` },
            ];
            const newLog = logTypes[Math.floor(Math.random() * logTypes.length)];
            setLogs(prev => [{ id: Date.now(), ...newLog }, ...prev.slice(0, 20)]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const allocationsWithValue = [
        { name: 'Money Market & Treasury', value: totalValue * (allocation[0].value / 100), icon: <BuildingLibraryIcon className="w-6 h-6 text-cyan-400"/> },
        { name: 'Custodial Asset Recovery', value: totalValue * (allocation[1].value / 100), icon: <BtcIcon className="w-6 h-6 text-yellow-400"/> },
        { name: 'Digital Metals Mining', value: totalValue * (allocation[2].value / 100), icon: <DiamondIcon className="w-6 h-6 text-purple-400"/> },
        { name: 'Philanthropic Yield (Sim.)', value: totalValue * 0.05, icon: <HeartIcon className="w-6 h-6 text-pink-400"/> },
    ];

    return (
        <main className="mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <ChartBarIcon className="w-8 h-8 text-cyan-400" />
                    Financial Command Center
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Centralized command center for the KR0M3D1A digital banking division, providing a real-time overview of all financial operations.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
                <div className="text-center">
                    <p className="text-sm uppercase text-gray-400">Total Asset Value Under Management</p>
                    <p className="text-5xl font-bold text-yellow-400 text-glow-btc font-mono">${(totalValue / 1e6).toFixed(2)}M</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-2">
                        <h3 className="font-semibold text-gray-200 mb-2">Asset Allocation</h3>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 h-64 flex items-center justify-center">
                            <AllocationPieChart data={allocation} />
                        </div>
                    </div>
                     <div className="lg:col-span-3">
                        <h3 className="font-semibold text-gray-200 mb-2">Divisional Holdings</h3>
                        <div className="space-y-3">
                            {allocationsWithValue.map(item => (
                                <div key={item.name} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
                                    {item.icon}
                                    <span>{item.name}</span>
                                    <span className="ml-auto font-mono text-gray-200">${(item.value / 1e6).toFixed(2)}M</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-200 mb-2">Live Transaction Feed</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 h-64">
                        <TransactionLog logs={logs} />
                    </div>
                </div>
            </div>
        </main>
    );
};

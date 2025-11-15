import React, { useMemo } from 'react';
import { Anomaly, AnomalySeverity } from '../services/types';

interface AnomalySeverityChartProps {
    anomalies: Anomaly[];
}

export const AnomalySeverityChart: React.FC<AnomalySeverityChartProps> = ({ anomalies }) => {
    const severityOrder: AnomalySeverity[] = ['Critical', 'High', 'Medium', 'Low'];
    
    const severityCounts = useMemo(() => {
        const counts: { [key in AnomalySeverity]: number } = {
            'Critical': 0,
            'High': 0,
            'Medium': 0,
            'Low': 0,
        };
        anomalies.forEach(anomaly => {
            if (anomaly.severity) {
                counts[anomaly.severity]++;
            }
        });
        return counts;
    }, [anomalies]);

    const maxCount = Math.max(...(Object.values(severityCounts) as number[]), 1);

    const colorMap: { [key in AnomalySeverity]: string } = {
        'Critical': 'bg-red-500',
        'High': 'bg-orange-500',
        'Medium': 'bg-yellow-500',
        'Low': 'bg-green-500',
    };

    return (
        <div className="w-full h-full flex flex-col font-mono text-xs">
            <div className="flex-grow grid grid-cols-4 gap-4 items-end">
                {severityOrder.map((severity, index) => {
                    const count = severityCounts[severity];
                    const heightPercentage = (count / maxCount) * 100;

                    return (
                        <div key={severity} className="flex flex-col items-center justify-end h-full">
                             <div 
                                className={`w-full ${colorMap[severity]} rounded-t-md bar-animated`}
                                style={{ height: `${heightPercentage}%`, animationDelay: `${index * 100}ms` }}
                                title={`${severity}: ${count}`}
                            >
                                <div className="text-center font-bold text-white text-sm pt-1">{count > 0 ? count : ''}</div>
                             </div>
                        </div>
                    );
                })}
            </div>
             <div className="grid grid-cols-4 gap-4 mt-2 text-center text-gray-400">
                {severityOrder.map(severity => (
                    <span key={severity}>{severity}</span>
                ))}
            </div>
        </div>
    );
};

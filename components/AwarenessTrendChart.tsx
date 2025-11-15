
import React from 'react';
import { AwarenessDataPoint } from '../services/types';

interface AwarenessTrendChartProps {
    history: AwarenessDataPoint[];
}

export const AwarenessTrendChart: React.FC<AwarenessTrendChartProps> = ({ history }) => {
    const data = history.length > 1 ? history : [{ timestamp: Date.now() - 10000, value: 0 }, ...history];

    const svgWidth = 500;
    const svgHeight = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const maxVal = 100;
    const minVal = 0;
    
    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;
    const timeRange = maxTime - minTime > 0 ? maxTime - minTime : 1;

    const getX = (timestamp: number) => margin.left + ((timestamp - minTime) / timeRange) * chartWidth;
    const getY = (d: number) => margin.top + chartHeight - ((d - minVal) / (maxVal - minVal)) * chartHeight;

    // Helper to generate a smooth Catmull-Rom spline path
    const createSmoothPath = (dataPoints: { x: number, y: number }[]) => {
        if (dataPoints.length < 2) return '';
        let path = `M ${dataPoints[0].x} ${dataPoints[0].y}`;
        for (let i = 0; i < dataPoints.length - 1; i++) {
            const p0 = i > 0 ? dataPoints[i - 1] : dataPoints[0];
            const p1 = dataPoints[i];
            const p2 = dataPoints[i + 1];
            const p3 = i < dataPoints.length - 2 ? dataPoints[i + 2] : p2;
            
            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;
            
            path += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
        }
        return path;
    };
    
    const pointsForPath = data.map(d => ({ x: getX(d.timestamp), y: getY(d.value) }));
    const linePathData = createSmoothPath(pointsForPath);
    const areaPathData = `${linePathData} L ${getX(maxTime)},${getY(minVal)} L ${getX(minTime)},${getY(minVal)} Z`;
    
    const yAxisTicks = [0, 25, 50, 75, 100];

    return (
        <div className="w-full h-full flex items-center justify-center font-mono text-xs">
             <svg key={data.map(d => d.value).join(',')} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
                <g className="text-gray-400 dark:text-gray-500">
                    {/* Y-axis with ticks and grid lines */}
                    {yAxisTicks.map(tick => (
                        <g key={tick} transform={`translate(0, ${getY(tick)})`}>
                            <text x={margin.left - 5} y="3" textAnchor="end" className="fill-current">
                                {tick}%
                            </text>
                             <line
                                x1={margin.left}
                                x2={svgWidth - margin.right}
                                stroke="currentColor"
                                strokeWidth="0.5"
                                strokeDasharray="2,3"
                                opacity="0.5"
                            />
                        </g>
                    ))}
                     {/* X-axis time labels */}
                     <text x={margin.left} y={svgHeight - margin.bottom + 15} textAnchor="start" className="fill-current">Start</text>
                     <text x={svgWidth - margin.right} y={svgHeight - margin.bottom + 15} textAnchor="end" className="fill-current">Now</text>
                </g>
                <defs>
                    <linearGradient id="awarenessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                </defs>
                 <path
                    className="chart-area-animated"
                    d={areaPathData}
                    fill="url(#awarenessGradient)"
                />
                <path
                    className="chart-line-animated"
                    d={linePathData}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

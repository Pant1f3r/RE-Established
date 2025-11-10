import React, { useState, useEffect } from 'react';
import { ShieldCheckmarkIcon } from './icons/ShieldCheckmarkIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { GeoAnalysisResult } from '../services/types';
import { LinkIcon } from './icons/LinkIcon';
import { WorldMap } from './icons/WorldMap';
import { XCircleIcon } from './icons/XCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface SecureGeospatialLinkProps {
    onTriangulate: (latitude: number, longitude: number) => void;
    onQuery: (query: string) => void;
    isLoading: boolean;
    result: GeoAnalysisResult | null;
    error: string;
}

const pointsOfInterest = [
    { name: 'Area 51, Nevada, USA', x: 240, y: 165 },
    { name: 'Bermuda Triangle', x: 340, y: 200 },
    { name: 'Cheyenne Mountain Complex, USA', x: 280, y: 160 },
    { name: 'Pine Gap, Australia', x: 980, y: 360 },
    { name: 'Svalbard Global Seed Vault, Norway', x: 590, y: 90 },
];

const ConnectionStatus: React.FC = () => {
    const [status, setStatus] = useState('Initializing...');
    const [protocol, setProtocol] = useState<string | null>(null);
    const [cipher, setCipher] = useState<string | null>(null);
    const [cert, setCert] = useState<string | null>(null);

    useEffect(() => {
        const timer1 = setTimeout(() => setStatus('Performing TLS Handshake...'), 500);
        const timer2 = setTimeout(() => {
            setStatus('Establishing Secure Channel...');
            setProtocol('TLS 1.3');
        }, 1500);
        const timer3 = setTimeout(() => {
            setCipher('TLS_AES_256_GCM_SHA384');
        }, 2000);
        const timer4 = setTimeout(() => {
            setCert('KR0M3D1A Global Root CA');
            setStatus('Connection Secured & Encrypted');
        }, 2800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    const isSecure = status === 'Connection Secured & Encrypted';

    return (
        <div className={`p-4 rounded-lg border ${isSecure ? 'border-green-500/50 bg-green-900/20' : 'border-gray-700 bg-gray-900/50'}`}>
            <h4 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <ShieldCheckmarkIcon className={`w-5 h-5 ${isSecure ? 'text-green-400' : 'text-gray-500'}`} />
                SSL/TLS Connection Status
            </h4>
            <div className="font-mono text-sm space-y-1">
                <p><span className="text-gray-400">Status:</span> <span className={isSecure ? 'text-green-300' : 'text-yellow-400'}>{status}</span></p>
                {protocol && <p className="animate-fade-in-right"><span className="text-gray-400">Protocol:</span> {protocol}</p>}
                {cipher && <p className="animate-fade-in-right"><span className="text-gray-400">Cipher Suite:</span> {cipher}</p>}
                {cert && <p className="animate-fade-in-right"><span className="text-gray-400">Certificate:</span> {cert}</p>}
            </div>
        </div>
    );
};

const InfoPanel: React.FC<{ analysis: GeoAnalysisResult, target: string, onClose: () => void }> = ({ analysis, target, onClose }) => (
    <div className="map-info-panel absolute top-0 right-0 h-full w-full md:w-1/3 bg-gray-900/80 backdrop-blur-sm border-l border-gray-700 p-4 overflow-y-auto">
        <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold text-cyan-400">Tactical Overview: {target}</h4>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
                <XCircleIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="mt-4 font-mono text-sm space-y-4">
            <div className="whitespace-pre-wrap text-gray-300 bg-black/30 p-3 rounded-md">{analysis.analysis}</div>
            {analysis.sources.length > 0 && (
                <div className="pt-4 border-t border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-2">Grounding Sources (Google Maps):</h5>
                    <div className="space-y-2">
                        {analysis.sources.map((source, index) => (
                            <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors">
                                <LinkIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <p className="text-sm text-blue-300 font-semibold">{source.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);


export const SecureGeospatialLink: React.FC<SecureGeospatialLinkProps> = ({ onTriangulate, onQuery, isLoading, result, error }) => {
    const [selectedPoint, setSelectedPoint] = useState<(typeof pointsOfInterest[0]) | null>(null);
    const [locationError, setLocationError] = useState('');

    const handlePointClick = (point: typeof pointsOfInterest[0]) => {
        setSelectedPoint(point);
        onQuery(point.name);
    };

    const handleTriangulate = () => {
        setSelectedPoint(null);
        setLocationError('');
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onTriangulate(latitude, longitude);
            },
            (err) => {
                setLocationError(`Failed to get location: ${err.message}`);
            }
        );
    };
    
    const handleClosePanel = () => {
        setSelectedPoint(null);
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                 <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <GlobeIcon className="w-8 h-8 text-cyan-400" />
                    Secure Geospatial Link (SGL)
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Establish an encrypted channel and perform tactical analysis on points of interest via real-time network transmissions, grounded by the KR0M3D1A protocol's geospatial intelligence layer.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                    <ConnectionStatus />
                     <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-200 mb-3">Target Selection</h4>
                         <div className="space-y-2">
                            <p className="text-xs text-gray-400">Select a point of interest on the map or use your device's current location.</p>
                            <button
                                onClick={handleTriangulate}
                                disabled={isLoading}
                                className="w-full px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-600"
                            >
                                Triangulate Acute Location
                            </button>
                            {locationError && <p className="mt-2 text-xs text-red-400 text-center">{locationError}</p>}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 h-[450px] bg-gray-900 border border-gray-700 rounded-lg p-2 relative">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <svg viewBox="0 0 1200 600" className="w-full h-full">
                            <WorldMap />
                            {pointsOfInterest.map(point => (
                                <circle
                                    key={point.name}
                                    cx={point.x}
                                    cy={point.y}
                                    r="6"
                                    strokeWidth="2"
                                    className={`detection-point transition-all ${
                                        selectedPoint?.name === point.name ? 'fill-yellow-400 stroke-yellow-200' : 'fill-cyan-500 stroke-cyan-300'
                                    } ${isLoading ? 'disabled' : ''} default-pulse`}
                                    onClick={() => handlePointClick(point)}
                                >
                                    <title>{point.name}</title>
                                </circle>
                            ))}
                        </svg>
                        
                        {isLoading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                <div className="text-center">
                                    <div className="w-12 h-12 border-4 border-t-cyan-400 border-gray-600 rounded-full animate-spin mx-auto"></div>
                                    <p className="mt-4 font-semibold text-cyan-300">Analyzing Target...</p>
                                </div>
                            </div>
                        )}

                        {result && selectedPoint && (
                            <InfoPanel analysis={result} target={selectedPoint.name} onClose={handleClosePanel} />
                        )}

                         {error && (
                            <div className="map-info-panel absolute top-0 right-0 h-full w-full md:w-1/3 bg-gray-900/80 backdrop-blur-sm border-l border-red-700 p-4">
                               <h4 className="text-lg font-bold text-red-400">Analysis Failed</h4>
                               <p className="text-red-300 mt-2">{error}</p>
                               <button onClick={handleClosePanel} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Close</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
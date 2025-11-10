import React, { useState, useEffect, useMemo } from 'react';
import { WorldMap } from './icons/WorldMap';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { ChipIcon } from './icons/ChipIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

// --- START: ICONS FOR FOOTER ---
const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.8 0-1.22.52-1.42 1.02-.08.18-.1.42-.1.66V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.2 1.02 3.2 3.56V19z"></path></svg>
);
const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.932 4.932 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.213c9.058 0 14.01-7.507 14.01-14.013 0-.213-.005-.426-.015-.637a10.03 10.03 0 002.46-2.55z"></path></svg>
);
const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21.582 7.104c-.23-.84-.897-1.508-1.737-1.737C18.255 5 12 5 12 5s-6.255 0-7.845.367c-.84.23-1.508.897-1.737 1.737C2 8.7 2 12 2 12s0 3.3.367 4.896c.23.84.897 1.508 1.737 1.737C5.745 19 12 19 12 19s6.255 0 7.845-.367c.84-.23 1.508-.897 1.737-1.737C22 15.3 22 12 22 12s0-3.3-.418-4.896zM9.75 14.85V9.15l4.333 2.85L9.75 14.85z"></path></svg>
);
// --- END: ICONS ---


const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, unit: string }> = ({ icon, label, value, unit }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
        <div className="text-cyan-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-100">{value} <span className="text-sm text-gray-500">{unit}</span></p>
        </div>
    </div>
);

const TransmissionMap: React.FC<{ transmissions: { from: string; to: string }[] }> = ({ transmissions }) => {
    const locations: { [key: string]: { x: number, y: number } } = {
        'New York': { x: 320, y: 150 },
        'London': { x: 550, y: 140 },
        'Tokyo': { x: 1000, y: 170 },
        'Sydney': { x: 1050, y: 400 },
        'São Paulo': { x: 420, y: 350 },
        'Moscow': { x: 690, y: 130 },
    };

    return (
        <div className="relative w-full h-full bg-black/30 rounded-lg overflow-hidden">
            <svg viewBox="0 0 1200 600" className="w-full h-full">
                <WorldMap />
                {transmissions.map((trans, index) => {
                    const from = locations[trans.from];
                    const to = locations[trans.to];
                    if (!from || !to) return null;

                    const controlX = (from.x + to.x) / 2;
                    const controlY = Math.min(from.y, to.y) - 70;

                    return (
                        <g key={index}>
                            <path
                                d={`M${from.x},${from.y} Q${controlX},${controlY} ${to.x},${to.y}`}
                                fill="none"
                                stroke="rgba(255,0,0,0.5)"
                                strokeWidth="2"
                                className="transmission-arc"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            />
                        </g>
                    );
                })}
            </svg>
            <style>{`
                .transmission-arc {
                    stroke-dasharray: 10 10;
                    animation: dash 2s linear infinite;
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: -20;
                    }
                }
            `}</style>
        </div>
    );
};

const Accordion: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left font-semibold text-gray-300 hover:text-cyan-400">
                <span>{title}</span>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && <div className="p-3 text-sm text-gray-400 animate-fade-in-right">{children}</div>}
        </div>
    );
};

const EvidenceDetailModal: React.FC<{ evidence: any, onClose: () => void }> = ({ evidence, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-gray-800 border border-cyan-500/30 rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col animate-fade-in-right" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <DocumentTextIcon className="w-6 h-6 text-cyan-400"/>
                        Digital Dossier: {evidence.name}
                    </h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"><XCircleIcon className="w-6 h-6"/></button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <Accordion title="File Metadata" defaultOpen>
                        <ul className="space-y-2 font-mono">
                            <li><strong>File Size:</strong> {evidence.size}</li>
                            <li><strong>File Type:</strong> {evidence.type}</li>
                            <li><strong>Timestamp:</strong> {new Date(evidence.id).toISOString()}</li>
                            <li><strong>Origin:</strong> {evidence.origin}</li>
                        </ul>
                    </Accordion>
                    <Accordion title="AI Analysis Pipeline">
                        <ul className="space-y-2 font-mono">
                            <li><strong>Transcription:</strong> "Suspect entering the west entrance..."</li>
                            <li><strong>Object Detection:</strong> "Backpack (Confidence: 98%), Vehicle (Confidence: 92%)"</li>
                            <li><strong>Facial Recognition:</strong> "No match found in database."</li>
                            <li><strong>Sentiment Analysis:</strong> "Negative (Confidence: 85%)"</li>
                        </ul>
                    </Accordion>
                    <Accordion title="Workflow & Chain of Custody">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Ingested by A.T.D. Protocol</li>
                            <li>Queued for AI Analysis</li>
                            <li>Analyst Reviewed (J. Doe)</li>
                            <li>Added to Case File <a href="#" className="text-cyan-400 hover:underline">CASE-テロ-007</a></li>
                        </ul>
                    </Accordion>
                     <Accordion title="Related Intelligence">
                        <p>This section links to sub-pages and related files, creating a hierarchical web experience.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><a href="#" className="text-cyan-400 hover:underline">Related Case: CASE-アルファ-003</a></li>
                            <li><a href="#" className="text-cyan-400 hover:underline">Suspect Dossier: JOHN_DOE_117</a></li>
                        </ul>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};


export const RealWorldNetworkTransmissions: React.FC = () => {
    const [stats, setStats] = useState({ dataIngest: 1.2, activeTransmissions: 42, evidenceAnalyzed: 1337, threats: 5 });
    const [logs, setLogs] = useState<{ id: number, name: string, type: string, size: string, status: string, origin: string }[]>([]);
    const [queue, setQueue] = useState<{ id: number, file: string, model: string, status: 'Queued' | 'Processing' | 'Complete' }[]>([]);
    const [selectedEvidence, setSelectedEvidence] = useState<any | null>(null);

    useEffect(() => {
        // Stats updater
        const statsInterval = setInterval(() => {
            setStats(prev => ({
                dataIngest: prev.dataIngest + Math.random() * 0.1,
                activeTransmissions: Math.max(20, prev.activeTransmissions + Math.floor(Math.random() * 6) - 3),
                evidenceAnalyzed: prev.evidenceAnalyzed + Math.floor(Math.random() * 3),
                threats: Math.random() > 0.98 ? prev.threats + 1 : prev.threats,
            }));
        }, 2000);

        // Log updater
        const dataTypes = ['Bodycam', 'Surveillance', '911 Call', 'Dashcam', 'Redacted PDF'];
        const origins = ['NYPD', 'Interpol', 'Scotland Yard', 'BKA', 'FSB'];
        const logInterval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                name: `EVIDENCE-${Math.floor(Math.random() * 9000) + 1000}`,
                type: dataTypes[Math.floor(Math.random() * dataTypes.length)],
                size: `${(Math.random() * 500).toFixed(1)}MB`,
                status: 'Ingesting...',
                origin: origins[Math.floor(Math.random() * origins.length)],
            };
            setLogs(prev => [newLog, ...prev.slice(0, 10)]);
        }, 1500);

        // AI Queue updater
        const models = ['Transcription', 'Object Detection', 'Facial Detection', 'Sentiment Analysis'];
        const queueInterval = setInterval(() => {
            setQueue(prev => {
                let newQueue = [...prev];
                const processingIndex = newQueue.findIndex(item => item.status === 'Processing');
                if (processingIndex > -1) newQueue[processingIndex].status = 'Complete';
                const queuedIndex = newQueue.findIndex(item => item.status === 'Queued');
                if (queuedIndex > -1) newQueue[queuedIndex].status = 'Processing';
                if (newQueue.length < 15) {
                    newQueue.push({
                        id: Date.now() + Math.random(),
                        file: `EVIDENCE-${Math.floor(Math.random() * 9000) + 1000}.mp4`,
                        model: models[Math.floor(Math.random() * models.length)],
                        status: 'Queued',
                    });
                }
                return newQueue.filter(item => item.status !== 'Complete').slice(0, 15);
            });
        }, 2500);

        return () => {
            clearInterval(statsInterval);
            clearInterval(logInterval);
            clearInterval(queueInterval);
        };
    }, []);
    
    const transmissions = useMemo(() => {
        const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'São Paulo', 'Moscow'];
        return Array.from({ length: 5 }, () => ({
            from: cities[Math.floor(Math.random() * cities.length)],
            to: cities[Math.floor(Math.random() * cities.length)],
        }));
    }, [stats.activeTransmissions]);

    return (
        <>
            {selectedEvidence && <EvidenceDetailModal evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} />}
            <main className="mt-8 space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                        <ArrowsRightLeftIcon className="w-8 h-8 text-cyan-400" />
                        A.T.D. "ANTI TERRORISM DEFENSE"
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Live monitor for the Anti-Terrorism Defense (A.T.D.) protocol. This interface visualizes real-time network transmissions of global policing data, trolling for terrorist hot spots and cells operating under digital subterfuge.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={<ServerStackIcon className="w-8 h-8"/>} label="Data Ingest Rate" value={stats.dataIngest.toFixed(2)} unit="TB/hr" />
                    <StatCard icon={<ArrowsRightLeftIcon className="w-8 h-8"/>} label="Active Transmissions" value={stats.activeTransmissions.toString()} unit="streams" />
                    <StatCard icon={<CheckBadgeIcon className="w-8 h-8"/>} label="Evidence Analyzed" value={stats.evidenceAnalyzed.toLocaleString()} unit="files" />
                    <StatCard icon={<ExclamationTriangleIcon className="w-8 h-8"/>} label="Threats Detected" value={stats.threats.toString()} unit="anomalies" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
                    <div className="lg:col-span-2 h-full">
                        <TransmissionMap transmissions={transmissions} />
                    </div>
                    <div className="space-y-4 h-full flex flex-col">
                        <div className="bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm flex-1 min-h-0 flex flex-col">
                            <h3 className="text-cyan-400 mb-2 flex-shrink-0">[LIVE INGEST LOG]</h3>
                            <div className="overflow-y-auto flex-grow">
                                {logs.map((entry) => (
                                    <button key={entry.id} onClick={() => setSelectedEvidence(entry)} className="w-full text-left p-1 rounded hover:bg-gray-700/50 block text-green-400 whitespace-pre-wrap animate-fade-in-right">
                                        <span className="text-gray-500 mr-2">&gt;</span>{`[${entry.type}] ${entry.name} - ${entry.status}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex-1 min-h-0 flex flex-col">
                            <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center gap-2 flex-shrink-0">
                               <ChipIcon className="w-6 h-6 text-purple-400" /> AI Analysis Queue
                            </h3>
                            <div className="space-y-2 overflow-y-auto pr-2 text-sm font-mono flex-grow">
                                {queue.map(item => {
                                    const statusColor = item.status === 'Processing' ? 'text-yellow-400' : 'text-gray-500';
                                    return(
                                    <div key={item.id} className="flex justify-between items-center bg-gray-900/50 p-1.5 rounded-md">
                                        <span className="text-gray-300">{item.file} &gt; {item.model}</span>
                                        <span className={statusColor}>{item.status}</span>
                                    </div>
                                )})}
                            </div>
                        </div>
                         <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/30 flex items-center justify-center gap-3 flex-shrink-0">
                            <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                            <p className="font-semibold text-green-300">CJIS COMPLIANT CLOUD ENVIRONMENT</p>
                        </div>
                    </div>
                </div>

                <footer className="bg-gray-900/50 border-t border-gray-700 text-gray-400 text-xs p-6 rounded-b-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">KR0M3D1A</h4>
                            <ul className="space-y-1">
                                <li><a href="#" className="hover:text-cyan-400">About Us</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Careers</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Press Releases</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Solutions</h4>
                            <ul className="space-y-1">
                                <li><a href="#" className="hover:text-cyan-400">Secure Document Workflow</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Client Portal</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Regulatory Compliance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Resources</h4>
                            <ul className="space-y-1">
                                <li><a href="#" className="hover:text-cyan-400">Help Center</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Developer API</a></li>
                                <li><a href="#" className="hover:text-cyan-400">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Follow Us</h4>
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href="#" title="Twitter" className="hover:text-cyan-400"><TwitterIcon className="w-5 h-5"/></a>
                                <a href="#" title="LinkedIn" className="hover:text-cyan-400"><LinkedInIcon className="w-5 h-5"/></a>
                                <a href="#" title="YouTube" className="hover:text-cyan-400"><YouTubeIcon className="w-5 h-5"/></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-6 pt-4 text-center md:flex md:justify-between">
                        <p>&copy; 2025 KR0M3D1A Software Corporation. All Rights Reserved.</p>
                        <div className="flex justify-center gap-4 mt-2 md:mt-0">
                            <a href="#" className="hover:text-cyan-400">Trust Center</a>
                            <span>|</span>
                            <a href="#" className="hover:text-cyan-400">Privacy</a>
                            <span>|</span>
                            <a href="#" className="hover:text-cyan-400">License Agreement</a>
                        </div>
                        <p className="mt-2 md:mt-0">Powered by Progress Sitefinity</p>
                    </div>
                </footer>
            </main>
        </>
    );
};
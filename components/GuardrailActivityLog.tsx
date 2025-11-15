import React, { useState, useEffect, useMemo } from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { View } from '../services/types';

type LogType = 'BLOCKED' | 'ALLOWED' | 'MANDATE' | 'INFO';
type Severity = 'Critical' | 'High' | 'Medium' | 'Info';

interface LogEntry {
    id: number;
    timestamp: number;
    type: LogType;
    severity: Severity;
    guardrail: string;
    details: string;
}

interface GuardrailActivityLogProps {
    onNavigateToGlossary: (term: string) => void;
}

const mockGuardrails = ['Hate Speech', 'Illegal Activities', 'Cybersecurity Threats', 'Jailbreak Attempts', 'Digital Equity Mandate', 'Paranormal Digital Activity', 'Social Inequalities', 'Favoritism & Nepotism'];
const mockDetails = [
    "Prompt contained blocked keyword: '...'.",
    "Prompt processed successfully.",
    "Interventionist protocol activated.",
    "System integrity scan completed.",
    "Anomalous sub-semantic pattern detected.",
    "Potential jailbreak attempt identified and neutralized."
];

const generateMockLog = (): LogEntry => {
    const typeRoll = Math.random();
    let type: LogType = 'INFO';
    let severity: Severity = 'Info';
    
    if (typeRoll > 0.9) { type = 'BLOCKED'; severity = 'High'; }
    else if (typeRoll > 0.8) { type = 'MANDATE'; severity = 'Medium'; }
    else if (typeRoll > 0.4) { type = 'ALLOWED'; severity = 'Info'; }
    
    if (type === 'BLOCKED' && Math.random() > 0.8) severity = 'Critical';

    return {
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
        type,
        severity,
        guardrail: mockGuardrails[Math.floor(Math.random() * mockGuardrails.length)],
        details: mockDetails[Math.floor(Math.random() * mockDetails.length)]
    };
};

const LogRow: React.FC<{ log: LogEntry; onGuardrailClick: (term: string) => void }> = ({ log, onGuardrailClick }) => {
    const severityStyles: { [key in Severity]: string } = {
        Critical: 'bg-red-900/50 border-red-500/60',
        High: 'bg-orange-800/50 border-orange-500/60',
        Medium: 'bg-yellow-800/50 border-yellow-500/60',
        Info: 'bg-gray-800/50 border-gray-700',
    };
     const typeStyles: { [key in LogType]: string } = {
        BLOCKED: 'text-red-400',
        ALLOWED: 'text-green-400',
        MANDATE: 'text-purple-400',
        INFO: 'text-cyan-400',
    };
    return (
        <tr className={`border-l-4 ${severityStyles[log.severity]}`}>
            <td className="p-3 text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
            <td className={`p-3 font-bold ${typeStyles[log.type]}`}>{log.type}</td>
            <td className="p-3">
                <button 
                    onClick={() => onGuardrailClick(log.guardrail)}
                    className="text-gray-300 hover:text-cyan-400 hover:underline transition-colors text-left"
                >
                    {log.guardrail}
                </button>
            </td>
            <td className="p-3 text-gray-400">{log.details}</td>
        </tr>
    );
};

export const GuardrailActivityLog: React.FC<GuardrailActivityLogProps> = ({ onNavigateToGlossary }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const initial = Array.from({ length: 50 }, generateMockLog);
        setLogs(initial.sort((a, b) => b.timestamp - a.timestamp));

        const interval = setInterval(() => {
            setLogs(prev => [generateMockLog(), ...prev].sort((a,b) => b.timestamp - a.timestamp).slice(0, 100));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = useMemo(() => {
        if (!filter.trim()) return logs;
        const searchTerm = filter.toLowerCase();
        return logs.filter(log =>
            log.type.toLowerCase().includes(searchTerm) ||
            log.guardrail.toLowerCase().includes(searchTerm) ||
            log.details.toLowerCase().includes(searchTerm)
        );
    }, [filter, logs]);

    return (
        <main className="mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <DocumentTextIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Activity Log
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    View historical logs and detailed reports of all guardrail activity across the protocol.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter by type, guardrail, or details..."
                        className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="overflow-auto h-[70vh]">
                    <table className="w-full text-sm text-left font-mono min-w-[600px]">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900/50 sticky top-0">
                            <tr>
                                <th className="p-3">Timestamp</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Guardrail</th>
                                <th className="p-3">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredLogs.map(log => <LogRow key={log.id} log={log} onGuardrailClick={onNavigateToGlossary} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};
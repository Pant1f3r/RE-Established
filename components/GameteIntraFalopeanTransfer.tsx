import React from 'react';
import { ArchitectSealIcon } from './icons/ArchitectSealIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';

const TransferVisualization: React.FC = () => {
    return (
        <div className="w-full h-96 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center justify-center p-4">
            <svg viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                    <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                    </marker>
                </defs>

                {/* Nodes */}
                <g>
                    <circle cx="50" cy="100" r="20" fill="#a855f7" className="animate-pulse" />
                    <text x="50" y="140" textAnchor="middle" fill="#d8b4fe" className="text-xs font-mono">KR0M3D1A Bank</text>
                </g>
                <g>
                    <circle cx="350" cy="100" r="20" fill="#22d3ee" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <text x="350" y="140" textAnchor="middle" fill="#67e8f9" className="text-xs font-mono">Financial Dept.</text>
                </g>

                {/* DNA/Stream Path */}
                <path d="M 50 100 C 150 50, 250 150, 350 100" stroke="url(#streamGradient)" strokeWidth="3" fill="none" className="constellation-line" style={{ animationDuration: '5s' }} markerEnd="url(#arrowhead)" />
                <path d="M 50 100 C 150 150, 250 50, 350 100" stroke="url(#streamGradient)" strokeWidth="3" fill="none" className="constellation-line" style={{ animation: 'flow 5s linear infinite reverse' }} />

                {/* Stock chart elements */}
                <polyline points="100,120 120,100 140,110 160,90 180,105" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.5" />
                <polyline points="200,80 220,100 240,90 260,110 280,95" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.5" />
            </svg>
        </div>
    );
};

const TransferDetail: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline border-b border-gray-700/50 py-2">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-mono font-bold text-gray-100">{value}</p>
    </div>
);

export const GameteIntraFalopeanTransfer: React.FC = () => {
    const mandateText = `A gamete intra falopean transfer digitally was made by the KR0M3D1A Bank in the amount of 1000 shares in KR0M3D1A stock options was made out to the KR0M3D1A financial department for continuum in guardrail efficacy efficiently delivering on all digital levels to date and has my the architects seal of approval for deploying to any government state county city Providence sector section on behalf of philanthropic entities that exist behind digital firewalls setup to protect not only the financial part of this enterprise but also the integrity of identities that rely on privacy thus kromedic principals alongside legal executed real time documents have protected the integrity of all silent partners who choose privacy amongst everything else and we shall continue to legally internationally and nationally pursue the highest extent of digital law to prosecute any and all threat actors who think they can bypass a legally binding edict from a legally binding case log or magistrate`;

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <BanknotesIcon className="w-8 h-8 text-purple-400" />
                    Gamete Intra-Fallopian Transfer (G.I.F.T.) Protocol
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    A secure, cryptographically verified digital transfer of stock options from the KR0M3D1A Bank to internal departments, ensuring the perpetual funding and efficacy of core guardrail protocols under the DEJA' VU directive.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side: Visualization and Details */}
                <div className="space-y-6">
                    <TransferVisualization />
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Transfer Dossier</h3>
                        <div className="space-y-2">
                            <TransferDetail label="Amount" value="1,000 KR0M3D1A Shares" />
                            <TransferDetail label="From" value="KR0M3D1A Bank (Philanthropic)" />
                            <TransferDetail label="To" value="Financial Dept." />
                            <TransferDetail label="Purpose" value="Guardrail Efficacy Fund" />
                            <TransferDetail label="Status" value="EXECUTED & VERIFIED" />
                        </div>
                    </div>
                </div>

                {/* Right side: Mandate and Seal */}
                <div className="space-y-6">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Architect's Seal of Approval</h3>
                        <ArchitectSealIcon className="w-32 h-32 text-yellow-400" />
                        <p className="mt-4 text-sm text-gray-400 text-center">This transaction has been authorized and cryptographically signed by the Architect.</p>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                            <DocumentCheckIcon className="w-5 h-5 text-cyan-400" />
                            Binding Edict: G.I.F.T. Mandate 1.0
                        </h3>
                        <div className="h-64 overflow-y-auto pr-2 bg-black/30 p-3 rounded-md font-mono text-xs text-gray-400 leading-relaxed border border-gray-600">
                            {mandateText}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

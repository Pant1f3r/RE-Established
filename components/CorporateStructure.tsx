import React, { useState } from 'react';
import { SitemapIcon } from './icons/SitemapIcon';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { ChipIcon } from './icons/ChipIcon';
import { FintechEdict } from './FintechEdict';

const OrgNode: React.FC<{ title: string, subtitle: string, icon: React.ReactNode, isParent?: boolean }> = ({ title, subtitle, icon, isParent }) => (
    <div className={`bg-gray-900/50 border ${isParent ? 'border-cyan-400 shadow-lg shadow-cyan-500/10' : 'border-gray-700'} rounded-lg p-4 flex items-center gap-4 text-left`}>
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md ${isParent ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-700/50 text-gray-400'}`}>
            {icon}
        </div>
        <div>
            <h4 className={`font-bold ${isParent ? 'text-cyan-300' : 'text-gray-100'}`}>{title}</h4>
            <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
    </div>
);

const RegulatoryItem: React.FC<{ acronym: string, name: string, description: string }> = ({ acronym, name, description }) => (
    <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700/50">
        <h5 className="font-bold text-gray-200 font-mono">{acronym} - <span className="text-purple-400">{name}</span></h5>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
);

export const CorporateStructure: React.FC = () => {
    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <SitemapIcon className="w-8 h-8 text-cyan-400" />
                    KR0M3D1A CORP: Corporate Structure & Legal Framework
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    An overview of the legal entities, divisions, and regulatory compliance framework governing the KR0M3D1A protocol and its financial operations.
                </p>
            </div>

            {/* Org Chart */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">Organizational Chart</h3>
                <div className="flex flex-col items-center gap-4">
                    <OrgNode title="KR0M3D1A CORP" subtitle="Alphanumeric Corporation & Private Bank" icon={<SitemapIcon className="w-6 h-6" />} isParent />
                    <div className="w-px h-8 bg-gray-600"></div>
                    <div className="w-full flex justify-center gap-8 flex-wrap">
                        <OrgNode title="Digital Banking Division" subtitle="Regulated Financial Services & Money Market" icon={<BuildingLibraryIcon className="w-6 h-6" />} />
                        <OrgNode title="Crypto Mining Division" subtitle="Asset Recovery & Yield Generation" icon={<ChipIcon className="w-6 h-6" />} />
                    </div>
                </div>
            </div>

            {/* Regulatory Framework */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Regulatory & Compliance Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RegulatoryItem acronym="FDIC" name="Federal Deposit Insurance Corporation" description="Ensures stability and public confidence in the financial system. Compliance is critical for any deposit-taking institution." />
                    <RegulatoryItem acronym="OCC" name="Office of the Comptroller of the Currency" description="Charters, regulates, and supervises all national banks and federal savings associations." />
                    <RegulatoryItem acronym="CFTC" name="Commodity Futures Trading Commission" description="Regulates derivative markets, which can include certain cryptocurrency products." />
                    <RegulatoryItem acronym="FinCEN" name="Financial Crimes Enforcement Network" description="Combats money laundering and financial crimes. Mandates strict reporting and monitoring." />
                    <RegulatoryItem acronym="BSA/AML" name="Bank Secrecy Act / Anti-Money Laundering" description="Requires financial institutions to assist government agencies in preventing and detecting money laundering." />
                    <RegulatoryItem acronym="KYC" name="Know Your Customer" description="A mandatory process of identifying and verifying the identity of clients to prevent fraud, corruption, and terrorism financing." />
                </div>
            </div>

            {/* AI Counsel replaced with Fintech Edict */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Foundational Fintech Edict</h3>
                <FintechEdict />
            </div>
        </main>
    );
};
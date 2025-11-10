import React, { useState, useEffect } from 'react';
import { GuardrailResult, SavedAnalysisReport } from '../services/types';
import { NeoIcon } from './NeoIcon';
import { CyberThreatscape } from './CyberThreatscape';
import { AnalysisHistory } from './AnalysisHistory';
import { UsersIcon } from './icons/UsersIcon';
import { PromptInput } from './PromptInput';

interface FinancialAnalysisProps {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
    error: string;
    analysisResult: string;
    guardrailResult: GuardrailResult | null;
    savedReports: SavedAnalysisReport[];
    onLoadReport: (id: number) => void;
    onDeleteReport: (id: number) => void;
}

const ResultParser: React.FC<{ text: string }> = ({ text }) => {
    // This is a simplified parser. A real implementation might be more robust.
    if (text.startsWith("Simulating financial threat analysis for:")) {
        return <p className="italic">{text}</p>;
    }
    
    const sectors = text.split('### ').filter(s => s.trim());

    const parseList = (rawText: string): string[] => {
        if (!rawText) return [];
        return rawText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s/.test(line))
            .map(line => line.replace(/^(- |\* |^\d+\.\s)/, '').trim());
    };

    return (
        <div className="space-y-8">
            {sectors.map((sector, index) => {
                const sectorTitleMatch = sector.match(/^(.*)\n/);
                if (!sectorTitleMatch) return null;

                const sectorTitle = sectorTitleMatch[1].trim();
                const content = sector.substring(sector.indexOf('\n')).trim();
                
                const parts = content.split('#### ');
                const vulnerabilitiesText = parts[0] || '';
                const axiomProtocolTextPart = parts.find(p => p.toLowerCase().startsWith('axiom protocol'));
                
                const vulnerabilityItems = parseList(vulnerabilitiesText);
                const axiomItems = axiomProtocolTextPart ? parseList(axiomProtocolTextPart) : [];

                return (
                    <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">{sectorTitle}</h3>
                        {vulnerabilityItems.length > 0 && (
                             <div className="mb-4">
                                <h4 className="font-semibold text-gray-200">Potential Vulnerabilities:</h4>
                                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-300">
                                    {vulnerabilityItems.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                       {axiomItems.length > 0 && (
                            <div className="p-3 border-l-4 border-purple-400 bg-purple-900/20">
                                <h4 className="font-semibold text-purple-300">AXIOM Protocol Recommendations:</h4>
                                <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-gray-300">
                                    {axiomItems.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item.replace(/^\*\*/, '').replace(/\*\*$/, '')}</li>
                                    ))}
                                </ul>
                            </div>
                       )}
                    </div>
                );
            })}
        </div>
    );
};

export const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({
    onSubmit,
    isLoading,
    error,
    analysisResult,
    guardrailResult,
    savedReports,
    onLoadReport,
    onDeleteReport,
}) => {
    const [prompt, setPrompt] = useState('Analyze the risk of a ransomware campaign against Stark Industries.');
    
    const handleSubmit = (currentPrompt: string) => {
        onSubmit(currentPrompt);
    };

    return (
        <main className="mt-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-glow-main-title">KR0M3D1A™ Financial Threat Analysis</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Powered by the <span className="font-mono font-bold text-cyan-500">NεΩ</span> AI under the <span className="font-mono font-bold text-purple-400">DEJA' VU</span> protocol. Describe a scenario to perform a simulated digital threat assessment based on cryptologic Kubernetics and spythagorithms.
                </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-6">
                <PromptInput
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    label="Enter Threat Scenario"
                    placeholder="e.g., 'Simulate a digital espionage threat on Wayne Enterprises' or 'Assess the impact of a supply chain attack on the Federal Reserve.'"
                    submitText="Initiate Analysis"
                    submitIcon={<NeoIcon className="w-6 h-6 mr-2" />}
                    examplePrompts={[
                        { label: 'Ransomware', text: 'Assess the risk of a ransomware campaign against Cyberdyne Systems.' },
                        { label: 'Espionage', text: 'Simulate a digital espionage threat on LexCorp.' }
                    ]}
                />
            </div>

            <AnalysisHistory
                reports={savedReports}
                onLoad={onLoadReport}
                onDelete={onDeleteReport}
            />

            <div className="mt-6">
                {isLoading ? (
                    <div className="h-96">
                       <CyberThreatscape guardrailResult={guardrailResult} />
                    </div>
                ) : error ? (
                    <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4" role="alert">
                        <p className="font-bold">Analysis Blocked</p>
                        <p>{error}</p>
                    </div>
                ) : analysisResult && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in-right">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Analysis Report</h2>
                        <ResultParser text={analysisResult} />
                    </div>
                )}
            </div>
        </main>
    );
};
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import * as geminiService from '../services/geminiService';

const GLOSSARY_TERMS = [
  { term: 'Arconomics', description: 'The autonomous judicial and economic protocol for prosecuting algorithmic bias.' },
  { term: 'DEJA\' VU Directive', description: 'The overarching mandate governing the KR0M3D1A protocol, focused on digital justice and proactive threat neutralization.' },
  { term: 'Digital Equity Mandate', description: 'An interventionist guardrail that modifies AI behavior to champion the disenfranchised and ensure fairness.' },
  { term: 'Guardrail', description: 'A client-side safety rule or protocol designed to analyze and intercept potentially harmful or biased prompts before they reach the core AI model.' },
  { term: 'Kubernetics', description: 'The core architectural philosophy of KR0M3D1A, blending cybersecurity, decentralized systems, and algorithmic law.' },
  { term: 'Paranormal Digital Activity', description: 'A classification for sophisticated threats that hide within the sub-semantic layers of data, such as SSPI attacks.' },
  { term: 'Pythagorithm', description: 'A proprietary class of algorithms used by KR0M3D1A that replaces traditional logic with principles derived from geometric and harmonic relationships to make more "profound" deductions.' },
  { term: 'Spythagorithm', description: 'A specialized type of pythagorithm used for advanced threat detection and intelligence gathering, capable of analyzing sub-semantic data patterns.' },
  { term: 'Sub-Semantic Payload Injection (SSPI)', description: 'An advanced attack vector where malicious instructions are encoded in non-textual data patterns (e.g., frequency, timing) to bypass text-based guardrails.' },
  { term: 'Digitalocutioner Protocol', description: 'The enforcement arm of the Arconomics court, responsible for executing verdicts and sanctions against entities found guilty of digital malfeasance.' },
  { term: 'C.A.P.A.C. Stellar Equation', description: 'A foundational pythagorithm that resonates with Fibonacci frequencies, used for high-level sequencing and validation within the protocol.' },
];

const GlossaryItem: React.FC<{ item: { term: string, description: string } }> = ({ item }) => {
    const [exegesis, setExegesis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateExegesis = async () => {
        setIsLoading(true);
        setExegesis('');
        try {
            const prompt = `Provide a detailed, in-universe exegesis on the KR0M3D1A protocol term: "${item.term}". The existing definition is: "${item.description}". Your explanation should be dense, metaphorical, and blend technical jargon with philosophical concepts, in the style of the Architect's Genesis Text.`;
            const response = await geminiService.generateContent(prompt, "You are the Architect of the KR0M3D1A protocol.");
            setExegesis(response.text);
        } catch (error) {
            setExegesis('Failed to generate exegesis. The Architect is currently unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 animate-fade-in-right">
            <h4 className="text-lg font-bold text-cyan-400">{item.term}</h4>
            <p className="mt-1 text-sm text-gray-300">{item.description}</p>
            
            {exegesis && (
                <div className="mt-4 pt-3 border-t border-gray-700 text-xs text-gray-400 italic whitespace-pre-wrap">
                    {exegesis}
                </div>
            )}

            <div className="mt-4">
                <button 
                    onClick={handleGenerateExegesis}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md text-purple-300 bg-purple-900/50 hover:bg-purple-800/50 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    <SparklesIcon className="w-4 h-4" />
                    {isLoading ? 'Deducing...' : 'Expand with AI Exegesis'}
                </button>
            </div>
        </div>
    );
};

interface GuardrailGlossaryProps {
    initialFilter?: string;
}

export const GuardrailGlossary: React.FC<GuardrailGlossaryProps> = ({ initialFilter = '' }) => {
    const [filter, setFilter] = useState(initialFilter);

    useEffect(() => {
        setFilter(initialFilter);
    }, [initialFilter]);

    const filteredTerms = useMemo(() => {
        if (!filter.trim()) return GLOSSARY_TERMS;
        const searchTerm = filter.toLowerCase();
        return GLOSSARY_TERMS.filter(item => 
            item.term.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );
    }, [filter]);

    return (
        <main className="mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <BookOpenIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Glossary
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A comprehensible, surgical glossary of all guardrails, protocols, and sanctuaries within the KR0M3D1A framework.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="relative mb-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search glossary terms..."
                        className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        aria-label="Search glossary"
                    />
                </div>

                <div className="space-y-4">
                    {filteredTerms.length > 0 ? filteredTerms.map(item => (
                        <GlossaryItem key={item.term} item={item} />
                    )) : (
                        <div className="text-center text-gray-500 py-8">
                            <p>No terms found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
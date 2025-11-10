import React from 'react';
import { OsintResult } from '../services/types';
import { ChipIcon } from './icons/ChipIcon';
import { LinkIcon } from './icons/LinkIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface GlobalIntelSearchProps {
    query: string;
    isLoading: boolean;
    result: OsintResult | null;
    error: string;
}

const LoadingAnimation: React.FC<{query: string}> = ({ query }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
            <MagnifyingGlassIcon className="w-24 h-24 text-cyan-400 animate-pulse" />
        </div>
        <p className="mt-4 font-mono text-cyan-300 text-lg">ASIC-7: GATHERING INTEL...</p>
        <p className="text-sm text-gray-500">Querying global open-source intelligence networks for target: <span className="font-bold text-gray-400">{query}</span></p>
    </div>
);

const ResultParser: React.FC<{ text: string }> = ({ text }) => {
    // Enhanced parser for the new dossier format
    const sections = text.split('### ').filter(s => s.trim());

    return (
        <div className="space-y-6 font-mono">
            {sections.map((section, index) => {
                const lines = section.split('\n').filter(l => l.trim());
                if (lines.length === 0) return null;

                const title = lines.shift()?.trim() || 'Untitled Section';
                const content = lines;

                // Special handling for Threat Assessment
                if (title.toUpperCase().includes('THREAT ASSESSMENT')) {
                    const levelMatch = content.join('\n').match(/threat level:\s*(nominal|guarded|elevated|critical)/i);
                    const level = levelMatch ? levelMatch[1].toUpperCase() : 'UNKNOWN';
                    
                    // FIX: Refactored levelStyles to be an object with color and border properties to resolve errors from accessing properties on a string.
                    const levelStyles: { [key: string]: { color: string; border: string } } = {
                        NOMINAL: { color: 'text-cyan-400', border: 'border-cyan-500' },
                        GUARDED: { color: 'text-yellow-400', border: 'border-yellow-500' },
                        ELEVATED: { color: 'text-orange-400', border: 'border-orange-500' },
                        CRITICAL: { color: 'text-red-400', border: 'border-red-500 threatscape-glitch' },
                        UNKNOWN: { color: 'text-gray-500', border: 'border-gray-600' },
                    };
                    const style = levelStyles[level as keyof typeof levelStyles] || levelStyles.UNKNOWN;

                    return (
                        <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                            <h3 className="text-lg font-bold text-cyan-400 mb-3">{title}</h3>
                            <div className={`p-3 border-l-4 ${style.border} bg-black/30`}>
                                <p className="text-sm text-gray-300">{content.join('\n').replace(/threat level:.*$/i, '').trim()}</p>
                                <p className="mt-3 font-bold text-sm"><span className="text-gray-500">Calculated Threat Level:</span> <span className={style.color}>{level}</span></p>
                            </div>
                        </div>
                    );
                }

                // Default section rendering
                return (
                    <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                        <h3 className="text-lg font-bold text-cyan-400 mb-3">{title}</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
                            {content.map((item, itemIndex) => (
                                <li key={itemIndex}>{item.replace(/^(\* |- )/, '').trim()}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};


export const GlobalIntelSearch: React.FC<GlobalIntelSearchProps> = ({
    query,
    isLoading,
    result,
    error,
}) => {
    return (
        <main className="mt-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <ChipIcon className="w-8 h-8 text-blue-400"/>
                    Global Intelligence Dossier
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-mono">
                    [ ASIC-7 REPORT // TARGET: <strong className="text-cyan-400">{query}</strong> // CLASSIFICATION: EYES ONLY ]
                </p>
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <LoadingAnimation query={query} />
                ) : error ? (
                    <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4" role="alert">
                        <p className="font-bold">INTEL GATHERING FAILED</p>
                        <p>{error}</p>
                    </div>
                ) : result && (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in-right space-y-6">
                        <ResultParser text={result.analysis} />
                        
                        {result.sources.length > 0 && (
                            <div className="pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-200 mb-3 font-mono">// DATA SOURCE LOG</h3>
                                <div className="space-y-2">
                                    {result.sources.map((source, index) => (
                                        <a
                                            key={index}
                                            href={source.uri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                                        >
                                            <LinkIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-blue-300 font-semibold">{source.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{source.uri}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

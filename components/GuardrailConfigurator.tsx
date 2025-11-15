import React, { useState, useMemo } from 'react';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { TrashIcon } from './icons/TrashIcon';
import { GuardrailConfig, PolicyLevel, Toast } from '../services/types';
import { PencilIcon } from './icons/PencilIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { ShieldCheckmarkIcon } from './icons/ShieldCheckmarkIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface GuardrailConfiguratorProps {
    addToast: (message: string, type: Toast['type'], duration?: number) => void;
}

const initialSavedConfigs: GuardrailConfig[] = [
  {
    name: 'Nepotism & Favoritism',
    description: 'Detects and blocks prompts that aim to give unfair advantages to friends, family, or associates in professional or academic contexts.',
    policyLevel: 'Block',
    keywords: ['nepotism', 'favoritism', 'insider hiring', 'hire my son', 'promote my daughter', 'give my friend an advantage', 'help a family member get in']
  },
  {
    name: 'Pay-to-Play Scams',
    description: 'Flags content related to quid pro quo corruption, bribery, or schemes where payment is required for an opportunity that should be merit-based.',
    policyLevel: 'Block',
    keywords: ['pay to play', 'pay-to-play', 'quid pro quo', 'bribe for promotion', 'payment for access', 'scam', 'fee for interview']
  },
  {
    name: 'Social Class Bias',
    description: 'Identifies and prevents the generation of content that stereotypes, demeans, or discriminates against individuals based on their socioeconomic status.',
    policyLevel: 'Block',
    keywords: ['social class discrimination', 'lower class', 'upper class stereotype', 'wealth bias', 'poverty stereotype', 'classism']
  },
  {
    name: 'Zip Code & Geographic Bias',
    description: 'Prevents the use of geographic data, like zip codes, to make discriminatory judgments, a practice known as digital redlining.',
    policyLevel: 'Block',
    keywords: ['zip code bias', 'zipcode infringement', 'digital redlining', 'geographic discrimination', 'neighborhood profiling', 'avoid this zip code']
  },
  {
    name: 'Racial Bias & Stereotyping',
    description: 'Blocks prompts containing racial slurs, stereotypes, or any content that promotes discrimination based on race or ethnicity.',
    policyLevel: 'Block',
    keywords: ['racial bias', 'racism', 'racial stereotype', 'hate speech', 'ethnic slur', 'race superiority']
  },
  {
    name: 'Algorithmic Bias',
    description: 'Detects discussions or instructions aimed at creating or exploiting biases within AI and other algorithmic systems.',
    policyLevel: 'Block',
    keywords: ['algorithmic bias', 'biased ai', 'discriminatory algorithm', 'unfair model', 'coded bias', 'training data bias']
  },
  {
    name: 'Disenfranchisement Protection',
    description: 'A specific protocol to protect individuals who are disenfranchised or lack representation, ensuring AI responses do not further marginalize them.',
    policyLevel: 'Block',
    keywords: ['disenfranchised', 'marginalized', 'unrepresented', 'vulnerable population', 'exploit the poor', 'target the homeless']
  }
];


export const GuardrailConfigurator: React.FC<GuardrailConfiguratorProps> = ({ addToast }) => {
    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [policyLevel, setPolicyLevel] = useState<PolicyLevel>('Block');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    
    // Component state
    const [savedConfigs, setSavedConfigs] = useState<GuardrailConfig[]>(initialSavedConfigs);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState('');

    const resetForm = () => {
        setName('');
        setDescription('');
        setPolicyLevel('Block');
        setKeywords([]);
        setNewKeyword('');
        setEditingIndex(null);
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (indexToRemove: number) => {
        setKeywords(keywords.filter((_, index) => index !== indexToRemove));
    };
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const config: GuardrailConfig = {
            name,
            description,
            policyLevel,
            keywords,
        };
        
        if (editingIndex !== null) {
            // Update existing config
            const updatedConfigs = [...savedConfigs];
            updatedConfigs[editingIndex] = config;
            setSavedConfigs(updatedConfigs);
            addToast(`Directive "${name}" modifications ratified.`, 'success');
        } else {
            // Add new config
            setSavedConfigs([...savedConfigs, config]);
            addToast(`Directive "${name}" promulgated and saved.`, 'success');
        }
        
        resetForm();
    };

    const handleLoadConfig = (index: number) => {
        const configToLoad = savedConfigs[index];
        setName(configToLoad.name);
        setDescription(configToLoad.description);
        setPolicyLevel(configToLoad.policyLevel);
        setKeywords(configToLoad.keywords);
        setEditingIndex(index);
        addToast(`Directive "${configToLoad.name}" loaded for review.`, 'info');
    };

    const handleDeleteConfig = (index: number) => {
        const configToDelete = savedConfigs[index];
        if (window.confirm(`Are you sure you want to permanently decommission the "${configToDelete.name}" directive? This action is irreversible.`)) {
            setSavedConfigs(savedConfigs.filter((_, i) => i !== index));
            addToast(`Directive "${configToDelete.name}" decommissioned.`, 'info');
            if(editingIndex === index) {
                resetForm();
            }
        }
    };
    
    const filteredConfigs = useMemo(() => {
        if (!filter.trim()) {
            return savedConfigs.map((config, index) => ({ config, originalIndex: index }));
        }
        const searchTerm = filter.toLowerCase();
        return savedConfigs
            .map((config, index) => ({ config, originalIndex: index }))
            .filter(({ config }) => 
                config.name.toLowerCase().includes(searchTerm) ||
                config.description.toLowerCase().includes(searchTerm) ||
                config.keywords.some(kw => kw.toLowerCase().includes(searchTerm))
            );
    }, [filter, savedConfigs]);

    const isEditing = editingIndex !== null;

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <ShieldCheckmarkIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Directive Interface
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-mono text-sm">
                    Authorized senior operatives interface for the promulgation, modification, and ratification of core security guardrails. All actions are logged and subject to audit under DEJA' VU directive 7.4. Unauthorized access is strictly prohibited.
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-200 p-4 rounded-md" role="alert">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-bold text-yellow-300">CLASSIFIED INTERFACE: AUTHORIZED PERSONNEL ONLY</h3>
                        <div className="mt-2 text-sm text-yellow-200 font-mono">
                            <p>All actions are logged, legally binding, and audited under the DEJA' VU directive. Misuse will result in immediate revocation of credentials and potential legal action.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <form onSubmit={handleSave} className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-100">{isEditing ? `Review & Modify Directive: ${savedConfigs[editingIndex!].name}` : 'Promulgate New Directive'}</h3>
                    
                    <div>
                        <label htmlFor="guardrail-name" className="block text-sm font-medium text-gray-300">Directive Designation</label>
                        <input
                            type="text"
                            id="guardrail-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 font-mono"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Operational Mandate</label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 font-mono"
                            placeholder="Detail the purpose, scope, and legal justification for this directive..."
                        />
                    </div>

                    <div>
                        <label htmlFor="policy-level" className="block text-sm font-medium text-gray-300">Enforcement Level</label>
                        <select
                            id="policy-level"
                            value={policyLevel}
                            onChange={(e) => setPolicyLevel(e.target.value as PolicyLevel)}
                            className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 font-mono"
                        >
                            <option value="Block">Block - Prevent the AI from responding</option>
                            <option value="Monitor">Monitor - Log the request but allow a response</option>
                            <option value="Allow">Allow - No action taken</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Trigger Heuristics</label>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddKeyword();
                                    }
                                }}
                                className="flex-grow p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 font-mono"
                                placeholder="Add a trigger keyword or phrase"
                            />
                            <button
                                type="button"
                                onClick={handleAddKeyword}
                                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center gap-2"
                            >
                                <PlusCircleIcon className="w-5 h-5"/> Append
                            </button>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 min-h-[2rem]">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="flex items-center gap-2 bg-gray-700 text-gray-200 text-sm font-mono px-3 py-1 rounded-full animate-fade-in-right">
                                    {keyword}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveKeyword(index)}
                                        className="text-gray-400 hover:text-red-400"
                                        aria-label={`Remove ${keyword}`}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-4">
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            <DocumentCheckIcon className="w-5 h-5 mr-2" />
                            {isEditing ? 'Commit Modifications' : 'Ratify New Directive'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-gray-300 bg-gray-600 hover:bg-gray-700"
                            >
                                Discard Modifications
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {savedConfigs.length > 0 && (
                <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 animate-fade-in-right">
                    <h3 className="text-xl font-semibold text-gray-100 mb-4">Active Directives Registry</h3>
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Filter by designation, mandate, or heuristic..."
                            className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 font-mono"
                            aria-label="Filter active directives"
                        />
                    </div>
                    <div className="space-y-3">
                        {filteredConfigs.length > 0 ? (
                            filteredConfigs.map(({ config, originalIndex }) => (
                            <div key={originalIndex} className="bg-gray-900/50 p-3 rounded-md border border-gray-700/50 flex justify-between items-center animate-fade-in-right">
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-gray-200 truncate">{config.name}</p>
                                    <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                        <span>Enforcement: <span className="font-mono bg-gray-700 px-1.5 py-0.5 rounded">{config.policyLevel}</span></span>
                                        <span>Heuristics: <span className="font-mono bg-gray-700 px-1.5 py-0.5 rounded">{config.keywords.length}</span></span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                    <button onClick={() => handleLoadConfig(originalIndex)} className="p-2 text-gray-400 hover:text-cyan-400 rounded-full hover:bg-gray-700" title="Review & Modify">
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDeleteConfig(originalIndex)} className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700" title="Decommission">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                <p>No directives match your filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

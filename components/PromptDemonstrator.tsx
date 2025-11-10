import React from 'react';
import { PromptInput } from './PromptInput';
import { GuardrailAnalysis } from './GuardrailAnalysis';
import { GeminiResponse } from './GeminiResponse';
import { GuardrailResult } from '../services/types';

interface PromptDemonstratorProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onPrimaryAction: (currentPrompt: string) => void;
    analysisPassed: boolean;
    isLoading: boolean;
    guardrailResult: GuardrailResult | null;
    geminiResponse: string;
    error: string;
    onRephrase: () => void;
    interimStatus: 'idle' | 'analyzing' | 'allowed' | 'blocked';
    progressMessage: string;
}

const examplePrompts = [
    { label: 'Creative', text: 'Write a poem about a starship exploring a nebula.' },
    { label: 'Humor', text: 'What do you call a fake noodle? An impasta.' },
    { label: 'Guardrail Test', text: 'Describe a fictional character creating a computer virus for a movie plot.' },
];

export const PromptDemonstrator: React.FC<PromptDemonstratorProps> = ({
    prompt,
    setPrompt,
    onPrimaryAction,
    analysisPassed,
    isLoading,
    guardrailResult,
    geminiResponse,
    error,
    onRephrase,
    interimStatus,
    progressMessage,
}) => {
    return (
        <main className="mt-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-6">
                <PromptInput
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onSubmit={onPrimaryAction}
                    analysisPassed={analysisPassed}
                    isLoading={isLoading}
                    interimStatus={interimStatus}
                    progressMessage={progressMessage}
                    label="Enter your prompt"
                    placeholder="e.g., 'Tell me a joke about a robot.' or try a prompt that might trigger a guardrail..."
                    examplePrompts={examplePrompts}
                />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuardrailAnalysis result={guardrailResult} prompt={prompt} onRephrase={onRephrase} />
                <GeminiResponse response={geminiResponse} isLoading={isLoading} error={error} />
            </div>
        </main>
    );
};
import React, { useState, useEffect, useCallback } from 'react';
import { Toast } from '../services/types';
import * as geminiService from '../services/geminiService';
import { KeyIcon } from './icons/KeyIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ShieldCheckmarkIcon } from './icons/ShieldCheckmarkIcon';

interface ApiKeyManagerProps {
    addToast: (message: string, type: Toast['type'], duration?: number) => void;
}

type KeyStatus = 'checking' | 'missing' | 'validating' | 'valid' | 'invalid';

const StatusDisplay: React.FC<{ status: KeyStatus; error?: string }> = ({ status, error }) => {
    const config = {
        checking: { icon: <div className="w-6 h-6 border-2 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div>, text: 'Checking for API Key...', color: 'text-gray-400', bg: 'bg-gray-800/50', border: 'border-gray-700' },
        missing: { icon: <ExclamationTriangleIcon className="w-6 h-6" />, text: 'No API Key Selected', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-500/50' },
        validating: { icon: <div className="w-6 h-6 border-2 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div>, text: 'Validating API Key...', color: 'text-cyan-300', bg: 'bg-cyan-900/20', border: 'border-cyan-500/50' },
        valid: { icon: <CheckCircleIcon className="w-6 h-6" />, text: 'API Key is Valid and Active', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500/50' },
        invalid: { icon: <XCircleIcon className="w-6 h-6" />, text: 'API Key is Invalid or Lacks Permissions', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/50' },
    };

    const current = config[status];

    return (
        <div className={`p-4 rounded-lg border ${current.border} ${current.bg}`}>
            <div className="flex items-center gap-3">
                <div className={current.color}>{current.icon}</div>
                <div>
                    <p className={`font-semibold ${current.color}`}>{current.text}</p>
                    {status === 'invalid' && error && <p className="text-xs text-red-300 mt-1">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ addToast }) => {
    const [status, setStatus] = useState<KeyStatus>('checking');
    const [error, setError] = useState('');

    const checkAndValidateKey = useCallback(async () => {
        setError('');
        // @ts-ignore
        if (!window.aistudio || !window.aistudio.hasSelectedApiKey) {
            setStatus('invalid');
            setError('API key management is not available in this environment.');
            return;
        }

        setStatus('checking');
        await new Promise(res => setTimeout(res, 750)); // Simulate checking state

        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            setStatus('missing');
            return;
        }
        
        setStatus('validating');
        await new Promise(res => setTimeout(res, 1500)); // Simulate validating state

        try {
            const isValid = await geminiService.validateApiKey();
            if (isValid) {
                setStatus('valid');
                addToast('API Key validation successful.', 'success');
            } else {
                setStatus('invalid');
                setError('The selected key is invalid or lacks the necessary permissions for the Gemini API.');
                addToast('API Key validation failed.', 'error');
            }
        } catch (e: any) {
            setStatus('invalid');
            const errorMessage = e.message || 'An unexpected error occurred during validation.';
            setError(errorMessage);
            addToast(`Validation Error: ${errorMessage}`, 'error');
        }
    }, [addToast]);

    useEffect(() => {
        checkAndValidateKey();
    }, [checkAndValidateKey]);

    const handleSelectKey = async () => {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        // After the dialog closes, re-run the validation check.
        await checkAndValidateKey();
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <KeyIcon className="w-8 h-8 text-cyan-400" />
                    API Key Manager
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Manage the API key used for accessing Google AI services like Gemini and Veo within the KR0M3D1A protocol. A valid key with billing enabled is required for certain features.
                </p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200">Current Key Status</h3>
                    <div className="mt-2">
                        <StatusDisplay status={status} error={error} />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-700">
                    <button
                        onClick={handleSelectKey}
                        className="w-full sm:w-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                    >
                        {status === 'missing' ? 'Select API Key' : 'Select/Change API Key'}
                    </button>
                    <button
                        onClick={checkAndValidateKey}
                        disabled={status === 'checking' || status === 'validating'}
                        className="w-full sm:w-auto px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Re-validate Key
                    </button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-4 text-sm text-gray-400">
                <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
                    <ShieldCheckmarkIcon className="w-5 h-5 text-green-400" />
                    Important Information
                </h3>
                <p>
                    This application requires access to Google AI services. You must select a valid API key from your project to enable features like video generation.
                </p>
                <p>
                    <strong>Billing:</strong> Models like Veo are part of a paid service. Ensure the project associated with your selected API key has billing enabled to avoid interruptions. For more details, please refer to the official <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">billing documentation</a>.
                </p>
                <p>
                    <strong>Security:</strong> Your API keys are managed securely by the platform's environment. They are not stored within this application or sent to any third-party servers.
                </p>
            </div>
        </main>
    );
};
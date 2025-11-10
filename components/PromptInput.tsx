import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  label: string;
  placeholder: string;
  submitText?: string;
  loadingText?: string;
  submitIcon?: React.ReactNode;
  examplePrompts?: { label: string; text: string }[];
  rows?: number;
  interimStatus?: 'idle' | 'analyzing' | 'allowed' | 'blocked';
  progressMessage?: string;
  analysisPassed?: boolean;
}

const MAX_PROMPT_LENGTH = 5000; // Define maximum prompt length

export const PromptInput: React.FC<PromptInputProps> = ({ 
    prompt, 
    setPrompt, 
    onSubmit, 
    isLoading, 
    label,
    placeholder,
    examplePrompts,
    rows = 4,
    interimStatus, 
    progressMessage,
    analysisPassed,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const baseButtonClasses = "mt-4 w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:cursor-not-allowed transition-all duration-200";
  
  const currentLength = prompt.length;
  const isOverLimit = currentLength > MAX_PROMPT_LENGTH;
  
  let dynamicClasses: string;
  let buttonContent: React.ReactNode;

  if (isLoading) {
      dynamicClasses = 'bg-gray-400 dark:bg-gray-600';
      buttonContent = <><Spinner />{progressMessage || 'Generating...'}</>;
  } else if (interimStatus === 'analyzing') {
      dynamicClasses = 'bg-cyan-500';
      buttonContent = <><Spinner />Analyzing...</>;
  } else if (interimStatus === 'blocked') {
      dynamicClasses = 'bg-red-500';
      buttonContent = <><XCircleIcon className="-ml-1 mr-2 h-6 w-6" />Blocked by Guardrail</>;
  } else if (analysisPassed) { // This includes interimStatus === 'allowed'
      dynamicClasses = 'bg-purple-600 hover:bg-purple-700';
      buttonContent = <><PaperAirplaneIcon className="w-5 h-5 mr-2" />Submit to AI</>;
  } else { // Default, idle state
      dynamicClasses = 'bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 dark:disabled:bg-gray-600';
      buttonContent = <><ShieldCheckIcon className="w-5 h-5 mr-2" />Analyze Threat</>;
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id="prompt-input"
        rows={rows}
        className={`w-full p-3 bg-gray-50 dark:bg-gray-900/50 border rounded-md focus:ring-2 focus:border-cyan-500 transition-colors duration-200 resize-none placeholder-gray-500 text-gray-200 ${isOverLimit ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500'}`}
        placeholder={placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
        aria-invalid={isOverLimit}
        aria-describedby="prompt-char-count"
      />
      <div id="prompt-char-count" className="mt-2 flex justify-between items-center text-xs">
          {examplePrompts && examplePrompts.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Try an example:</span>
                {examplePrompts.map((ex) => (
                    <button
                        key={ex.label}
                        type="button"
                        onClick={() => setPrompt(ex.text)}
                        disabled={isLoading}
                        className="px-2.5 py-1 font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/40 rounded-full hover:bg-cyan-200 dark:hover:bg-cyan-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {ex.label}
                    </button>
                ))}
            </div>
          ) : <div />}
          <div className={`font-mono flex-shrink-0 ml-4 ${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
              {currentLength}/{MAX_PROMPT_LENGTH}
          </div>
      </div>
       {isOverLimit && (
          <p className="text-sm text-red-500 mt-2" role="alert">
              Prompt exceeds the maximum length of {MAX_PROMPT_LENGTH} characters.
          </p>
      )}
      <button
        type="submit"
        disabled={isLoading || !prompt.trim() || isOverLimit || interimStatus === 'analyzing'}
        className={`${baseButtonClasses} ${dynamicClasses}`}
      >
        {buttonContent}
      </button>
    </form>
  );
};
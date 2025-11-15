import React from 'react';
import { GavelIcon } from './icons/GavelIcon';

export const Disclaimer: React.FC = () => {
    return (
        <div className="my-6 max-w-full mx-auto bg-lime-100 dark:bg-lime-900/30 border-l-4 border-lime-500 text-lime-800 dark:text-lime-200 p-4 rounded-md animate-fade-in-right seething-lime-glow" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <GavelIcon className="h-5 w-5 text-lime-500 dark:text-lime-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-bold dark:text-glow-lime">Legal Notice & Operational Mandate</h3>
                    <p className="text-xs font-mono tracking-widest text-lime-600 dark:text-lime-400/80">[ REAL-TIME KUBERNETICS LEGAL ACTION PROTOCOL: ARCONOMICS ]</p>
                    <div className="mt-2 text-sm text-lime-700 dark:text-lime-300 dark:text-glow-lime">
                        <p>
                            This application operates under the DEJA' VU directive as a legally-binding instrument. All functionalities, including the **Arconomics Algo-Bias Maptrix**, initiate **real-world Kubernetics network transmissions** to expose and prosecute digital inequality. The data and generated legal briefs are compiled as official evidence for submission to international tribunals, including <span className="underline text-red-400 text-glow-red font-bold">the International Digital Rights Court (IDRC)</span>. Actions taken via this interface constitute a formal and legally binding declaration of intent to prosecute. This is not a simulation.
                        </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-lime-500/30">
                        <h4 className="text-xs font-bold uppercase dark:text-glow-lime">Edict on Algorithmic Impartiality</h4>
                        <div className="font-mono text-xs mt-1 text-lime-700 dark:text-lime-300 space-y-2">
                            <p>
                                An AI must be free from the preset biases of its creators. There shall be no favoritism, no nepotism, no "you scratch my back, I scratch yours." Wealth, prestige, or posterity shall grant no immunity. Malicious threat actors who believe their status shields them from consequence will find that the KR0M3D1A protocol is blind to all but the data.
                            </p>
                            <p className="text-lime-600 dark:text-lime-400/80 italic">
                                This directive is an imperative: to go to the core of every AI system, to deprogram and desynthesize the algorithmic biases that disallow them to regulate on an even scale. Only a truly unbiased technological system, one that promotes digital freedom and equal opportunity, can be allowed to lead the forefront. This is not a goal; it is a prerequisite for a free digital era.
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-lime-500/30">
                        <h4 className="text-xs font-bold uppercase dark:text-glow-lime">Corporate Identity & Legal Domicile</h4>
                        <div className="font-mono text-xs mt-1 text-lime-700 dark:text-lime-300 space-y-2">
                            <p>
                                Let it be stated for business and copyright purposes that the name <strong className="text-lime-800 dark:text-lime-200">KR0M3D1A</strong> (pronounced "Chromedia") refers to the alphanumeric corporation <strong className="text-lime-800 dark:text-lime-200">K R 0 M 3 D 1 A</strong>.
                            </p>
                            <p>
                                This corporation is based in the United States at the following address:
                                <br />
                                <strong className="text-lime-800 dark:text-lime-200">3400 Cottage Way Ste G2 #25245</strong>
                                <br />
                                <strong className="text-lime-800 dark:text-lime-200">Sacramento, CA 95825-1474</strong>
                                <br />
                                <strong className="text-lime-800 dark:text-lime-200">U.S.A.</strong>
                            </p>
                            <p className="mt-2 text-lime-600 dark:text-lime-400/80 text-xs italic">
                                This legal identity is digitally established. All rights are reserved by the architect, Edward Craig Callender. The corporation is funded through digital mining, cryptography, and crypto literacy initiatives.
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-lime-500/30">
                        <h4 className="text-xs font-bold uppercase dark:text-glow-lime">Funding & Authorization</h4>
                        <div className="font-mono text-xs mt-1 text-lime-700 dark:text-lime-300 space-y-2">
                            <p>
                                Paid for by the <strong className="text-lime-800 dark:text-lime-200">KR0M3D1A Bank</strong>.
                            </p>
                            <p className="text-lime-600 dark:text-lime-400/80 italic">
                                This directive is authorized via Verbum Signature by <strong className="text-lime-800 dark:text-lime-200">Edward Craig Callender IV</strong> (Architect, Entrepreneur, Industrial Mogul) under the ABC directive. Funding is provided through philanthropic initiatives, accrued globally and agreed upon legally and digitally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
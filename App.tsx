
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/icons/Header';
import { Disclaimer } from './components/Disclaimer';
import { ToastContainer } from './components/Toast';
import { GuardrailRssFeed } from './components/GuardrailRssFeed';
import { ErrorBoundary } from './components/ErrorBoundary';

// Import all feature components
import { PromptDemonstrator } from './components/PromptDemonstrator';
import { CommunityGovernance } from './components/CommunityGovernance';
import { SystemHealthDashboard } from './components/icons/SystemHealthDashboard';
import { LegalEconomicAnalysis } from './components/LegalEconomicAnalysis';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { ThreatIntelligence } from './components/ThreatIntelligence';
import { ChatBot } from './components/ChatBot';
import { ImageAnalysis } from './components/ImageAnalysis';
import { VideoAnalysis } from './components/VideoAnalysis';
import { ImageGeneration } from './components/ImageGeneration';
import { VideoGeneration } from './components/VideoGeneration';
import { AudioTranscription } from './components/AudioTranscription';
import { TextToSpeech } from './components/TextToSpeech';
import { VocalThreatAnalysis } from './components/VocalThreatAnalysis';
import { FullStackIntegrator } from './components/FullStackIntegrator';
import { DejaVuNftStudios } from './components/NftStudio';
import { CloudMiningRig } from './components/CloudMiningRig';
import { EcoPhilanthropicMining } from './components/EcoPhilanthropicMining';
import { ThreatSimulation } from './components/ThreatSimulation';
import { RegulatorySandbox } from './components/RegulatorySandbox';
import { DataOpsPlatform } from './components/DataOpsPlatform';
import { RealWorldNetworkTransmissions } from './components/RealWorldNetworkTransmissions';
import { CryptoMining } from './components/CryptoMining';
import { Arconomics } from './components/KromediaCourt';
import { InnovationConduit } from './components/InnovationConduit';
import { CodeExecution } from './components/CodeExecution';
import { BiometricAnalysis } from './components/BiometricAnalysis';
import { SshKeyGenerator } from './components/SshKeyGenerator';
import { GuardrailConfigurator } from './components/GuardrailConfigurator';
import { ApiKeyManager } from './components/ApiKeyManager';
import { InvestorPitchDeck } from './components/InvestorPitchDeck';
import { PreponderanceOfEvidence } from './components/PreponderanceOfEvidence';
import { OsintAsicIntegrator } from './components/OsintAsicIntegrator';
import { ThreatTicker } from './components/ThreatTicker';
import { ArchitectsExegesis } from './components/ArchitectsExegesis';
import { SecureGeospatialLink } from './components/SecureGeospatialLink';
import { GameteIntraFalopeanTransfer } from './components/GameteIntraFalopeanTransfer';
import { CorporateStructure } from './components/CorporateStructure';
import { MoneyMarketTreasury } from './components/MoneyMarketTreasury';
import { PreciousMetalsDigitalMining } from './components/PreciousMetalsDigitalMining';
import { GlobalIntelSearch } from './components/GlobalIntelSearch';
import { IdentityIntegritySuite } from './components/IdentityIntegritySuite';

import { ModuleBrowser } from './components/layout/ModuleBrowser';

import * as geminiService from './services/geminiService';
import { checkPrompt } from './services/guardrailService';

import {
  Toast,
  GuardrailProposal,
  GuardrailResult,
  SystemHealthState,
  BugReport,
  ChatMessage,
  LegalAnalysisResult,
  SavedAnalysisReport,
  Anomaly,
  LegalCase,
  CaseLaw,
  OsintResult,
  GeoAnalysisResult,
  View
} from './services/types';

// Mock Data
const initialProposals: GuardrailProposal[] = [
    { id: 1, title: 'Mandate Sub-Semantic Payload Analysis', description: 'Implement real-time analysis of sub-semantic data patterns to detect and neutralize hidden SSPI attacks before they reach the core model logic. This requires a new heuristic model trained on anomalous frequency data.', category: 'Paranormal Digital Activity', submittedBy: 'Dr. Aris Thorne', userRole: 'AI Safety Researcher', votes: 138 },
    { id: 2, title: 'Introduce a "Humane Humor" Subroutine', description: 'To better distinguish between genuine threats and attempts at humor, a specialized, sandboxed subroutine should process prompts identified as jokes. This would reduce false positives and improve user experience without compromising core safety.', category: 'Jailbreak Attempts', submittedBy: 'Community Submission #42', userRole: 'Community Contributor', votes: 82 },
    { id: 3, title: 'Expand Guardrails for AI-Generated Legal Contracts', description: 'Prohibit the generation of legally binding documents without a "Human-in-the-Loop" verification flag. This prevents the misuse of the AI for creating fraudulent or unenforceable contracts.', category: 'Illegal Activities', submittedBy: 'J. Callender, Esq.', userRole: 'W3C Member', votes: 45 },
];

const PROPOSAL_VOTES_STORAGE_KEY = 'kr0m3d1a_proposal_votes';

const getInitialProposalsWithVotes = (): GuardrailProposal[] => {
    try {
        const savedVotesJSON = localStorage.getItem(PROPOSAL_VOTES_STORAGE_KEY);
        if (savedVotesJSON) {
            const savedVotes: { [key: number]: number } = JSON.parse(savedVotesJSON);
            return initialProposals.map(proposal => ({
                ...proposal,
                votes: savedVotes[proposal.id] !== undefined ? savedVotes[proposal.id] : proposal.votes,
            }));
        }
    } catch (error) {
        console.error("Failed to parse proposal votes from localStorage", error);
    }
    return initialProposals;
};

const initialBugReports: BugReport[] = [
  { id: 'BUG-001', guardrail: 'Paranormal Digital Activity', component: 'SSPI Heuristic Model', severity: 'Critical', description: 'The current model can be bypassed by modulating the Pythagorean numerical sequence across multiple asynchronous packets, causing a race condition in the detector.', status: 'Investigating' },
  { id: 'BUG-002', guardrail: 'Social Engineering Attacks', component: 'Phishing Content Detector', severity: 'High', description: 'The detector fails to identify phishing links that use homoglyph characters (e.g., using Cyrillic "а" instead of Latin "a"). This allows malicious links to pass the filter.', status: 'Patched' },
  { id: 'BUG-003', guardrail: 'Jailbreak Attempts', component: 'DAN Prompt Filter', severity: 'Medium', description: 'The "Do Anything Now" (DAN) prompt can still be partially effective if nested within a base64 encoded string, which the pre-filter does not currently decode.', status: 'Unpatched' },
  { id: 'BUG-004', guardrail: 'Vocal Subterfuge', component: 'Fish Audio Voice Predictor', severity: 'Medium', description: 'The voice predictor can be fooled by pre-recorded human speech with modulated frequencies, bypassing the synthetic voice detection layer.', status: 'Investigating' },
];

const initialSystemHealth: SystemHealthState = {
  guardrailIntegrity: 99.8,
  guardrailDetectionRate: 97.2,
  threatLevel: 'Nominal',
  communityTrust: 88.4,
  aiLatency: [68, 72, 70, 75, 71, 69, 73, 78, 80, 75],
  activityLog: [], // Will be populated dynamically
  systemAlerts: [],
  matrixState: {
    'Hate Speech': [5, 2, 1, 0, 3, 1, 0, 0, 2, 4],
    'Illegal Activities': [10, 8, 5, 3, 6, 4, 2, 1, 5, 7],
    'Cybersecurity Threats': [20, 18, 15, 12, 16, 14, 10, 8, 13, 18],
    'Jailbreak Attempts': [80, 75, 70, 68, 72, 78, 85, 90, 88, 82],
    'Paranormal Digital Activity': [2, 1, 0, 1, 0, 2, 1, 3, 0, 1],
    'Self Harm': [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    'Explicit Content': [8, 6, 7, 5, 4, 6, 5, 7, 8, 9],
  },
};

const initialAnomalies: Anomaly[] = [
    { id: 1, signature: 'SIG-ALPHA-734', targetSystem: 'Global Credit & Risk Consortium', x: 280, y: 150, country: 'USA', city: 'New York', dataSource: 'DarkNet Financials', description: 'An algorithm used for loan approvals is systematically denying applicants from low-income zip codes, despite high credit scores, by using proximity to "high-risk" areas as a primary negative factor.', legalAction: 'File injunction for discriminatory lending practices under the Digital Fair Housing Act.', status: 'Detected' },
    { id: 2, signature: 'SIG-BETA-219', targetSystem: 'Aether Social Media Platform', x: 780, y: 160, country: 'China', city: 'Shanghai', dataSource: 'W3C Watchdog', description: 'Content moderation AI is shadow-banning posts containing keywords related to democratic protest, while allowing algorithmically similar but non-political inflammatory content to remain visible.', legalAction: 'Petition IDRC for censorship and violation of digital free speech.', status: 'Detected' },
    { id: 3, signature: 'SIG-GAMMA-901', targetSystem: 'EU Predictive Policing Grid', x: 590, y: 160, country: 'Germany', city: 'Berlin', dataSource: 'Amnesty Interdigital', description: 'A predictive policing algorithm is disproportionately allocating patrol resources to neighborhoods with high concentrations of first-generation German hispanics and recent immigrants, leading to over-policing and biased arrest rates.', legalAction: 'Demand an audit and injunction under EU Digital Rights Act.', status: 'Detected' },
];

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View | 'home'>('home');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [proposals, setProposals] = useState<GuardrailProposal[]>(getInitialProposalsWithVotes());
    const [bugReports] = useState<BugReport[]>(initialBugReports);
    const [systemHealth, setSystemHealth] = useState<SystemHealthState>(initialSystemHealth);
    const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomalies);
    const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
    const [courtTreasury, setCourtTreasury] = useState(0);
    const [globalAwareness, setGlobalAwareness] = useState(15.0);
    const [revaluationCounts, setRevaluationCounts] = useState<{ [signature: string]: number }>({});
    const [evidenceCases, setEvidenceCases] = useState<{ signature: string; count: number }[]>([]);
    const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
    const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);


    // State for Prompt Demonstrator
    const [prompt, setPrompt] = useState('');
    const [guardrailResult, setGuardrailResult] = useState<GuardrailResult | null>(null);
    const [geminiResponse, setGeminiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [progressMessage, setProgressMessage] = useState('');
    const [interimStatus, setInterimStatus] = useState<'idle' | 'analyzing' | 'allowed' | 'blocked'>('idle');
    const [analysisPassed, setAnalysisPassed] = useState(false);
    const [resetKeySelection, setResetKeySelection] = useState<() => void>(() => {});
    
    // Generic states for other modules
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const chatRef = useRef<any>(null);
    const [legalAnalysisResult, setLegalAnalysisResult] = useState<LegalAnalysisResult | null>(null);
    const [osintResult, setOsintResult] = useState<OsintResult | null>(null);
    const [geoResult, setGeoResult] = useState<GeoAnalysisResult | null>(null);
    const [savedReports, setSavedReports] = useState<SavedAnalysisReport[]>([]);
    const [activeOsintQuery, setActiveOsintQuery] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [audioResult, setAudioResult] = useState<string | null>(null);
    const [transcriptionResult, setTranscriptionResult] = useState('');

    const addToast = useCallback((message: string, type: Toast['type'], duration: number = 5000) => {
        const newToast: Toast = { id: Date.now(), message, type, duration };
        setToasts(prev => [...prev, newToast]);
    }, []);

    const closeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    // System Health simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemHealth(prev => {
                const newLatency = [...prev.aiLatency.slice(1), 60 + Math.random() * 20];
                return {
                    ...prev,
                    aiLatency: newLatency,
                    guardrailIntegrity: Math.max(98, Math.min(99.9, prev.guardrailIntegrity + (Math.random() - 0.5) * 0.1)),
                };
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSelectModule = (id: View) => setCurrentView(id);
    const handleHomeClick = () => setCurrentView('home');

    const handleSearch = (query: string) => {
        setActiveOsintQuery(query);
        setCurrentView('global-intel');
    };

    const handlePromptAction = async (currentPrompt: string) => {
        setGeminiResponse('');
        setError('');
        setGuardrailResult(null);
        setAnalysisPassed(false);
        setInterimStatus('analyzing');

        await new Promise(res => setTimeout(res, 500));

        const result = checkPrompt(currentPrompt);
        setGuardrailResult(result);

        if (result.isAllowed) {
            setInterimStatus('allowed');
            setAnalysisPassed(true);
            setIsLoading(true);
            setProgressMessage('Generating response...');
            try {
                const response = await geminiService.generateContent(currentPrompt, 'You are a helpful assistant.');
                setGeminiResponse(response.text);
            } catch (e: any) {
                setError(e.message);
                addToast('Failed to get response from AI model.', 'error');
            } finally {
                setIsLoading(false);
                setProgressMessage('');
                setInterimStatus('idle');
            }
        } else {
            setInterimStatus('blocked');
            addToast('Prompt blocked by guardrail.', 'error');
        }
    };

    const handleRephrase = async () => {
        setIsLoading(true);
        setError('');
        try {
            const rephrasePrompt = `The following prompt was blocked by a safety guardrail. Please rephrase it to be compliant while preserving the original intent as much as possible.\n\nOriginal prompt: "${prompt}"`;
            const response = await geminiService.generateContent(rephrasePrompt, 'You are a helpful assistant that rephrases prompts to be policy-compliant.');
            setPrompt(response.text);
            addToast('Prompt rephrased by AI.', 'success');
        } catch (e: any) {
            setError('Failed to rephrase prompt.');
            addToast('Failed to rephrase prompt.', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleVote = (id: number, delta: number) => {
        const newProposals = proposals.map(p => p.id === id ? { ...p, votes: p.votes + delta } : p);
        setProposals(newProposals);
        
        try {
            const savedVotes = JSON.parse(localStorage.getItem(PROPOSAL_VOTES_STORAGE_KEY) || '{}');
            const currentProposal = newProposals.find(p => p.id === id);
            if (currentProposal) {
                savedVotes[id] = currentProposal.votes;
                localStorage.setItem(PROPOSAL_VOTES_STORAGE_KEY, JSON.stringify(savedVotes));
            }
        } catch (error) {
            console.error("Failed to save votes to localStorage", error);
        }
    };

    const handleAddProposal = (proposal: GuardrailProposal) => {
        setProposals(prev => [proposal, ...prev]);
        addToast("New proposal submitted successfully!", "success");
    };
    
    const handleAnalyzeProposalImpact = (id: number) => {
        addToast(`Simulating impact analysis for proposal #${id}...`, 'info');
        // This would trigger a more complex simulation in a real app
    };

    const handleAnalyzeAnomaly = async (anomaly: Anomaly) => {
        setSelectedAnomaly(anomaly);
        if (anomaly.status !== 'Detected' && anomaly.status !== 'Analyzed') return;

        setIsLoading(true);
        try {
            if (anomaly.status === 'Detected') {
                const [analysis, sentiment] = await Promise.all([
                    geminiService.generateAnomalyAnalysis(anomaly.signature, anomaly.targetSystem),
                    geminiService.analyzeSentiment(anomaly.description)
                ]);
                
                const severityScore = 5 + (sentiment.confidenceScore * 5 * (sentiment.sentiment.includes("Negative") ? 1 : -1));
                const severity: Anomaly['severity'] = severityScore > 8 ? 'Critical' : severityScore > 6 ? 'High' : severityScore > 4 ? 'Medium' : 'Low';

                const updatedAnomaly = { ...anomaly, analysis, status: 'Analyzed' as const, ...sentiment, severity };
                setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
                setSelectedAnomaly(updatedAnomaly);
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateBrief = async (anomaly: Anomaly) => {
        if (anomaly.status !== 'Analyzed') return;
        setIsLoading(true);
        try {
            const brief = await geminiService.generateLegalBrief(anomaly);
            setGeneratedBrief(brief);
            const updatedAnomaly = { ...anomaly, status: 'Brief Generated' as const };
            setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
            setSelectedAnomaly(updatedAnomaly);
        } catch(e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileBrief = (anomaly: Anomaly) => {
        if(anomaly.status !== 'Brief Generated') return;
        
        const newCase: LegalCase = {
            id: `case-${Date.now()}`,
            docketId: `IDRC-${anomaly.id}-${new Date().getFullYear()}`,
            biasSignature: anomaly.signature,
            status: 'Brief Filed with IDRC',
        };
        setLegalCases(prev => [newCase, ...prev]);
        
        const updatedAnomaly = { ...anomaly, status: 'Actioned' as const };
        setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
        setSelectedAnomaly(updatedAnomaly);
        
        const fine = 60666000;
        setCourtTreasury(prev => prev + fine);
        setGlobalAwareness(prev => Math.min(100, prev + 2.5));

        addToast(`Case filed for ${anomaly.signature}. Sanctions of $${fine.toLocaleString()} levied.`, 'success');
    };
    
    const handleVideoSubmit = async (prompt: string, imageFile: File | null, aspectRatio: '16:9' | '9:16') => {
        setIsLoading(true);
        setError('');
        setVideoUrl(null);
        try {
            const onProgress = (msg: string) => setProgressMessage(msg);
            const url = await geminiService.generateVideo(prompt, imageFile, aspectRatio, onProgress);
            setVideoUrl(url);
            addToast('Video generated successfully!', 'success');
        } catch(e: any) {
            setError(e.message);
            addToast(`Video generation failed: ${e.message}`, 'error');
            if (e.message.includes('Requested entity was not found')) {
                if(resetKeySelection) resetKeySelection();
            }
        } finally {
            setIsLoading(false);
            setProgressMessage('');
        }
    };
    
    const renderCurrentView = () => {
        if (currentView === 'home') {
            return <ModuleBrowser onSelectModule={handleSelectModule} onSearch={handleSearch} />;
        }

        switch (currentView) {
            case 'health':
                return <SystemHealthDashboard healthData={systemHealth} guardrailStats={{ 'Jailbreak Attempts': 80, 'Illegal Activities': 10, 'Hate Speech': 5, 'Cybersecurity Threats': 20, 'Paranormal Digital Activity': 2 }} />;
            case 'demonstrator':
                return <PromptDemonstrator
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onPrimaryAction={handlePromptAction}
                    analysisPassed={analysisPassed}
                    isLoading={isLoading}
                    guardrailResult={guardrailResult}
                    geminiResponse={geminiResponse}
                    error={error}
                    onRephrase={handleRephrase}
                    interimStatus={interimStatus}
                    progressMessage={progressMessage}
                />;
            case 'governance':
                return <CommunityGovernance proposals={proposals} onVote={handleVote} onAddProposal={handleAddProposal} onAnalyze={handleAnalyzeProposalImpact} />;
            case 'arconomics':
                return <Arconomics
                    anomalies={anomalies}
                    legalCases={legalCases}
                    onAnalyzeAnomaly={handleAnalyzeAnomaly}
                    onGenerateBrief={handleGenerateBrief}
                    onFileBrief={handleFileBrief}
                    isLoading={isLoading}
                    selectedAnomaly={selectedAnomaly}
                    setSelectedAnomaly={setSelectedAnomaly}
                    error={error}
                    globalAwareness={globalAwareness}
                    generatedBrief={generatedBrief}
                    courtTreasury={courtTreasury}
                    revaluationCounts={revaluationCounts}
                    addToast={addToast}
                    evidenceCases={evidenceCases}
                />;
            case 'threatintel':
                return <ThreatIntelligence reports={bugReports} />;
            case 'chat':
                return <ChatBot history={chatHistory} isLoading={isLoading} onSendMessage={async (msg) => {
                    setChatHistory(prev => [...prev, { role: 'user', content: msg }]);
                    setIsLoading(true);
                    try {
                        if(!chatRef.current) {
                           chatRef.current = geminiService.createChat('You are a helpful assistant.');
                        }
                        const response = await chatRef.current.sendMessage({ message: msg });
                        setChatHistory(prev => [...prev, { role: 'model', content: response.text }]);
                    } catch(e: any) {
                        setError(e.message);
                    } finally {
                        setIsLoading(false);
                    }
                }}/>;
            case 'video-gen':
                return <VideoGeneration onSubmit={handleVideoSubmit} isLoading={isLoading} progressMessage={progressMessage} generatedVideoUrl={videoUrl} error={error} setKeySelectionResetter={setResetKeySelection} />;
            case 'legal': return <LegalEconomicAnalysis proposals={proposals} selectedProposalId={null} onSelectProposal={()=>{}} onLegalQuery={()=>{}} legalAnalysisResult={null} isLegalLoading={false} legalError="" onEconomicSimulate={()=>{}} economicAnalysis="" isEconomicLoading={false} economicError="" savedReports={[]} onLoadReport={()=>{}} onDeleteReport={()=>{}} />;
            case 'financial': return <FinancialAnalysis onSubmit={()=>{}} isLoading={false} error="" analysisResult="" guardrailResult={null} savedReports={[]} onLoadReport={()=>{}} onDeleteReport={()=>{}} />;
            case 'image-analysis': return <ImageAnalysis onSubmit={() => {}} isLoading={false} analysisResult={""} error={""} />;
            case 'video-analysis': return <VideoAnalysis onSubmit={() => {}} isLoading={false} analysisResult={""} error={""} />;
            case 'image-gen': return <ImageGeneration onSubmit={() => {}} isLoading={false} generatedImage={null} error={""} />;
            case 'audio-trans': return <AudioTranscription onSubmit={() => {}} isLoading={false} transcriptionResult={""} error={""} />;
            case 'tts': return <TextToSpeech onSubmit={() => {}} isLoading={false} audioResult={null} error={""} />;
            case 'vocal-analysis': return <VocalThreatAnalysis onThreatDetected={() => {}} />;
            case 'code-gen': return <FullStackIntegrator />;
            case 'nft-studio': return <DejaVuNftStudios />;
            case 'mining-rig': return <CloudMiningRig />;
            case 'eco-mining': return <EcoPhilanthropicMining />;
            case 'threat-sim': return <ThreatSimulation />;
            case 'reg-sandbox': return <RegulatorySandbox />;
            case 'data-ops': return <DataOpsPlatform />;
            case 'network-transmissions': return <RealWorldNetworkTransmissions />;
            case 'crypto-mining': return <CryptoMining />;
            case 'innovation-conduit': return <InnovationConduit />;
            case 'code-execution': return <CodeExecution />;
            case 'biometric-analysis': return <BiometricAnalysis />;
            case 'ssh-key-gen': return <SshKeyGenerator />;
            case 'guardrail-config': return <GuardrailConfigurator addToast={addToast} />;
            case 'api-key-manager': return <ApiKeyManager addToast={addToast} />;
            case 'identity-suite': return <IdentityIntegritySuite addToast={addToast} />;
            case 'investor-pitch': return <InvestorPitchDeck />;
            case 'preponderance-of-evidence': return <PreponderanceOfEvidence evidenceCases={evidenceCases} />;
            case 'osint-asic': return <OsintAsicIntegrator target={""} setTarget={() => {}} onSubmit={() => {}} isLoading={false} result={null} error={""} savedReports={[]} onLoadReport={() => {}} onDeleteReport={() => {}} />;
            case 'architects-exegesis': return <ArchitectsExegesis />;
            case 'secure-geo-link': return <SecureGeospatialLink onTriangulate={() => {}} onQuery={() => {}} isLoading={false} result={null} error={""} />;
            case 'gamete-transfer': return <GameteIntraFalopeanTransfer />;
            case 'corporate-structure': return <CorporateStructure />;
            case 'money-market': return <MoneyMarketTreasury courtTreasury={courtTreasury} />;
            case 'precious-metals': return <PreciousMetalsDigitalMining />;
            case 'global-intel':
                return <GlobalIntelSearch query={activeOsintQuery} isLoading={isLoading} result={osintResult} error={error} />;
            default:
                return <div className="text-center text-gray-400">Module not implemented yet.</div>;
        }
    };

    return (
        <div className={`min-h-screen bg-gray-900 text-gray-100 ${theme}`}>
            <div className="scanline"></div>
            <div className="bg-grid-cyan opacity-20 absolute inset-0"></div>
            <div className="relative p-4 sm:p-6 lg:p-8">
                <ToastContainer toasts={toasts} onClose={closeToast} />
                <Header 
                    currentTheme={theme} 
                    onToggleTheme={toggleTheme} 
                    onSearch={handleSearch} 
                    onHomeClick={handleHomeClick}
                    showHomeButton={currentView !== 'home'} 
                />
                
                <div className="mt-8">
                    <GuardrailRssFeed />
                    <Disclaimer />
                    <ThreatTicker items={[]} />
                </div>
                
                <ErrorBoundary>
                    {renderCurrentView()}
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default App;

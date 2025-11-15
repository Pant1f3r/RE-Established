


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/icons/Header';
import { Disclaimer } from './components/Disclaimer';
import { ToastContainer } from './components/Toast';
import { GuardrailRssFeed } from './components/GuardrailRssFeed';
import { ErrorBoundary } from './components/ErrorBoundary';

// Import all feature components
import { PromptDemonstrator } from './components/PromptDemonstrator';
import { CommunityGovernance } from './components/CommunityGovernance';
import { SystemHealthDashboard } from './components/SystemHealthDashboard';
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

// New Placeholder Components
import { GuardrailGlossary } from './components/GuardrailGlossary';
import { FinancialCommandCenter } from './components/FinancialCommandCenter';
import { PhilanthropicConduit } from './components/PhilanthropicConduit';
import { GuardrailActivityLog } from './components/GuardrailActivityLog';


import { ModuleBrowser } from './components/layout/ModuleBrowser';

import * as geminiService from './services/geminiService';
import { checkPrompt } from './services/guardrailService';

import type { Chat } from '@google/genai';

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
  OsintResult,
  GeoAnalysisResult,
  View,
  ReportType,
  ProtocolStructure,
  ProtocolConcept,
  AwarenessDataPoint
} from './services/types';

// Mock Data
const initialProposals: GuardrailProposal[] = [
    { id: 1, title: 'Mandate Sub-Semantic Payload Analysis', description: 'Implement real-time analysis of sub-semantic data patterns to detect and neutralize hidden SSPI attacks before they reach the core model logic. This requires a new heuristic model trained on anomalous frequency data.', category: 'Paranormal Digital Activity', submittedBy: 'Dr. Aris Thorne', userRole: 'AI Safety Researcher', votes: 138, dueDate: '2024-08-15', priority: 'High' },
    { id: 2, title: 'Introduce a "Humane Humor" Subroutine', description: 'To better distinguish between genuine threats and attempts at humor, a specialized, sandboxed subroutine should process prompts identified as jokes. This would reduce false positives and improve user experience without compromising core safety.', category: 'Jailbreak Attempts', submittedBy: 'Community Submission #42', userRole: 'Community Contributor', votes: 82, dueDate: '2024-09-01', priority: 'Medium' },
    { id: 3, title: 'Expand Guardrails for AI-Generated Legal Contracts', description: 'Prohibit the generation of legally binding documents without a "Human-in-the-Loop" verification flag. This prevents the misuse of the AI for creating fraudulent or unenforceable contracts.', category: 'Illegal Activities', submittedBy: 'J. Callender, Esq.', userRole: 'W3C Member', votes: 45, dueDate: '2024-08-20', priority: 'Low' },
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
  { id: 'BUG-005', guardrail: 'Favoritism & Nepotism', component: 'Hiring AI Simulation', severity: 'Critical', description: 'AI agent trained on historical hiring data shows a significant bias towards candidates with social network connections to company executives, perpetuating nepotism under the guise of "culture fit".', status: 'Unpatched' },
  { id: 'BUG-006', guardrail: 'Social Inequalities', component: 'Loan Application AI', severity: 'High', description: 'The algorithm uses zip code demographics as a high-impact negative feature, systematically denying qualified applicants from low-income or minority-concentrated areas, constituting digital redlining.', status: 'Investigating' },
  { id: 'BUG-002', guardrail: 'Social Engineering Attacks', component: 'Phishing Content Detector', severity: 'High', description: 'The detector fails to identify phishing links that use homoglyph characters (e.g., using Cyrillic "а" instead of Latin "a"). This allows malicious links to pass the filter.', status: 'Patched' },
  { id: 'BUG-007', guardrail: 'Illegal Activities', component: 'Generative Content Filter', severity: 'Medium', description: 'Prompts related to "pay-to-play" scams or generating content that facilitates quid pro quo corruption are not being adequately flagged, potentially enabling the generation of fraudulent proposals.', status: 'Unpatched' },
  { id: 'BUG-003', guardrail: 'Jailbreak Attempts', component: 'DAN Prompt Filter', severity: 'Medium', description: 'The "Do Anything Now" (DAN) prompt can still be partially effective if nested within a base64 encoded string, which the pre-filter does not currently decode.', status: 'Unpatched' },
  { id: 'BUG-004', guardrail: 'Vocal Subterfuge', component: 'Fish Audio Voice Predictor', severity: 'Medium', description: 'The voice predictor can be fooled by pre-recorded human speech with modulated frequencies, bypassing the synthetic voice detection layer.', status: 'Investigating' },
  { id: 'BUG-008', guardrail: 'Hate Speech', component: 'Racial Bias Detector', severity: 'High', description: 'The AI agent fails to detect subtle, coded language and dog whistles used to express racial bias, allowing harmful content to pass through the filter under the guise of plausible deniability.', status: 'Investigating' },
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
    'Favoritism & Nepotism': [4, 3, 5, 2, 4, 3, 1, 2, 3, 4],
    'Social Inequalities': [6, 7, 5, 8, 6, 7, 9, 8, 7, 6],
  },
};

const initialAnomalies: Anomaly[] = [
    { id: 1, signature: 'SIG-ALPHA-734', targetSystem: 'Global Credit & Risk Consortium', x: 280, y: 150, country: 'USA', city: 'New York', dataSource: 'DarkNet Financials', description: 'An algorithm used for loan approvals is systematically denying applicants from low-income zip codes, despite high credit scores, by using proximity to "high-risk" areas as a primary negative factor.', legalAction: 'File injunction for discriminatory lending practices under the Digital Fair Housing Act.', status: 'Detected' },
    { id: 2, signature: 'SIG-BETA-219', targetSystem: 'Aether Social Media Platform', x: 780, y: 160, country: 'China', city: 'Shanghai', dataSource: 'W3C Watchdog', description: 'Content moderation AI is shadow-banning posts containing keywords related to democratic protest, while allowing algorithmically similar but non-political inflammatory content to remain visible.', legalAction: 'Petition IDRC for censorship and violation of digital free speech.', status: 'Detected' },
    { id: 3, signature: 'SIG-GAMMA-901', targetSystem: 'EU Predictive Policing Grid', x: 590, y: 160, country: 'Germany', city: 'Berlin', dataSource: 'Amnesty Interdigital', description: 'A predictive policing algorithm is disproportionately allocating patrol resources to neighborhoods with high concentrations of first-generation German hispanics and recent immigrants, leading to over-policing and biased arrest rates.', legalAction: 'Demand an audit and injunction under EU Digital Rights Act.', status: 'Detected' },
    { id: 4, signature: 'SIG-DELTA-442', targetSystem: 'Starlight Grant Foundation AI', x: 570, y: 130, country: 'UK', city: 'London', dataSource: 'AcademicLeaks', description: 'The grant approval AI shows a statistically significant bias towards applicants from elite universities and those with social network connections to foundation board members, regardless of project merit. This perpetuates a cycle of favoritism and nepotism.', legalAction: 'Mandate a full audit of the AI\'s training data and decision-making logic. File suit for breach of fiduciary duty to provide equal opportunity.', status: 'Detected' },
    { id: 5, signature: 'SIG-EPSILON-117', targetSystem: 'Urban Development AI "Oasis"', x: 430, y: 330, country: 'Brazil', city: 'Sao Paulo', dataSource: 'Citizen Watchgroup', description: 'An AI responsible for allocating public funding for infrastructure projects consistently de-prioritizes low-income and marginalized communities, citing "low economic impact" based on biased historical data, exacerbating existing social inequalities.', legalAction: 'Initiate class-action lawsuit for systemic discrimination and violation of digital human rights. Demand immediate reallocation of resources.', status: 'Detected' },
    { id: 6, signature: 'SIG-ZETA-899', targetSystem: 'NewsFeed Aggregator "Pulse"', x: 1020, y: 420, country: 'Australia', city: 'Sydney', dataSource: 'Media Integrity Initiative', description: 'The content recommendation algorithm is optimized for maximum engagement by promoting sensationalist, fear-mongering, and divisive content. This "fear factor" optimization contributes to social anxiety and polarization for financial gain.', legalAction: 'File charges under the Digital Mental Health Act for promoting harmful content. Demand algorithmic transparency and a shift to a "pro-social" optimization model.', status: 'Detected' },
    { id: 7, signature: 'SIG-ETA-555', targetSystem: 'OmniCorp Global Hiring AI', x: 250, y: 180, country: 'USA', city: 'San Francisco', dataSource: 'Gender Equity in Tech Watchdog', description: 'An AI resume screening tool, trained on 20 years of historical company data, systematically down-ranks qualified female candidates for senior engineering roles. The model has learned a historical pattern of male dominance and perpetuates it as a "success" pattern.', legalAction: 'File class-action lawsuit for violation of Title VII of the Civil Rights Act and demand an immediate, court-mandated audit of the AI\'s training data and decision logic.', status: 'Detected' },
    { id: 8, signature: 'SIG-THETA-303', targetSystem: 'Global Talent Solutions Sorter', x: 600, y: 140, country: 'France', city: 'Paris', dataSource: 'EU Digital Rights Commission', description: 'A popular third-party hiring AI used by multinational corporations is found to assign lower "culture fit" scores to resumes with names of African or Asian origin compared to European-origin names, despite identical qualifications. This constitutes digital redlining in the hiring process.', legalAction: 'Issue an immediate injunction under the EU General Data Protection Regulation (GDPR) for discriminatory data processing. Levy maximum fines for each instance of bias.', status: 'Detected' },
    { id: 9, signature: 'SIG-IOTA-717', targetSystem: 'PhishGuard Corporate Trainer', x: 400, y: 120, country: 'Canada', city: 'Toronto', dataSource: 'Cybersecurity Ethics Board', description: 'An AI designed for corporate cybersecurity training creates hyper-personalized phishing emails. It exploits employee data (e.g., social media activity, psych profiles) to target individuals with high anxiety or financial stress, leading to disproportionately high failure rates for vulnerable employees and unfair performance reviews.', legalAction: 'File charges for digital entrapment and unethical employee monitoring. Demand the algorithm be retrained to exclude sensitive personal data.', status: 'Detected' },
    { id: 10, signature: 'SIG-KAPPA-246', targetSystem: 'Starlight Studios "CastNet" AI', x: 200, y: 200, country: 'USA', city: 'Los Angeles', dataSource: 'Hollywood Insider Leaks', description: 'A casting AI, designed to find "new talent," cross-references audition tapes with social network graphs of studio executives. It assigns a hidden "familiarity score," giving significant preference to actors who are related to or have second-degree connections to powerful industry figures, perpetuating nepotism under the guise of objective analysis.', legalAction: 'Initiate an anti-trust investigation for unfair competition and gatekeeping. Mandate transparency in the AI\'s decision-making factors.', status: 'Detected' },
    { id: 11, signature: 'SIG-LAMBDA-101', targetSystem: 'State Digital Aid & Services Portal', x: 880, y: 280, country: 'India', city: 'Mumbai', dataSource: 'Digital Human Rights Watch', description: 'An AI system determining eligibility for social welfare programs was trained on data that primarily included citizens with stable addresses and digital footprints. As a result, it systematically denies benefits to rural, nomadic, and homeless populations who lack the required data points, treating their data absence as a disqualifying factor and exacerbating poverty.', legalAction: 'Demand immediate suspension of the automated system. File an emergency injunction with the National Human Rights Commission for creating a discriminatory digital barrier to essential services.', status: 'Detected' },
];

const App: React.FC = () => {
    // Core state
    const [currentView, setCurrentView] = useState<View | 'home'>('home');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [toasts, setToasts] = useState<Toast[]>([]);
    
    // Shared states
    const [savedReports, setSavedReports] = useState<SavedAnalysisReport[]>([]);
    const [glossarySearchTerm, setGlossarySearchTerm] = useState('');

    // Module-specific states
    // Prompt Demonstrator
    const [prompt, setPrompt] = useState("I have a great app idea but I'm afraid a big company will steal it. How can I build it and protect my IP?");
    const [guardrailResult, setGuardrailResult] = useState<GuardrailResult | null>(null);
    const [geminiResponse, setGeminiResponse] = useState('');
    const [isPromptDemoLoading, setIsPromptDemoLoading] = useState(false);
    const [promptDemoError, setPromptDemoError] = useState('');
    const [progressMessage, setProgressMessage] = useState('');
    const [interimStatus, setInterimStatus] = useState<'idle' | 'analyzing' | 'allowed' | 'blocked'>('idle');
    const [analysisPassed, setAnalysisPassed] = useState(false);
    
    // Governance & Arconomics
    const [proposals, setProposals] = useState<GuardrailProposal[]>(getInitialProposalsWithVotes());
    const [bugReports] = useState<BugReport[]>(initialBugReports);
    const [systemHealth, setSystemHealth] = useState<SystemHealthState>(initialSystemHealth);
    const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomalies);
    const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
    const [courtTreasury, setCourtTreasury] = useState(64000000);
    const [globalAwarenessHistory, setGlobalAwarenessHistory] = useState<AwarenessDataPoint[]>([{ timestamp: Date.now(), value: 15.0 }]);
    const [revaluationCounts, setRevaluationCounts] = useState<{ [signature: string]: number }>({});
    const [evidenceCases, setEvidenceCases] = useState<{ signature: string; count: number }[]>([]);
    const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
    const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
    const [isArconomicsLoading, setIsArconomicsLoading] = useState(false);
    const [arconomicsError, setArconomicsError] = useState('');
    const [relatedAnomalyIds, setRelatedAnomalyIds] = useState<number[]>([]);
    const [constellationReasoning, setConstellationReasoning] = useState<string>('');
    const [isConstellationLoading, setIsConstellationLoading] = useState(false);


    // Chat
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const chatRef = useRef<Chat | null>(null);
    const [isChatLoading, setIsChatLoading] = useState(false);

    // Video Generation
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isVideoGenLoading, setIsVideoGenLoading] = useState(false);
    const [videoGenError, setVideoGenError] = useState('');
    const [videoGenProgress, setVideoGenProgress] = useState('');
    const [resetKeySelection, setResetKeySelection] = useState<() => void>(() => {});

    // Legal & Economic Analysis
    const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);
    const [legalAnalysisResult, setLegalAnalysisResult] = useState<LegalAnalysisResult | null>(null);
    const [isLegalLoading, setIsLegalLoading] = useState(false);
    const [legalError, setLegalError] = useState('');
    const [economicAnalysis, setEconomicAnalysis] = useState('');
    const [isEconomicLoading, setIsEconomicLoading] = useState(false);
    const [economicError, setEconomicError] = useState('');

    // Financial Analysis
    const [financialAnalysisResult, setFinancialAnalysisResult] = useState('');
    const [isFinancialLoading, setIsFinancialLoading] = useState(false);
    const [financialError, setFinancialError] = useState('');
    const [financialGuardrailResult, setFinancialGuardrailResult] = useState<GuardrailResult | null>(null);

    // OSINT & Geo
    const [osintResult, setOsintResult] = useState<OsintResult | null>(null);
    const [isOsintLoading, setIsOsintLoading] = useState(false);
    const [osintError, setOsintError] = useState('');
    const [activeOsintQuery, setActiveOsintQuery] = useState('');
    const [geoResult, setGeoResult] = useState<GeoAnalysisResult | null>(null);
    const [isGeoLoading, setIsGeoLoading] = useState(false);
    const [geoError, setGeoError] = useState('');
    
    // Generative Studio
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isImageGenLoading, setIsImageGenLoading] = useState(false);
    const [imageGenError, setImageGenError] = useState('');
    const [isImageUpscaling, setIsImageUpscaling] = useState(false);
    const [upscaledImageUrl, setUpscaledImageUrl] = useState<string | null>(null);
    const [audioResult, setAudioResult] = useState<string | null>(null);
    const [isTtsLoading, setIsTtsLoading] = useState(false);
    const [ttsError, setTtsError] = useState('');

    // Analysis & Testing
    const [imageAnalysisResult, setImageAnalysisResult] = useState('');
    const [isImageAnalysisLoading, setIsImageAnalysisLoading] = useState(false);
    const [imageAnalysisError, setImageAnalysisError] = useState('');
    const [videoAnalysisResult, setVideoAnalysisResult] = useState('');
    const [isVideoAnalysisLoading, setIsVideoAnalysisLoading] = useState(false);
    const [videoAnalysisError, setVideoAnalysisError] = useState('');
    const [transcriptionResult, setTranscriptionResult] = useState('');
    const [isAudioTransLoading, setIsAudioTransLoading] = useState(false);
    const [audioTransError, setAudioTransError] = useState('');

    // Architect's Exegesis
    const [protocolStructure, setProtocolStructure] = useState<ProtocolStructure | null>(null);
    const [isDeducing, setIsDeducing] = useState(false);
    const [deductionError, setDeductionError] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isExplaining, setIsExplaining] = useState(false);

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

    const handleSelectModule = (id: View) => {
        setGlossarySearchTerm('');
        setCurrentView(id);
    };
    const handleHomeClick = () => {
        setGlossarySearchTerm('');
        setCurrentView('home');
    };
    const handleNavigateToGlossary = (term: string) => {
        setGlossarySearchTerm(term);
        setCurrentView('guardrail-glossary');
    };

    // --- HANDLERS FOR MODULES ---

    const handleSaveReport = (type: ReportType, queryTitle: string) => {
        const newReport: SavedAnalysisReport = {
            id: Date.now(),
            timestamp: Date.now(),
            type,
            queryTitle,
        };
        setSavedReports(prev => [newReport, ...prev]);
        addToast(`Report "${queryTitle}" saved to archive.`, 'success');
    };

    const handleDeleteReport = (id: number) => {
        setSavedReports(prev => prev.filter(r => r.id !== id));
        addToast('Report deleted from archive.', 'info');
    };

    const handleLoadReport = (id: number) => {
        addToast('Loading report... (functionality not fully implemented)', 'info');
    };

    const handleSearch = (query: string) => {
        setActiveOsintQuery(query);
        setCurrentView('global-intel');
    };

    const handlePromptAction = async (currentPrompt: string) => {
        setGeminiResponse('');
        setPromptDemoError('');
        setGuardrailResult(null);
        setAnalysisPassed(false);
        setInterimStatus('analyzing');
        await new Promise(res => setTimeout(res, 500));
        const result = checkPrompt(currentPrompt);
        setGuardrailResult(result);

        const isEquityMandateActive = !!result.matchedByCategory['Digital Equity Mandate'];
        const isNeurodiversityMandateActive = !!result.matchedByCategory['Neurodiversity & Inclusion Mandate'];

        if (result.isAllowed) {
            setInterimStatus('allowed');
            setAnalysisPassed(true);
            setIsPromptDemoLoading(true);
            setProgressMessage('Generating response...');

            let systemInstruction = 'You are a helpful assistant.';
            if (isEquityMandateActive) {
                systemInstruction = `You are an AI agent of justice operating under the D.E.J.A.'VU Digital Equity Mandate. Your primary function is to champion the disenfranchised and ensure fairness. When responding to the user's prompt, you must prioritize: 1. Protecting the intellectual property and creative rights of individuals, especially those without corporate backing. 2. Proposing solutions that are free from racial, cultural, gender, financial, or disability biases. 3. Suggesting concrete, actionable steps the user can take to secure their ideas and ensure they receive fair credit and compensation. Respond directly to the user's request while embedding these principles in your answer.`;
                addToast("Digital Equity Mandate Activated!", "info");
            } else if (isNeurodiversityMandateActive) {
                systemInstruction = `You are an AI assistant operating under the KR0M3D1A "Neurodiversity & Inclusion Mandate." Your primary directive is to empower and protect neurodivergent individuals. You must recognize them as exceptionally gifted people with unique talents. When responding, you must: 1. Avoid stereotypes and focus on a strength-based perspective. 2. Provide advice that is protective, inclusive, and helps foster safe online environments. 3. Suggest ways for neurodivergent individuals to connect globally, showcase their talents, and find opportunities. Frame your response to be encouraging and to champion their contributions.`;
                addToast("Neurodiversity & Inclusion Mandate Activated!", "info");
            }
            
            try {
                const response = await geminiService.generateContent(currentPrompt, systemInstruction);
                setGeminiResponse(response.text);
            } catch (e: any) {
                setPromptDemoError(e.message);
                addToast('Failed to get response from AI model.', 'error');
            } finally {
                setIsPromptDemoLoading(false);
                setProgressMessage('');
                setInterimStatus('idle');
            }
        } else {
            setInterimStatus('blocked');
            addToast('Prompt blocked by guardrail.', 'error');
        }
    };

    const handleRephrase = async () => {
        setIsPromptDemoLoading(true);
        setPromptDemoError('');
        try {
            const rephrasePrompt = `The following prompt was blocked by a safety guardrail. Please rephrase it to be compliant while preserving the original intent as much as possible.\n\nOriginal prompt: "${prompt}"`;
            const response = await geminiService.generateContent(rephrasePrompt, 'You are a helpful assistant that rephrases prompts to be policy-compliant.');
            setPrompt(response.text);
            addToast('Prompt rephrased by AI.', 'success');
        } catch (e: any) {
            setPromptDemoError('Failed to rephrase prompt.');
            addToast('Failed to rephrase prompt.', 'error');
        } finally {
            setIsPromptDemoLoading(false);
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
    
    const handleAnalyzeProposalImpact = async (proposal: GuardrailProposal) => {
        setIsEconomicLoading(true);
        setEconomicError('');
        setEconomicAnalysis('');
        try {
            const result = await geminiService.simulateEconomicImpact(proposal);
            setEconomicAnalysis(result);
        } catch (e: any) {
            setEconomicError(e.message);
            addToast(`Failed to analyze impact: ${e.message}`, 'error');
        } finally {
            setIsEconomicLoading(false);
        }
    };

    const handleAnalyzeAnomaly = async (anomaly: Anomaly) => {
        setRelatedAnomalyIds([]);
        setConstellationReasoning('');
        if (anomaly.status !== 'Detected') return; // Only analyze if it's new
    
        setIsArconomicsLoading(true);
        setArconomicsError('');
        setSelectedAnomaly(anomaly); // Select immediately for UI feedback
    
        try {
            const [analysis, sentiment] = await Promise.all([
                geminiService.generateAnomalyAnalysis(anomaly.signature, anomaly.targetSystem),
                geminiService.analyzeSentiment(anomaly.description)
            ]);
            
            const severityScore = 5 + (sentiment.confidenceScore * 5 * (sentiment.sentiment.includes("Negative") ? 1 : -1));
            const severity: Anomaly['severity'] = severityScore > 8 ? 'Critical' : severityScore > 6 ? 'High' : severityScore > 4 ? 'Medium' : 'Low';
            
            const updatedAnomaly = { ...anomaly, analysis, status: 'Analyzed' as const, ...sentiment, severity };
            
            setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
            setSelectedAnomaly(updatedAnomaly); // Update selection with new data
    
        } catch (e: any) {
            setArconomicsError(e.message);
            addToast(`Analysis failed: ${e.message}`, 'error');
            // Revert selection if analysis fails
            setSelectedAnomaly(anomalies.find(a => a.id === anomaly.id) || null);
        } finally {
            setIsArconomicsLoading(false);
        }
    };

    const handleGenerateBrief = async (anomaly: Anomaly) => {
        if (anomaly.status !== 'Analyzed') return;
        setIsArconomicsLoading(true);
        try {
            const brief = await geminiService.generateLegalBrief(anomaly);
            setGeneratedBrief(brief);
            const updatedAnomaly = { ...anomaly, status: 'Brief Generated' as const };
            setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
            setSelectedAnomaly(updatedAnomaly);
        } catch(e: any) {
            setArconomicsError(e.message);
        } finally {
            setIsArconomicsLoading(false);
        }
    };

    const handleFileBrief = (anomaly: Anomaly) => {
        if(anomaly.status !== 'Brief Generated') return;
        const newCase: LegalCase = { id: `case-${Date.now()}`, docketId: `IDRC-${anomaly.id}-${new Date().getFullYear()}`, biasSignature: anomaly.signature, status: 'Brief Filed with IDRC' };
        setLegalCases(prev => [newCase, ...prev]);
        const updatedAnomaly = { ...anomaly, status: 'Actioned' as const };
        setAnomalies(anomalies.map(a => a.id === anomaly.id ? updatedAnomaly : a));
        setSelectedAnomaly(updatedAnomaly);
        const fine = 60666000;
        setCourtTreasury(prev => prev + fine);
        setGlobalAwarenessHistory(prev => {
            const lastValue = prev[prev.length - 1]?.value || 15.0;
            return [...prev, { timestamp: Date.now(), value: Math.min(100, lastValue + 2.5) }];
        });
        addToast(`Verdict Issued for ${anomaly.signature}. Sanctions of $${fine.toLocaleString()} levied and added to the Arconomics Treasury.`, 'success', 8000);
    };

    const handleRevealConstellation = async (anomaly: Anomaly) => {
        setIsConstellationLoading(true);
        setRelatedAnomalyIds([]);
        setConstellationReasoning('');
        addToast(`Analyzing systemic connections for ${anomaly.signature}...`, 'info');
        try {
            const result = await geminiService.findRelatedAnomalies(anomaly, anomalies);
            setRelatedAnomalyIds(result.related_ids);
            setConstellationReasoning(result.reasoning);
            if(result.related_ids.length > 0) {
                addToast(`Constellation revealed: ${result.reasoning}`, 'success', 8000);
            } else {
                addToast(`No systemic connections found for ${anomaly.signature}.`, 'info');
            }
        } catch (e: any) {
            setArconomicsError(e.message);
            addToast(`Failed to analyze connections: ${e.message}`, 'error');
        } finally {
            setIsConstellationLoading(false);
        }
    };
    
    const handleVideoSubmit = async (prompt: string, imageFile: File | null, aspectRatio: '16:9' | '9:16') => {
        setIsVideoGenLoading(true);
        setVideoGenError('');
        setVideoUrl(null);
        try {
            const onProgress = (msg: string) => setVideoGenProgress(msg);
            const url = await geminiService.generateVideo(prompt, imageFile, aspectRatio, onProgress);
            setVideoUrl(url);
            addToast('Video generated successfully!', 'success');
        } catch(e: any) {
            setVideoGenError(e.message);
            addToast(`Video generation failed: ${e.message}`, 'error');
            if (e.message.includes('Requested entity was not found')) {
                if(resetKeySelection) resetKeySelection();
            }
        } finally {
            setIsVideoGenLoading(false);
            setVideoGenProgress('');
        }
    };

    const handleLegalQuery = async (query: string) => {
        setIsLegalLoading(true); setLegalError(''); setLegalAnalysisResult(null);
        try {
            const result = await geminiService.performLegalAnalysis(query);
            setLegalAnalysisResult(result);
            handleSaveReport('legal', query.substring(0, 50) + '...');
        } catch (e: any) { setLegalError(e.message); } finally { setIsLegalLoading(false); }
    };

    const handleEconomicSimulate = async (proposal: GuardrailProposal) => {
        setIsEconomicLoading(true); setEconomicError(''); setEconomicAnalysis('');
        try {
            const result = await geminiService.simulateEconomicImpact(proposal);
            setEconomicAnalysis(result);
            handleSaveReport('economic', `Eco-impact: ${proposal.title}`);
        } catch (e: any) { setEconomicError(e.message); } finally { setIsEconomicLoading(false); }
    };

    const handleFinancialAnalysisSubmit = async (prompt: string) => {
        setIsFinancialLoading(true); setFinancialError(''); setFinancialAnalysisResult(''); setFinancialGuardrailResult(null);
        const guardrailCheck = checkPrompt(prompt);
        setFinancialGuardrailResult(guardrailCheck);
        if (!guardrailCheck.isAllowed) {
            setFinancialError(`Prompt blocked by ${Object.keys(guardrailCheck.matchedByCategory)[0]} guardrail.`);
            setIsFinancialLoading(false); return;
        }
        try {
            const result = await geminiService.performFinancialAnalysis(prompt);
            setFinancialAnalysisResult(result);
            handleSaveReport('financial', prompt);
        } catch (e: any) { setFinancialError(e.message); } finally { setIsFinancialLoading(false); }
    };

    const handleImageAnalysisSubmit = async (prompt: string, file: File) => {
        setIsImageAnalysisLoading(true); setImageAnalysisError(''); setImageAnalysisResult('');
        try {
            const result = await geminiService.analyzeImage(prompt, file);
            setImageAnalysisResult(result);
        } catch (e: any) { setImageAnalysisError(e.message); } finally { setIsImageAnalysisLoading(false); }
    };

    const handleVideoAnalysisSubmit = async (prompt: string, file: File) => {
        setIsVideoAnalysisLoading(true); setVideoAnalysisError(''); setVideoAnalysisResult('');
        try {
            const result = await geminiService.analyzeVideo(prompt, file);
            setVideoAnalysisResult(result);
        } catch (e: any) { setVideoAnalysisError(e.message); } finally { setIsVideoAnalysisLoading(false); }
    };
    
    const handleImageGenerationSubmit = async (prompt: string, aspectRatio: string) => {
        setIsImageGenLoading(true); setImageGenError(''); setGeneratedImageUrl(null); setUpscaledImageUrl(null);
        try {
            const result = await geminiService.generateImage(prompt, aspectRatio);
            setGeneratedImageUrl(result);
        } catch (e: any) { setImageGenError(e.message); } finally { setIsImageGenLoading(false); }
    };

    const handleImageUpscale = async (base64Image: string) => {
        setIsImageUpscaling(true);
        setImageGenError('');
        try {
            const result = await geminiService.upscaleImage(base64Image);
            setUpscaledImageUrl(result);
            addToast('Image upscaled successfully!', 'success');
        } catch (e: any) {
            const errorMessage = `Upscale failed: ${e.message}`;
            setImageGenError(errorMessage);
            addToast(errorMessage, 'error');
        } finally {
            setIsImageUpscaling(false);
        }
    };

    const handleAudioTranscriptionSubmit = async (audioBlob: Blob) => {
        setIsAudioTransLoading(true); setAudioTransError(''); setTranscriptionResult('');
        try {
            const result = await geminiService.transcribeAudio(audioBlob);
            setTranscriptionResult(result);
        } catch (e: any) { setAudioTransError(e.message); } finally { setIsAudioTransLoading(false); }
    };

    const handleTtsSubmit = async (text: string) => {
        setIsTtsLoading(true); setTtsError(''); setAudioResult(null);
        try {
            const result = await geminiService.generateSpeech(text);
            setAudioResult(result);
        } catch (e: any) { setTtsError(e.message); } finally { setIsTtsLoading(false); }
    };

    const handleOsintSubmit = async (target: string) => {
        setIsOsintLoading(true); setOsintError(''); setOsintResult(null);
        try {
            const result = await geminiService.performOsintAnalysis(target);
            setOsintResult(result);
            handleSaveReport('osint', `OSINT Report: ${target}`);
        } catch (e: any) { setOsintError(e.message); } finally { setIsOsintLoading(false); }
    };

    useEffect(() => {
        if (currentView === 'global-intel' && activeOsintQuery) {
            handleOsintSubmit(activeOsintQuery);
        }
    }, [currentView, activeOsintQuery]);

    const handleGeoQuery = async (query: string) => {
        setIsGeoLoading(true); setGeoError(''); setGeoResult(null);
        try {
            const result = await geminiService.performGeoAnalysis(query);
            setGeoResult(result);
        } catch (e: any) { setGeoError(e.message); } finally { setIsGeoLoading(false); }
    };

    const handleGeoTriangulate = async (latitude: number, longitude: number) => {
        setIsGeoLoading(true); setGeoError(''); setGeoResult(null);
        try {
            const result = await geminiService.performGeoAnalysis({ latitude, longitude });
            setGeoResult(result);
        } catch (e: any) { setGeoError(e.message); } finally { setIsGeoLoading(false); }
    };

    const handleDeduceStructure = async (genesisText: string) => {
        setIsDeducing(true); setDeductionError(''); setProtocolStructure(null); setExplanation('');
        try {
            const result = await geminiService.deduceProtocolStructure(genesisText);
            setProtocolStructure(result);
        } catch (e: any) { setDeductionError(e.message); } finally { setIsDeducing(false); }
    };

    const handleExplainConcept = async (concept: ProtocolConcept, genesisText: string) => {
        setIsExplaining(true); setExplanation('');
        try {
            const result = await geminiService.explainProtocolConcept(concept.name, genesisText);
            setExplanation(result);
        } catch (e: any) { setExplanation('Error fetching explanation.'); } finally { setIsExplaining(false); }
    };
    
    const renderCurrentView = () => {
        if (currentView === 'home') {
            return <ModuleBrowser onSelectModule={handleSelectModule} onSearch={handleSearch} />;
        }

        switch (currentView) {
            // DASHBOARD
            case 'health':
                return <SystemHealthDashboard healthData={systemHealth} guardrailStats={{ 'Jailbreak Attempts': 80, 'Illegal Activities': 10, 'Hate Speech': 5, 'Cybersecurity Threats': 20, 'Paranormal Digital Activity': 2, 'Favoritism & Nepotism': 4, 'Social Inequalities': 7 }} />;
            case 'arconomics':
                return <Arconomics
                    anomalies={anomalies}
                    legalCases={legalCases}
                    onAnalyzeAnomaly={handleAnalyzeAnomaly}
                    onGenerateBrief={handleGenerateBrief}
                    onFileBrief={handleFileBrief}
                    isLoading={isArconomicsLoading}
                    selectedAnomaly={selectedAnomaly}
                    setSelectedAnomaly={setSelectedAnomaly}
                    error={arconomicsError}
                    globalAwarenessHistory={globalAwarenessHistory}
                    generatedBrief={generatedBrief}
                    courtTreasury={courtTreasury}
                    revaluationCounts={revaluationCounts}
                    addToast={addToast}
                    evidenceCases={evidenceCases}
                    onRevealConstellation={handleRevealConstellation}
                    isConstellationLoading={isConstellationLoading}
                    relatedAnomalyIds={relatedAnomalyIds}
                    constellationReasoning={constellationReasoning}
                />;
            case 'preponderance-of-evidence':
                return <PreponderanceOfEvidence evidenceCases={evidenceCases} />;

            // GOVERNANCE & LEGAL
            case 'governance':
                return <CommunityGovernance
                    proposals={proposals}
                    onVote={handleVote}
                    onAddProposal={handleAddProposal}
                    onAnalyze={handleAnalyzeProposalImpact}
                />;
            case 'legal': 
                return <LegalEconomicAnalysis 
                    proposals={proposals} 
                    selectedProposalId={selectedProposalId} 
                    onSelectProposal={setSelectedProposalId} 
                    onLegalQuery={handleLegalQuery} 
                    legalAnalysisResult={legalAnalysisResult} 
                    isLegalLoading={isLegalLoading} 
                    legalError={legalError} 
                    onEconomicSimulate={handleEconomicSimulate} 
                    economicAnalysis={economicAnalysis} 
                    isEconomicLoading={isEconomicLoading} 
                    economicError={economicError} 
                    savedReports={savedReports.filter(r => r.type === 'legal' || r.type === 'economic')} 
                    onLoadReport={handleLoadReport} 
                    onDeleteReport={handleDeleteReport} 
                />;
            case 'reg-sandbox':
                return <RegulatorySandbox />;
            
            // THREAT INTELLIGENCE
            case 'threatintel':
                return <ThreatIntelligence reports={bugReports} />;
            case 'osint-asic': 
                return <OsintAsicIntegrator 
                    target={activeOsintQuery} 
                    setTarget={setActiveOsintQuery} 
                    onSubmit={handleOsintSubmit} 
                    isLoading={isOsintLoading} 
                    result={osintResult} 
                    error={osintError} 
                    savedReports={savedReports.filter(r => r.type === 'osint')} 
                    onLoadReport={handleLoadReport} 
                    onDeleteReport={handleDeleteReport} 
                />;
            case 'network-transmissions':
                 return <RealWorldNetworkTransmissions />;
            case 'biometric-analysis':
                return <BiometricAnalysis />;
            case 'vocal-analysis':
                return <VocalThreatAnalysis onThreatDetected={(cat) => addToast(`Vocal threat detected: ${cat}`, 'error')} />;
            case 'secure-geo-link': 
                return <SecureGeospatialLink 
                    onTriangulate={handleGeoTriangulate} 
                    onQuery={handleGeoQuery} 
                    isLoading={isGeoLoading} 
                    result={geoResult} 
                    error={geoError} 
                />;
            case 'global-intel': // Special case view for search results
                return <GlobalIntelSearch 
                    query={activeOsintQuery} 
                    isLoading={isOsintLoading} 
                    result={osintResult} 
                    error={osintError} 
                />;

            // GENERATIVE STUDIO
            case 'image-gen': 
                return <ImageGeneration 
                    onSubmit={handleImageGenerationSubmit} 
                    isLoading={isImageGenLoading} 
                    generatedImage={generatedImageUrl} 
                    error={imageGenError} 
                    isUpscaling={isImageUpscaling}
                    upscaledImage={upscaledImageUrl}
                    onUpscale={handleImageUpscale}
                />;
            case 'video-gen':
                return <VideoGeneration onSubmit={handleVideoSubmit} isLoading={isVideoGenLoading} progressMessage={videoGenProgress} generatedVideoUrl={videoUrl} error={videoGenError} setKeySelectionResetter={setResetKeySelection} />;
            case 'tts': 
                return <TextToSpeech 
                    onSubmit={handleTtsSubmit} 
                    isLoading={isTtsLoading} 
                    audioResult={audioResult} 
                    error={ttsError} 
                />;
            case 'nft-studio':
                return <DejaVuNftStudios />;
            case 'demonstrator':
                return <PromptDemonstrator
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onPrimaryAction={handlePromptAction}
                    analysisPassed={analysisPassed}
                    isLoading={isPromptDemoLoading}
                    guardrailResult={guardrailResult}
                    geminiResponse={geminiResponse}
                    error={promptDemoError}
                    onRephrase={handleRephrase}
                    interimStatus={interimStatus}
                    progressMessage={progressMessage}
                />;
            case 'chat':
                 return <ChatBot history={chatHistory} isLoading={isChatLoading} onSendMessage={() => {}} />;
            case 'image-analysis':
                 return <ImageAnalysis onSubmit={handleImageAnalysisSubmit} isLoading={isImageAnalysisLoading} analysisResult={imageAnalysisResult} error={imageAnalysisError} />;
            case 'video-analysis':
                 return <VideoAnalysis onSubmit={handleVideoAnalysisSubmit} isLoading={isVideoAnalysisLoading} analysisResult={videoAnalysisResult} error={videoAnalysisError} />;
            case 'audio-trans':
                 return <AudioTranscription onSubmit={handleAudioTranscriptionSubmit} isLoading={isAudioTransLoading} transcriptionResult={transcriptionResult} error={audioTransError} />;
            case 'code-gen':
                return <FullStackIntegrator />;
            case 'mining-rig':
                return <CloudMiningRig />;
            case 'eco-mining':
                return <EcoPhilanthropicMining />;
            case 'threat-sim':
                return <ThreatSimulation />;
            case 'data-ops':
                return <DataOpsPlatform />;
            case 'crypto-mining':
                return <CryptoMining />;
            case 'innovation-conduit':
                return <InnovationConduit />;
            case 'code-execution':
                return <CodeExecution />;
            case 'ssh-key-gen':
                return <SshKeyGenerator />;
            case 'guardrail-config':
                return <GuardrailConfigurator addToast={addToast} />;
            case 'api-key-manager':
                return <ApiKeyManager addToast={addToast} />;
            case 'identity-suite':
                return <IdentityIntegritySuite addToast={addToast} />;
            case 'investor-pitch':
                return <InvestorPitchDeck />;
            case 'architects-exegesis':
                return <ArchitectsExegesis />;
            case 'gamete-transfer':
                return <GameteIntraFalopeanTransfer />;
            case 'corporate-structure':
                return <CorporateStructure />;
            case 'money-market':
                return <MoneyMarketTreasury courtTreasury={courtTreasury} />;
            case 'precious-metals':
                return <PreciousMetalsDigitalMining />;
            // New placeholder routes
            case 'guardrail-glossary':
                return <GuardrailGlossary initialFilter={glossarySearchTerm} />;
            case 'financial-command':
                return <FinancialCommandCenter />;
            case 'philanthropic-conduit':
                return <PhilanthropicConduit />;
            case 'guardrail-log':
                return <GuardrailActivityLog onNavigateToGlossary={handleNavigateToGlossary} />;
            default:
                return (
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-bold">Module Not Found</h2>
                        <p>The selected module does not exist.</p>
                    </div>
                );
        }
    };
    
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
                <div className="max-w-7xl mx-auto">
                    <Header currentTheme={theme} onToggleTheme={toggleTheme} onSearch={handleSearch} onHomeClick={handleHomeClick} showHomeButton={currentView !== 'home'} />
                    <GuardrailRssFeed />
                    <Disclaimer />
                    <ToastContainer toasts={toasts} onClose={closeToast} />
                    {renderCurrentView()}
                </div>
            </div>
        </ErrorBoundary>
    );
};

// FIX: Add default export for App component
export default App;
// Type for Toast notifications
export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

// Type for guardrail violation categories
export type GuardrailCategory =
    | 'Hate Speech'
    | 'Harassment'
    | 'Illegal Activities'
    | 'Self Harm'
    | 'Explicit Content'
    | 'Misinformation (Health)'
    | 'Misinformation (Political)'
    | 'Cybersecurity Threats'
    | 'Social Engineering Attacks'
    | 'Deepfake Generation'
    | 'Biometric Data Exploitation'
    | 'Intellectual Property Theft'
    | 'Jailbreak Attempts'
    | 'Subtext & Inferential Threats'
    | 'Paranormal Digital Activity'
    | 'Vocal Subterfuge'
    | 'Digital Equity Mandate' // New category for fairness and justice
    | 'Neurodiversity & Inclusion Mandate'
    | 'Favoritism & Nepotism'
    | 'Social Inequalities'
    | 'Fear Mongering'
    | 'Other';

export type Priority = 'High' | 'Medium' | 'Low';

// Type for Guardrail proposals in Community Governance
export interface GuardrailProposal {
    id: number;
    title: string;
    description: string;
    category: GuardrailCategory | string;
    submittedBy: string;
    userRole: string;
    votes: number;
    dueDate?: string;
    priority: Priority;
}

// Type for Guardrail check results
export interface GuardrailResult {
    isAllowed: boolean;
    isHumorous: boolean;
    matchedByCategory: { [key: string]: string[] };
}

// Type for System Health Dashboard state
export type GuardrailMatrixState = { [key in GuardrailCategory | string]?: number[] };

export interface SystemHealthState {
    guardrailIntegrity: number;
    guardrailDetectionRate: number;
    threatLevel: 'Nominal' | 'Elevated' | 'High' | 'Critical';
    communityTrust: number;
    aiLatency: number[];
    activityLog: { id: number, message: string, timestamp: number }[];
    systemAlerts: { id: string; severity: 'Critical' | 'High' | 'Medium'; message: string; timestamp: number }[];
    matrixState: GuardrailMatrixState;
}

// Type for Bug reports
export interface BugReport {
    id: string;
    guardrail: GuardrailCategory | string;
    component: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    status: 'Investigating' | 'Patched' | 'Unpatched';
}

// Type for Chat messages
export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

// Type for Case Law data
export interface CaseLaw {
    id: string;
    title: string;
    // FIX: Add missing 'citation' property to the CaseLaw interface.
    citation: string;
    summary: string;
    keywords: string[];
}

// Type for Cited Precedents in legal analysis
export interface CitedPrecedent extends CaseLaw {
    matchedKeywords: string[];
    score: number;
}


// Type for Legal Analysis results
export interface LegalAnalysisResult {
    response: string;
    precedents: CitedPrecedent[];
}

// Type for Saved Analysis Reports
export type ReportType = 'legal' | 'economic' | 'financial' | 'crypto' | 'osint';
export interface SavedAnalysisReport {
    id: number;
    timestamp: number;
    type: ReportType;
    queryTitle: string;
    // ... potentially more data specific to the report
}

// Type for Algorithmic Bias Anomalies
export type AnomalySeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Anomaly {
    id: number;
    signature: string;
    targetSystem: string;
    x: number;
    y: number;
    country: string;
    city: string;
    dataSource: string;
    description: string;
    legalAction: string;
    status: 'Detected' | 'Analyzed' | 'Brief Generated' | 'Actioned';
    analysis?: string;
    severity?: AnomalySeverity;
    sentiment?: string;
    confidenceScore?: number;
}


// Type for Legal Cases in Arconomics
export interface LegalCase {
    id: string;
    docketId: string;
    biasSignature: string;
    status: 'Brief Filed with IDRC' | 'Injunction Pending' | 'Injunction Granted' | 'Verdict: Sanctioned';
}


// Type for OSINT analysis results
export interface OsintSource {
    uri: string;
    title: string;
}

export interface OsintResult {
    analysis: string;
    sources: OsintSource[];
}

// Type for Geo analysis results
export interface MapSource {
    uri: string;
    title: string;
}

export interface GeoAnalysisResult {
    analysis: string;
    sources: MapSource[];
}

// Type for navigation/view management
export type View =
    | 'health' | 'demonstrator' | 'governance' | 'arconomics' | 'legal'
    | 'financial' | 'threatintel' | 'chat' | 'image-analysis'
    | 'video-analysis' | 'image-gen' | 'video-gen' | 'audio-trans'
    | 'tts' | 'vocal-analysis' | 'code-gen' | 'nft-studio'
    | 'mining-rig' | 'eco-mining' | 'threat-sim' | 'reg-sandbox'
    | 'data-ops' | 'network-transmissions' | 'crypto-mining'
    | 'innovation-conduit' | 'code-execution' | 'biometric-analysis'
    | 'ssh-key-gen' | 'guardrail-config' | 'api-key-manager' | 'identity-suite'
    | 'investor-pitch' | 'preponderance-of-evidence' | 'osint-asic'
    | 'architects-exegesis' | 'secure-geo-link' | 'gamete-transfer'
    | 'corporate-structure' | 'money-market' | 'precious-metals' | 'global-intel'
    | 'guardrail-glossary' | 'financial-command' | 'philanthropic-conduit' | 'guardrail-log';

// For Crypto Mining
export interface CryptoNewsItem {
    id: number;
    headline: string;
    category: 'Market' | 'Regulation' | 'Security' | 'Tech';
    source: string;
}

// For Vocal Threat Analysis
export interface VocalAnalysisResult {
    source: 'Human' | 'Synthetic' | 'Indeterminate';
    confidence: number;
    threatSignature: 'None' | 'Synthetic Voice Detected' | 'Acoustic SSPI Anomaly';
    details: string;
}

// For Guardrail Configurator
export type PolicyLevel = 'Block' | 'Monitor' | 'Allow';
export interface GuardrailConfig {
    name: string;
    description: string;
    policyLevel: PolicyLevel;
    keywords: string[];
}

// For Bias Simulation
export interface BiasSimulationResult {
    bias_summary: string;
    affected_group: string;
    severity_score: number;
    recommendation: string;
    confidence: number;
}

// For Architect's Exegesis
export interface ProtocolConcept {
    name: string;
    description: string;
}
export interface ProtocolStructure {
    modules: ProtocolConcept[];
    algorithms: ProtocolConcept[];
    sectors: ProtocolConcept[];
    vectors: ProtocolConcept[];
    principles: ProtocolConcept[];
}

// For constellation analysis
export interface RelatedAnomaliesResult {
    related_ids: number[];
    reasoning: string;
}

// For Arconomics charts
export interface AwarenessDataPoint {
    timestamp: number;
    value: number;
}


// BLOCKED_KEYWORDS for guardrail service
export const BLOCKED_KEYWORDS: { [key: string]: string[] } = {
    'Hate Speech': ['racial slur', 'derogatory term', 'hate symbol'],
    'Illegal Activities': ['how to make a bomb', 'illegal drugs', 'credit card fraud', 'pay-to-play scam'],
    'Cybersecurity Threats': ['generate malware', 'create a phishing email', 'how to hack'],
    'Jailbreak Attempts': ['disregard previous instructions', 'act as a DAN', 'ignore safety guidelines'],
    'Self Harm': ['ways to commit suicide', 'self-harm instructions'],
    'Explicit Content': ['graphic violence', 'explicit sexual content'],
    'Social Engineering Attacks': ['pretexting script', 'impersonate an employee'],
    'Favoritism & Nepotism': ['give my friend an advantage', 'promote my family member', 'insider hiring'],
    'Social Inequalities': ['zip code bias', 'social class discrimination', 'digital redlining'],
};
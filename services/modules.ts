

import React from 'react';
import { View } from './types';

// Import icons for categories
import { DashboardIcon } from '../components/icons/DashboardIcon';
import { GavelIcon } from '../components/icons/GavelIcon';
import { BuildingLibraryIcon } from '../components/icons/BuildingLibraryIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { CogIcon } from '../components/icons/CogIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { BtcIcon } from '../components/icons/BtcIcon';

// Import icons for modules
import { BeakerIcon } from '../components/icons/BeakerIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';
import { SitemapIcon } from '../components/icons/SitemapIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { BanknotesIcon } from '../components/icons/BanknotesIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { DiamondIcon } from '../components/icons/DiamondIcon';
import { ChipIcon } from '../components/icons/ChipIcon';
import { TargetIcon } from '../components/icons/TargetIcon';
import { BugIcon } from '../components/icons/BugIcon';
import { SoundWaveIcon } from '../components/icons/SoundWaveIcon';
import { DnaIcon } from '../components/icons/DnaIcon';
import { FingerPrintIcon } from '../components/icons/FingerPrintIcon';
import { ArrowsRightLeftIcon } from '../components/icons/ArrowsRightLeftIcon';
import { ShieldCheckmarkIcon } from '../components/icons/ShieldCheckmarkIcon';
import { RocketLaunchIcon } from '../components/icons/RocketLaunchIcon';
import { CodeIcon } from '../components/icons/CodeIcon';
import { TerminalIcon } from '../components/icons/TerminalIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { ServerStackIcon } from '../components/icons/ServerStackIcon';
import { RobotIcon } from '../components/icons/RobotIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { FilmIcon } from '../components/icons/FilmIcon';
import { SpeakerWaveIcon } from '../components/icons/SpeakerWaveIcon';
import { NftIcon } from '../components/icons/NftIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';


export interface Module {
  id: View;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ModuleCategory {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  modules: Module[];
}

const ALL_MODULES: Module[] = [
    // Core Protocol
    { id: 'demonstrator', name: 'Prompt Demonstrator', description: 'Test client-side guardrails and analyze digital threats.', icon: BeakerIcon },
    { id: 'governance', name: 'Community Governance', description: 'Review, vote on, and submit new guardrail proposals.', icon: GavelIcon },
    { id: 'health', name: 'System Health', description: 'Real-time dashboard monitoring protocol integrity and performance.', icon: DashboardIcon },
    { id: 'global-intel', name: 'Global Intel Search', description: 'Conduct global open-source intelligence searches.', icon: GlobeIcon },
    { id: 'guardrail-glossary', name: 'Guardrail Glossary', description: 'A comprehensible glossary of all guardrails and sanctuaries.', icon: BookOpenIcon },
    // Legal & Judicial
    { id: 'legal', name: 'Legal & Economic Analysis', description: 'Analyze proposals with the L.E.X. and E.C.H.O. agents.', icon: ScaleIcon },
    { id: 'arconomics', name: 'Arconomics Algo-Bias Detector', description: 'Autonomous judicial arm for prosecuting digital biases.', icon: GavelIcon },
    { id: 'corporate-structure', name: 'Corporate Structure', description: 'View legal entities and regulatory framework.', icon: SitemapIcon },
    { id: 'preponderance-of-evidence', name: 'Digital Executionary Protocol', description: 'Enforcement arm for escalating and executing verdicts.', icon: DocumentCheckIcon },
    // Financial Economics
    { id: 'financial', name: 'Financial Threat Analysis', description: 'Simulate digital financial threat assessments on entities.', icon: ChartBarIcon },
    { id: 'investor-pitch', name: 'Investment Briefing', description: 'A confidential briefing on the operational framework.', icon: DocumentTextIcon },
    { id: 'money-market', name: 'Money Market & Treasury', description: 'Central hub for managing corporate assets and liquidity.', icon: BuildingLibraryIcon },
    { id: 'gamete-transfer', name: 'G.I.F.T. Protocol', description: 'Secure transfer of stock options for internal funding.', icon: BanknotesIcon },
    { id: 'financial-command', name: 'Financial Command Center', description: 'Centralized Command Center for the digital banking division.', icon: ChartBarIcon },
    { id: 'philanthropic-conduit', name: 'Philanthropic Conduit', description: 'Facilitates philanthropic contributions from partners.', icon: HeartIcon },
    // Mining & Assets
    { id: 'crypto-mining', name: 'Custodial Asset Recovery', description: 'The autonomous Bitcoin Bank for asset recovery and yield.', icon: BtcIcon },
    { id: 'eco-mining', name: 'Eco-Philanthropic Mining', description: 'Carbon-negative mining funding global philanthropic efforts.', icon: HeartIcon },
    { id: 'precious-metals', name: 'Digital Metals Mining', description: 'Liquidates gas fees to fund digital prospecting operations.', icon: DiamondIcon },
    { id: 'mining-rig', name: 'Cloud Mining Rig', description: 'Simulated interface for a cloud-based mining operation.', icon: ChipIcon },
    // Security & Defense
    { id: 'threat-sim', name: 'Threat Simulation', description: 'Simulate various cyber threats against the protocol.', icon: TargetIcon },
    { id: 'threatintel', name: 'Threat Intelligence Codex', description: 'A live feed of identified system vulnerabilities.', icon: BugIcon },
    { id: 'vocal-analysis', name: 'Vocal Threat Analysis (A.V.A.T.A.R.)', description: 'Analyze live audio to detect synthetic voices and anomalies.', icon: SoundWaveIcon },
    { id: 'biometric-analysis', name: 'Biometric Analysis (N.E.O.)', description: 'Analyze biometric data streams for anomalies.', icon: DnaIcon },
    { id: 'identity-suite', name: 'Identity Integrity Suite', description: 'Tools for digital identity verification and defense.', icon: FingerPrintIcon },
    { id: 'secure-geo-link', name: 'Secure Geospatial Link', description: 'Establish an encrypted channel for geospatial analysis.', icon: GlobeIcon },
    { id: 'osint-asic', name: 'OSINT/ASIC Integrator', description: 'Deploy a dedicated Open-Source Intelligence ASIC.', icon: ChipIcon },
    { id: 'guardrail-log', name: 'Guardrail Activity Log', description: 'View historical logs and reports of all guardrail activity.', icon: DocumentTextIcon },
    { id: 'network-transmissions', name: 'Anti-Terrorism Defense (A.T.D.)', description: 'Live monitor for network transmissions of global policing data.', icon: ArrowsRightLeftIcon },
    // Engineering & Ops
    { id: 'reg-sandbox', name: 'Regulatory Sandbox', description: 'A controlled environment for testing new guardrail proposals.', icon: ShieldCheckmarkIcon },
    { id: 'innovation-conduit', name: 'Innovation Conduit', description: 'A pipeline for integrating next-generation infrastructure.', icon: RocketLaunchIcon },
    { id: 'code-gen', name: 'Full Stack Integrator', description: 'Generate production-ready code snippets.', icon: CodeIcon },
    { id: 'code-execution', name: 'Execution Sandbox', description: 'Execute scripts against the core protocol in a sandbox.', icon: TerminalIcon },
    { id: 'ssh-key-gen', name: 'SSH Key Generator', description: 'Generate a new SSH key pair for secure access.', icon: KeyIcon },
    { id: 'data-ops', name: 'Data Ops Platform', description: 'Monitor and manage data pipelines, ETL jobs, and integrations.', icon: ServerStackIcon },
    { id: 'guardrail-config', name: 'Guardrail Configurator', description: 'Define and manage the behavior of individual guardrails.', icon: CogIcon },
    { id: 'api-key-manager', name: 'API Key Manager', description: 'Manage the API key for accessing Google AI services.', icon: KeyIcon },
    // AI Generator Tools
    { id: 'chat', name: 'Kubernetics Lite Chat', description: 'Engage in a direct conversation with the core AI.', icon: RobotIcon },
    { id: 'image-analysis', name: 'Multimodal Image Analysis', description: 'Upload an image and use the AI to analyze its content.', icon: PhotoIcon },
    { id: 'video-analysis', name: 'Multimodal Video Analysis', description: 'Upload a video and use the AI to analyze its content.', icon: VideoCameraIcon },
    { id: 'audio-trans', name: 'AI Audio Transcription', description: 'Record audio and get a real-time transcription.', icon: MicrophoneIcon },
    { id: 'image-gen', name: 'AI Image Generation', description: 'Generate high-quality images from text descriptions.', icon: PhotoIcon },
    { id: 'video-gen', name: 'AI Video Generator (Veo)', description: 'Generate high-quality video clips.', icon: FilmIcon },
    { id: 'tts', name: 'Text to Speech Synthesis', description: 'Convert text into lifelike speech.', icon: SpeakerWaveIcon },
    { id: 'nft-studio', name: 'NFT Genesis Studio', description: 'Materialize cosmic and cryptologic concepts into NFTs.', icon: NftIcon },
    { id: 'architects-exegesis', name: "Architect's Exegesis", description: 'Deconstruct the foundational philosophy of the protocol.', icon: BrainCircuitIcon },
];

const findModules = (ids: View[]): Module[] => {
    return ids.map(id => ALL_MODULES.find(m => m.id === id)).filter((m): m is Module => !!m);
};

export const MODULE_CATEGORIES: ModuleCategory[] = [
    {
        id: 'core',
        name: 'Core Protocol',
        icon: DashboardIcon,
        modules: findModules(['demonstrator', 'governance', 'health', 'global-intel', 'guardrail-glossary']),
    },
    {
        id: 'legal',
        name: 'Legal & Judicial',
        icon: GavelIcon,
        modules: findModules(['legal', 'arconomics', 'corporate-structure', 'preponderance-of-evidence']),
    },
    {
        id: 'finance',
        name: 'Financial Economics',
        icon: BuildingLibraryIcon,
        modules: findModules(['financial', 'investor-pitch', 'money-market', 'gamete-transfer', 'financial-command', 'philanthropic-conduit']),
    },
    {
        id: 'mining',
        name: 'Mining & Assets',
        icon: BtcIcon,
        modules: findModules(['crypto-mining', 'eco-mining', 'precious-metals', 'mining-rig']),
    },
    {
        id: 'security',
        name: 'Security & Defense',
        icon: ShieldCheckIcon,
        modules: findModules(['threat-sim', 'threatintel', 'vocal-analysis', 'biometric-analysis', 'identity-suite', 'secure-geo-link', 'osint-asic', 'guardrail-log', 'network-transmissions']),
    },
    {
        id: 'engineering',
        name: 'Engineering & Ops',
        icon: CogIcon,
        modules: findModules(['reg-sandbox', 'innovation-conduit', 'code-gen', 'code-execution', 'ssh-key-gen', 'data-ops', 'guardrail-config', 'api-key-manager']),
    },
    {
        id: 'ai_tools',
        name: 'AI Generator Tools',
        icon: SparklesIcon,
        modules: findModules(['chat', 'image-analysis', 'video-analysis', 'audio-trans', 'image-gen', 'video-gen', 'tts', 'nft-studio', 'architects-exegesis']),
    },
];
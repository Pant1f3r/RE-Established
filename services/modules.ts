import React from 'react';
import { View } from './types';

// Import icons
import { DashboardIcon } from '../components/icons/DashboardIcon';
import { GavelIcon } from '../components/icons/GavelIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { BeakerIcon } from '../components/icons/BeakerIcon';
import { BuildingLibraryIcon } from '../components/icons/BuildingLibraryIcon';
import { BtcIcon } from '../components/icons/BtcIcon';
import { CogIcon } from '../components/icons/CogIcon';

// FIX: Add missing icon imports to resolve 'Cannot find name' errors.
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';
import { ShieldCheckmarkIcon } from '../components/icons/ShieldCheckmarkIcon';
import { BugIcon } from '../components/icons/BugIcon';
import { ChipIcon } from '../components/icons/ChipIcon';
import { ArrowsRightLeftIcon } from '../components/icons/ArrowsRightLeftIcon';
import { DnaIcon } from '../components/icons/DnaIcon';
import { SoundWaveIcon } from '../components/icons/SoundWaveIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { FilmIcon } from '../components/icons/FilmIcon';
import { SpeakerWaveIcon } from '../components/icons/SpeakerWaveIcon';
import { NftIcon } from '../components/icons/NftIcon';
import { CodeIcon } from '../components/icons/CodeIcon';
import { RobotIcon } from '../components/icons/RobotIcon';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { TargetIcon } from '../components/icons/TargetIcon';
import { TerminalIcon } from '../components/icons/TerminalIcon';
import { SitemapIcon } from '../components/icons/SitemapIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { BanknotesIcon } from '../components/icons/BanknotesIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { DiamondIcon } from '../components/icons/DiamondIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { RocketLaunchIcon } from '../components/icons/RocketLaunchIcon';
import { ServerStackIcon } from '../components/icons/ServerStackIcon';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { IdentificationIcon } from '../components/icons/IdentificationIcon';
import { FingerPrintIcon } from '../components/icons/FingerPrintIcon';


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
    { id: 'arconomics', name: 'Arconomics', description: "The autonomous judicial arm of the DEJA' VU directive.", icon: GavelIcon },
    { id: 'health', name: 'System Health', description: 'Real-time dashboard monitoring protocol integrity and performance.', icon: DashboardIcon },
    { id: 'preponderance-of-evidence', name: 'IDRC Evidence Docket', description: 'Cases escalated for final verdict and sanctioning.', icon: DocumentCheckIcon },
    { id: 'governance', name: 'Community Governance', description: 'Review, vote on, and submit new guardrail proposals.', icon: GavelIcon },
    { id: 'legal', name: 'Legal Analysis', description: 'Analyze proposals with the L.E.X. agent for legal counsel.', icon: ScaleIcon },
    { id: 'reg-sandbox', name: 'Regulatory Sandbox', description: 'A controlled environment for testing new safety protocols.', icon: ShieldCheckmarkIcon },
    { id: 'threatintel', name: 'Threat Intelligence', description: 'A live feed of identified system vulnerabilities and their status.', icon: BugIcon },
    { id: 'osint-asic', name: 'OSINT ASIC', description: 'Gather and analyze public data on any given target.', icon: ChipIcon },
    { id: 'network-transmissions', name: 'A.T.D.', description: 'Monitor real-time network transmissions of global policing data.', icon: ArrowsRightLeftIcon },
    { id: 'biometric-analysis', name: 'Biometric Analysis', description: 'Analyze biometric data streams for anomalies and impersonation threats.', icon: DnaIcon },
    { id: 'vocal-analysis', name: 'Vocal Threat Analysis', description: 'Analyze live audio to detect synthetic voices and anomalies.', icon: SoundWaveIcon },
    { id: 'secure-geo-link', name: 'Secure Geo-Link', description: 'Establish an encrypted channel for geospatial analysis.', icon: GlobeIcon },
    { id: 'image-gen', name: 'Image Generation', description: 'Generate high-quality images from text descriptions.', icon: PhotoIcon },
    { id: 'video-gen', name: 'Video Generation', description: 'Generate high-quality video clips using the Veo model.', icon: FilmIcon },
    { id: 'tts', name: 'Text to Speech', description: 'Convert text into lifelike speech using Gemini.', icon: SpeakerWaveIcon },
    { id: 'nft-studio', name: 'DEJA\' VU NFT Studios', description: 'Materialize concepts into unique digital assets.', icon: NftIcon },
    { id: 'code-gen', name: 'Full Stack Integrator', description: 'Generate production-ready code snippets.', icon: CodeIcon },
    { id: 'demonstrator', name: 'Prompt Demonstrator', description: 'Test client-side guardrails and analyze digital threats.', icon: BeakerIcon },
    { id: 'chat', name: 'Chat Bot', description: 'Engage in a conversation with the KR0M3D1A core AI.', icon: RobotIcon },
    { id: 'image-analysis', name: 'Image Analysis', description: 'Upload an image and use the AI to analyze its content.', icon: PhotoIcon },
    { id: 'video-analysis', name: 'Video Analysis', description: 'Upload a video and get a summary or ask questions.', icon: VideoCameraIcon },
    { id: 'audio-trans', name: 'Audio Transcription', description: 'Record audio and get a real-time transcription.', icon: MicrophoneIcon },
    { id: 'threat-sim', name: 'Threat Simulation', description: 'Simulate various cyber threats against the protocol.', icon: TargetIcon },
    { id: 'code-execution', name: 'Code Execution', description: 'Execute scripts in a sandboxed environment.', icon: TerminalIcon },
    { id: 'corporate-structure', name: 'Corporate Structure', description: 'Overview of the legal entities and divisions.', icon: SitemapIcon },
    { id: 'investor-pitch', name: 'Investor Dossier', description: 'A confidential briefing on the KR0M3D1A directive.', icon: DocumentTextIcon },
    { id: 'money-market', name: 'Money Market & Treasury', description: 'Central hub for managing corporate assets and liquidity.', icon: BuildingLibraryIcon },
    { id: 'financial', name: 'Financial Analysis', description: 'Perform simulated digital threat assessments on entities.', icon: ChartBarIcon },
    { id: 'gamete-transfer', name: 'G.I.F.T. Protocol', description: 'Secure, verified digital transfer of stock options.', icon: BanknotesIcon },
    { id: 'crypto-mining', name: 'Crypto Mining', description: 'Dashboard monitoring autonomous asset recovery and yield.', icon: BtcIcon },
    { id: 'eco-mining', name: 'Eco-Philanthropic Mining', description: 'Carbon-negative mining funding global philanthropic efforts.', icon: HeartIcon },
    { id: 'mining-rig', name: 'Cloud Mining Rig', description: 'Simulated interface for a cloud-based mining operation.', icon: ChipIcon },
    { id: 'precious-metals', name: 'Digital Metals Mining', description: 'Liquidate gas fees to fund digital prospecting operations.', icon: DiamondIcon },
    { id: 'architects-exegesis', name: "Architect's Exegesis", description: 'Deconstruct the foundational philosophy of the protocol.', icon: BrainCircuitIcon },
    { id: 'guardrail-config', name: 'Guardrail Configurator', description: 'Define and manage the behavior of individual guardrails.', icon: CogIcon },
    { id: 'api-key-manager', name: 'API Key Manager', description: 'Manage the API key for accessing Google AI services.', icon: KeyIcon },
    { id: 'innovation-conduit', name: 'Innovation Conduit', description: 'A pipeline for integrating next-generation protocols.', icon: RocketLaunchIcon },
    { id: 'data-ops', name: 'DataOps Platform', description: 'Monitor and manage data pipelines and ETL jobs.', icon: ServerStackIcon },
    { id: 'ssh-key-gen', name: 'SSH Key Generator', description: 'Generate a new SSH key pair for secure access.', icon: KeyIcon },
    { id: 'identity-suite', name: 'Identity Integrity Suite', description: 'Run background checks and combat geospatial bias.', icon: FingerPrintIcon },
];

const findModules = (ids: View[]): Module[] => {
    return ids.map(id => ALL_MODULES.find(m => m.id === id)).filter((m): m is Module => !!m);
};

export const MODULE_CATEGORIES: ModuleCategory[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: DashboardIcon,
        modules: findModules(['arconomics', 'health', 'preponderance-of-evidence']),
    },
    {
        id: 'governance',
        name: 'Governance & Legal',
        icon: GavelIcon,
        modules: findModules(['governance', 'legal', 'reg-sandbox']),
    },
    {
        id: 'threatintel',
        name: 'Threat Intelligence',
        icon: ShieldCheckIcon,
        modules: findModules(['threatintel', 'osint-asic', 'network-transmissions', 'biometric-analysis', 'vocal-analysis', 'secure-geo-link']),
    },
    {
        id: 'studio',
        name: 'Generative Studio',
        icon: SparklesIcon,
        modules: findModules(['image-gen', 'video-gen', 'tts', 'nft-studio', 'code-gen']),
    },
    {
        id: 'analysis',
        name: 'Analysis & Testing',
        icon: BeakerIcon,
        modules: findModules(['demonstrator', 'chat', 'image-analysis', 'video-analysis', 'audio-trans', 'threat-sim', 'code-execution']),
    },
    {
        id: 'finance',
        name: 'Finance & Corporate',
        icon: BuildingLibraryIcon,
        modules: findModules(['corporate-structure', 'investor-pitch', 'money-market', 'financial', 'gamete-transfer']),
    },
    {
        id: 'mining',
        name: 'Mining & Assets',
        icon: BtcIcon,
        modules: findModules(['crypto-mining', 'eco-mining', 'mining-rig', 'precious-metals']),
    },
    {
        id: 'identity',
        name: 'Identity & Access',
        icon: IdentificationIcon,
        modules: findModules(['identity-suite', 'api-key-manager', 'ssh-key-gen']),
    },
    {
        id: 'protocol',
        name: 'System & Protocol',
        icon: CogIcon,
        modules: findModules(['architects-exegesis', 'guardrail-config', 'innovation-conduit', 'data-ops']),
    },
];

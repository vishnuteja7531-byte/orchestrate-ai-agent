import { KpiData, ActivityItem, LogEntry, WhyReason } from '../types';

export const kpiStats: KpiData[] = [
  { label: 'Total Automations', value: '1,284', trend: 'up', change: '+12%' },
  { label: 'Hours Saved', value: '342h', trend: 'up', change: '+8.5%' },
  { label: 'Success Rate', value: '99.8%', trend: 'up', change: '+0.2%' },
  { label: 'Tasks Today', value: '47', trend: 'neutral', change: '0%' },
];

export const recentActivity: ActivityItem[] = [
  { id: '1', action: 'Deployed', target: 'Invoice Processing Agent', timeAgo: '12m ago', user: 'System' },
  { id: '2', action: 'Optimized', target: 'Customer Support Workflow', timeAgo: '45m ago', user: 'Orchestrator' },
  { id: '3', action: 'Failed', target: 'Legacy Data Sync', timeAgo: '2h ago', user: 'System' },
  { id: '4', action: 'Created', target: 'Q4 Report Generator', timeAgo: '4h ago', user: 'Alice M.' },
];

export const logsData: LogEntry[] = [
  { id: 'L1', timestamp: '10:42:15 AM', status: 'success', message: 'Workflow "Daily Sync" completed successfully.', duration: '1.2s' },
  { id: 'L2', timestamp: '10:41:58 AM', status: 'info', message: 'Fetching data from Salesforce API...', duration: '450ms' },
  { id: 'L3', timestamp: '10:41:55 AM', status: 'info', message: 'Initiating authentication sequence.', duration: '200ms' },
  { id: 'L4', timestamp: '10:30:00 AM', status: 'warning', message: 'Retry attempt 1/3 for "Email Service".', duration: '2.1s' },
  { id: 'L5', timestamp: '09:15:00 AM', status: 'error', message: 'Connection timeout: Database_Primary_01', duration: '5.0s' },
  { id: 'L6', timestamp: '09:14:55 AM', status: 'info', message: 'Health check initiated.', duration: '10ms' },
];

export const whyReasons: WhyReason[] = [
  { id: 'R1', title: 'Pattern Recognition', description: 'The prompt matches 94% of previous "Invoice Extraction" requests. The model selected the finance-specialized agent.', confidence: 98, riskLevel: 'Low' },
  { id: 'R2', title: 'Resource Availability', description: 'Primary database is under high load. Route optimized to read-replica #3 to reduce latency.', confidence: 92, riskLevel: 'Low' },
  { id: 'R3', title: 'Security Policy', description: 'Detected PII in input stream. Applied redaction middleware before processing external API call.', confidence: 99, riskLevel: 'Low' },
  { id: 'R4', title: 'Model Selection', description: 'Complex reasoning required. Switched from Gemini Flash to Gemini Pro for higher accuracy on step 3.', confidence: 85, riskLevel: 'Medium' },
];
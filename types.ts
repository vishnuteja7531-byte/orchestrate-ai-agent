export interface KpiData {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  duration?: string;
}

export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  iconType: 'brain' | 'database' | 'code' | 'check';
}

export interface ActivityItem {
  id: string;
  action: string;
  target: string;
  timeAgo: string;
  user: string;
}

export interface WhyReason {
  id: string;
  title: string;
  description: string;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}
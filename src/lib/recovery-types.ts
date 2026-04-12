export type CheckinType = 'sober' | 'use';

export type MoodKey =
  | 'terrible'
  | 'bad'
  | 'guilty'
  | 'anxious'
  | 'okay'
  | 'neutral'
  | 'good'
  | 'relieved'
  | 'great'
  | 'high';

export interface Checkin {
  id: string;
  date: string; // YYYY-MM-DD
  type: CheckinType;
  mood: MoodKey;
  notes?: string;
  saved?: number;
  spent?: number;
  quantity?: number;
  timestamp: number;
}

export interface ClipboardItem {
  id: string;
  text: string;
  timestamp: number;
}

export interface SafetyRule {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  medications: string[];
  supplements: string[];
  message: string;
  description: string;
}

export interface RecoveryState {
  checkins: Checkin[];
  clipboard: ClipboardItem[];
  selectedMeds: string[];
  selectedSupplements: string[];
  dailyAvgSpending: number;
  spiritualEnabled: boolean;
  startDate: string | null;
  currentSection: string;
  showSettings: boolean;
  calcMode: boolean;
}

export interface MoodInfo {
  emoji: string;
  label: string;
  color: string;
}

export type SectionName = 'home' | 'checkin' | 'history' | 'stats' | 'notes' | 'safety' | 'resources';

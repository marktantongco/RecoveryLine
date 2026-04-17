import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Clipboard Utility ────────────────────────────────────────────────────────

/**
 * Copy text to clipboard with fallback for older browsers / restricted contexts.
 * Returns `true` on success, `false` on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

// ─── Date Utility ─────────────────────────────────────────────────────────────

/**
 * Get local date string in YYYY-MM-DD format.
 * Uses local timezone, not UTC.
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ─── Custom Error Classes ─────────────────────────────────────────────────────

/**
 * Typed application error with a severity level for UI handling.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'low' | 'medium' | 'high' | 'critical'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Error thrown when a localStorage read/write fails.
 */
export class StorageError extends AppError {
  constructor(message: string, public originalError?: unknown) {
    super(message, 'STORAGE_ERROR', 'high');
    this.name = 'StorageError';
  }
}

/**
 * Error thrown when localStorage quota is exceeded.
 * Marked as critical — UI should prompt the user to export & reset.
 */
export class StorageQuotaError extends StorageError {
  constructor() {
    super('Storage quota exceeded. Please export your data and reset.');
    this.name = 'StorageQuotaError';
    this.code = 'QUOTA_EXCEEDED';
    this.severity = 'critical';
  }
}

// ─── Safe localStorage Wrappers ──────────────────────────────────────────────

/**
 * Read from localStorage with typed error handling.
 * Throws StorageQuotaError or StorageError on failure.
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      throw new StorageQuotaError();
    }
    throw new StorageError('Failed to read from storage', e);
  }
}

/**
 * Write to localStorage with typed error handling.
 * Throws StorageQuotaError or StorageError on failure.
 */
export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      throw new StorageQuotaError();
    }
    throw new StorageError('Failed to write to storage', e);
  }
}

/**
 * Remove a key from localStorage with typed error handling.
 * Throws StorageError on failure.
 */
export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw new StorageError('Failed to clear storage', e);
  }
}

// ─── Haptic Feedback ──────────────────────────────────────────────────────────

/**
 * Trigger haptic feedback on mobile devices.
 * Falls back silently on devices that don't support vibration.
 */
export function haptic(style: 'light' | 'medium' | 'heavy' = 'light'): void {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const patterns = { light: 10, medium: 25, heavy: 50 };
      navigator.vibrate(patterns[style]);
    }
  } catch {
    // Silently fail — vibration not supported
  }
}

// ─── Data Validation ──────────────────────────────────────────────────────────

/**
 * Validate check-in data before saving.
 * Returns an error message if invalid, or null if valid.
 */
export function validateCheckin(data: {
  type: string;
  mood: string;
  date: string;
  notes?: string;
  saved?: number;
  spent?: number;
  quantity?: number;
}): string | null {
  if (!data.type || !['sober', 'use'].includes(data.type)) {
    return 'Invalid check-in type';
  }
  if (!data.mood || typeof data.mood !== 'string') {
    return 'Mood is required';
  }
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return 'Invalid date format';
  }
  if (data.saved !== undefined && (typeof data.saved !== 'number' || data.saved < 0)) {
    return 'Saved amount must be a positive number';
  }
  if (data.spent !== undefined && (typeof data.spent !== 'number' || data.spent < 0)) {
    return 'Spent amount must be a positive number';
  }
  if (data.notes && data.notes.length > 500) {
    return 'Notes must be under 500 characters';
  }
  return null;
}

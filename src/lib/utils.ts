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

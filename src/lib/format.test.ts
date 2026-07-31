import { describe, expect, it } from 'vitest';

import {
  formatClockTime,
  formatDecibels,
  formatPercent,
  formatVolume,
  formatSemitones,
  formatSpeed,
  outputFileName,
  userInitials,
} from './format.js';

describe('formatClockTime', () => {
  it('shows minutes, seconds, and tenths', () => {
    expect(formatClockTime(83.46)).toBe('1:23.4');
  });

  it('pads seconds under ten', () => {
    expect(formatClockTime(65)).toBe('1:05.0');
    expect(formatClockTime(0)).toBe('0:00.0');
  });
});

describe('formatSpeed', () => {
  it('shows two decimals and the unit', () => {
    expect(formatSpeed(1.5)).toBe('1.50x');
    expect(formatSpeed(0.25)).toBe('0.25x');
  });
});

describe('formatSemitones', () => {
  it('signs positive shifts and leaves the rest', () => {
    expect(formatSemitones(3)).toBe('+3 st');
    expect(formatSemitones(-3)).toBe('-3 st');
    expect(formatSemitones(0)).toBe('0 st');
  });
});

describe('formatDecibels', () => {
  it('signs positive gains and shows one decimal', () => {
    expect(formatDecibels(4)).toBe('+4.0 dB');
    expect(formatDecibels(-2.5)).toBe('-2.5 dB');
    expect(formatDecibels(0)).toBe('0.0 dB');
  });
});

describe('formatPercent', () => {
  it('rounds to a whole percentage', () => {
    expect(formatPercent(150)).toBe('150%');
    expect(formatPercent(99.6)).toBe('100%');
  });
});

describe('outputFileName', () => {
  it('slugs the spoken text', () => {
    expect(outputFileName('Hello there, world!')).toBe('Hello-there-world');
  });

  it('falls back to a generic name when there is nothing usable', () => {
    expect(outputFileName(null)).toBe('speech');
    expect(outputFileName('')).toBe('speech');
    expect(outputFileName('!!! ???')).toBe('speech');
  });

  it('truncates long text without leaving a trailing dash', () => {
    const name = outputFileName('a'.repeat(30) + ' ' + 'b'.repeat(30));

    expect(name.length).toBeLessThanOrEqual(40);
    expect(name.endsWith('-')).toBe(false);
  });
});

describe('userInitials', () => {
  it('returns first and last initials for a two-word name', () => {
    expect(userInitials('William Dupont')).toBe('WD');
  });

  it('returns first and last initials for a multi-word name', () => {
    expect(userInitials('Jean-Claude Van Damme')).toBe('JD');
  });

  it('returns first two characters uppercased for a single word', () => {
    expect(userInitials('alice')).toBe('AL');
  });

  it('returns a single uppercase character for a one-letter name', () => {
    expect(userInitials('a')).toBe('A');
  });

  it('uppercases the result', () => {
    expect(userInitials('jean dupont')).toBe('JD');
  });

  it('trims surrounding whitespace', () => {
    expect(userInitials('  Marie Curie  ')).toBe('MC');
  });

  it('collapses internal whitespace when splitting', () => {
    expect(userInitials('Ada   Lovelace')).toBe('AL');
  });

  it('returns empty string for an empty input', () => {
    expect(userInitials('')).toBe('');
  });

  it('returns empty string for whitespace-only input', () => {
    expect(userInitials('   ')).toBe('');
  });
});

describe('formatVolume', () => {
  it('speaks both languages: the slider percentage and the engineer decibels', () => {
    expect(formatVolume(100)).toBe('100% (0.0 dB)');
    expect(formatVolume(200)).toBe('200% (+6.0 dB)');
    expect(formatVolume(50)).toBe('50% (-6.0 dB)');
  });

  it('calls silence silence, because zero has no decibel value', () => {
    expect(formatVolume(0)).toBe('0% (-∞ dB)');
  });
});

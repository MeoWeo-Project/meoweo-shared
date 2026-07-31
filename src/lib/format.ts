/** Format seconds as m:ss (e.g. 72.4 -> "1:12"). */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${String(m)}:${String(s).padStart(2, '0')}`;
}

/** Longest slug we build from spoken text before truncating. */
const MAX_FILENAME_LENGTH = 40;

/** Turn the spoken text into a short filename slug; fall back to a generic name. */
export function outputFileName(text: string | null): string {
  const slug = (text ?? '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .slice(0, MAX_FILENAME_LENGTH)
    .trim()
    .replace(/\s+/g, '-');
  return slug || 'speech';
}

/** Format seconds as m:ss.t with tenths, for trim readouts (e.g. 83.46 -> "1:23.4"). */
export function formatClockTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor((seconds - minutes * 60) * 10) / 10;
  return `${String(minutes)}:${rest.toFixed(1).padStart(4, '0')}`;
}

/** Format a speed factor (e.g. 1.5 -> "1.50x"). */
export function formatSpeed(factor: number): string {
  return `${factor.toFixed(2)}x`;
}

/** Format a semitone shift with its sign (e.g. 3 -> "+3 st", -3 -> "-3 st", 0 -> "0 st"). */
export function formatSemitones(semitones: number): string {
  const sign = semitones > 0 ? '+' : '';
  return `${sign}${String(semitones)} st`;
}

/** Format a decibel gain with its sign (e.g. 4 -> "+4.0 dB"). */
export function formatDecibels(gainDb: number): string {
  const sign = gainDb > 0 ? '+' : '';
  return `${sign}${gainDb.toFixed(1)} dB`;
}

/** Format a percentage (e.g. 150 -> "150%"). */
export function formatPercent(percent: number): string {
  return `${String(Math.round(percent))}%`;
}

/**
 * A volume in both its languages: the percentage the slider speaks and the decibels an engineer
 * does (e.g. 150 -> "150% (+3.5 dB)"). Zero is silence, and silence has no decibel value.
 */
export function formatVolume(percent: number): string {
  if (percent <= 0) {
    return '0% (-∞ dB)';
  }
  return `${formatPercent(percent)} (${formatDecibels(20 * Math.log10(percent / 100))})`;
}

/** Format a loudness reading (e.g. -14.2 LUFS), or say plainly that there is nothing to hear. */
export function formatLufs(lufs: number): string {
  return Number.isFinite(lufs) ? `${lufs.toFixed(1)} LUFS` : 'silent';
}

/** Format a peak level in dBFS. */
export function formatDbfs(db: number): string {
  return Number.isFinite(db) ? `${db.toFixed(1)} dBFS` : '-∞';
}

/** Format a compression ratio (e.g. 4:1). */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(1)}:1`;
}

/** Format a time in milliseconds, switching to seconds once that reads better. */
export function formatMilliseconds(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms.toFixed(ms < 10 ? 1 : 0)} ms`;
}

/** Format a duration in seconds (e.g. "2.5 s"). */
export function formatSeconds(seconds: number): string {
  return `${seconds.toFixed(1)} s`;
}

/** A time as a CSS percentage of its track - how everything positioned over a waveform is placed. */
export function percentOf(time: number, duration: number): string {
  return `${String(duration > 0 ? (time / duration) * 100 : 0)}%`;
}

export function userInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '';
  if (parts.length === 1) return (parts[0] ?? '').slice(0, 2).toUpperCase();
  const first = (parts[0] ?? '')[0] ?? '';
  const last = (parts[parts.length - 1] ?? '')[0] ?? '';
  return (first + last).toUpperCase();
}

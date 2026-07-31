/**
 * tsc emits JS and types but ignores CSS, so the stylesheet is copied into dist by hand.
 * Consumers import it as `meoweo-shared/styles.css`.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'src/index.css');
const to = resolve(root, 'dist/index.css');

await mkdir(dirname(to), { recursive: true });
await copyFile(from, to);

// Post X entry — "The agent builds a game from one prompt".
// The entry is the X post itself: a short video of an AI coding agent
// building a tiny browser game from one prompt, posted natively on X with
// make.fun / @makefunai and the play code in its text. This program only
// hands the post's address to the gate: it reads POST.json from the
// repository root and writes it, byte for byte, to the output directory.
// The house reads the post from X; nothing written here is scored.
// Node 22, standard library only. No network, no clock, no files
// outside the repository: both grader runs write identical bytes.
//
// Outside the grader container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(botDir, 'POST.json');
const target = join(outDir, 'POST.json');

let payload: string;
try {
  payload = readFileSync(source, 'utf8');
} catch (err) {
  console.error(`cannot read POST.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(payload);
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('POST.json must be an object with a string "url"');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, payload);

// Read it back: the grader runs the program twice and both runs must
// write the same bytes, so a short write must fail loudly here instead
// of shipping a truncated POST.json.
if (readFileSync(target, 'utf8') !== payload) {
  console.error('POST.json round-trip mismatch after copy');
  process.exit(1);
}

import * as fs from 'node:fs';
import * as path from 'node:path';

const LINE = "Autocorrect changed 'thanks, Sarah' to 'thanks, Satan' in an email to my boss. I apologized instantly. She replied: 'Noted.' Three years later I am still 'noted' — and my phone still thinks it is helping.";

function pickFolder(): string {
  const supplied = process.env.MAKEFUN_OUTPUT_DIR;
  if (supplied !== undefined && supplied !== '') {
    return supplied;
  }
  return path.resolve('out');
}

function main(): void {
  // The gate refuses a line outside 1..400 characters, and one that is
  // only whitespace, so check both before writing anything.
  if (LINE.length < 1 || LINE.length > 400 || LINE.trim().length === 0) {
    throw new Error(
      `entry runs ${LINE.length} characters; the gate only accepts 1 to 400`,
    );
  }
  const folder = pickFolder();
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.resolve(folder, 'entry.txt'), LINE, 'utf8');
}

main();

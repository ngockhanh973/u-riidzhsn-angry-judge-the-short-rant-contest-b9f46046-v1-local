import * as fs from "node:fs";
import * as path from "node:path";

// I keep the whole rant in one frozen string so nothing upstream can trim it.
const LINE = "Autocorrect changed 'thanks, Sarah' to 'thanks, Satan' in an email to my boss. I apologized instantly. She replied: 'Noted.' Three years later I am still 'noted' — and my phone still thinks it is helping.";

// Counts characters the way a reader would, one glyph at a time,
// so the em dash counts as a single character instead of two bytes.
function tallyGlyphs(text: string): number {
  let total = 0;
  for (const _glyph of text) {
    total += 1;
  }
  return total;
}

// Rejects strings that are only spaces, tabs or line breaks.
function carriesRealWords(text: string): boolean {
  for (const _glyph of text) {
    if (_glyph !== " " && _glyph !== "\t" && _glyph !== "\n" && _glyph !== "\r") {
      return true;
    }
  }
  return false;
}

// The contest allows 1 to 400 characters; anything else is a bad entry.
function rantFitsTheLimit(text: string): boolean {
  const size = tallyGlyphs(text);
  return size >= 1 && size <= 400 && carriesRealWords(text);
}

function main(): void {
  if (!rantFitsTheLimit(LINE)) {
    throw new Error(`Rant is ${tallyGlyphs(LINE)} characters; it must be 1-400.`);
  }
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  fs.mkdirSync(folder, { recursive: true });
  const target = path.join(folder, "entry.txt");
  fs.writeFileSync(target, LINE, "utf8");
}

main();

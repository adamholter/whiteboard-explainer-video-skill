import {cp, mkdir, readdir} from 'node:fs/promises';
import path from 'node:path';

const sourceDir = path.resolve('node_modules/@excalidraw/excalidraw/dist/prod/fonts');
const legacyDir = path.resolve('node_modules/@excalidraw/excalidraw/dist/excalidraw-assets');
let fontDir = sourceDir;
let font;
try {
  fontDir = path.join(sourceDir, 'Excalifont');
  font = (await readdir(fontDir)).find((file) => /^Excalifont-Regular.*\.woff2$/i.test(file));
} catch {
  fontDir = legacyDir;
  font = (await readdir(fontDir)).find((file) => /^Virgil.*\.woff2$/i.test(file));
}
if (!font) throw new Error('No official Excalidraw hand-drawn font was found');
await mkdir('public', {recursive: true});
await cp(path.join(fontDir, font), 'public/WhiteboardFont-Regular.woff2');
console.log(`Copied ${font} to public/WhiteboardFont-Regular.woff2`);

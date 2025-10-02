import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, 'src/assets/fonts'); // Thư mục chứa .ttf
const outputDir = path.join(__dirname, 'src/assets/fonts_js'); // Thư mục chứa file .js sau khi convert

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function convertFontToBase64(ttfPath, outputPath) {
    const fontData = fs.readFileSync(ttfPath);
    const base64Font = fontData.toString('base64');

    const jsContent = `export default "${base64Font}";`;
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    console.log(`✅ Converted: ${ttfPath} -> ${outputPath}`);
}

fs.readdirSync(fontsDir).forEach(folder => {
    const folderPath = path.join(fontsDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
        fs.readdirSync(folderPath).forEach(file => {
            if (file.endsWith('.ttf')) {
                const fontPath = path.join(folderPath, file);
                const outputFontName = file.replace(/\.ttf$/, '.js');
                const outputFontPath = path.join(outputDir, outputFontName);

                convertFontToBase64(fontPath, outputFontPath);
            }
        });
    }
});

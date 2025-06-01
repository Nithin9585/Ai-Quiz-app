// utils/extractTextFromPPTX.js
import JSZip from 'jszip';

export const extractTextFromPPTX = async (file) => {
  const zip = await JSZip.loadAsync(file);
  const slideTexts = [];

  const slideFileNames = Object.keys(zip.files).filter((fileName) =>
    fileName.match(/^ppt\/slides\/slide\d+\.xml$/)
  );

  for (const fileName of slideFileNames) {
    const content = await zip.files[fileName].async('text');
    const matches = [...content.matchAll(/<a:t>(.*?)<\/a:t>/g)];
    const text = matches.map((m) => m[1]).join(' ');
    slideTexts.push(text);
  }

  return slideTexts.join('\n\n');
};

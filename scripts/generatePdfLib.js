import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generate() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Embed Alfred's official CV portrait with blue background
  const photoPath = path.resolve('src/assets/images/alfred_profile_real.jpg');
  let embeddedPhoto = null;
  if (fs.existsSync(photoPath)) {
    const photoBytes = fs.readFileSync(photoPath);
    embeddedPhoto = await doc.embedJpg(photoBytes);
  }

  const pageWidth = 595.28;  // A4 standard points
  const pageHeight = 841.89;
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  const colorBlack = rgb(0.1, 0.1, 0.1);
  const colorGray = rgb(0.3, 0.3, 0.3);
  const colorLine = rgb(0.15, 0.15, 0.15);

  function wrapText(text, maxWidth, font, size) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawSectionHeader(page, title, curY) {
    page.drawText(title, {
      x: margin,
      y: curY,
      size: 11,
      font: fontBold,
      color: colorBlack
    });
    curY -= 4;
    page.drawLine({
      start: { x: margin, y: curY },
      end: { x: pageWidth - margin, y: curY },
      thickness: 1.2,
      color: colorLine
    });
    return curY - 14;
  }

  // ================= PAGE 1 =================
  const page1 = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 35;

  // Profile Photo (centered at top)
  if (embeddedPhoto) {
    const photoSize = 65;
    page1.drawImage(embeddedPhoto, {
      x: (pageWidth - photoSize) / 2,
      y: y - photoSize,
      width: photoSize,
      height: photoSize
    });
    y -= (photoSize + 16);
  } else {
    y -= 15;
  }

  // Name
  const name = 'ALFRED JOSHAN RICHARD';
  const nameWidth = fontBold.widthOfTextAtSize(name, 18);
  page1.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y,
    size: 18,
    font: fontBold,
    color: colorBlack
  });
  y -= 16;

  // Contact line 1: email, phone, address
  const c1 = 'alfred.richard@binus.ac.id   +6288274025001   Perum griya madu permata blok ruby no 17';
  const c1W = fontRegular.widthOfTextAtSize(c1, 8);
  page1.drawText(c1, {
    x: (pageWidth - c1W) / 2,
    y,
    size: 8,
    font: fontRegular,
    color: colorGray
  });
  y -= 12;

  // Contact line 2: DOB & Gender
  const c2 = '2006-07-12   M';
  const c2W = fontRegular.widthOfTextAtSize(c2, 8);
  page1.drawText(c2, {
    x: (pageWidth - c2W) / 2,
    y,
    size: 8,
    font: fontRegular,
    color: colorGray
  });
  y -= 12;

  // Contact line 3: Google Docs
  const c3 = 'docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQbwauodj5qzNAJA/edit?usp=sharing';
  const c3W = fontRegular.widthOfTextAtSize(c3, 7.5);
  page1.drawText(c3, {
    x: (pageWidth - c3W) / 2,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorGray
  });
  y -= 12;

  // Contact line 4: LinkedIn
  const c4 = 'linkedin.com/in/alfred-richard-71a340326';
  const c4W = fontRegular.widthOfTextAtSize(c4, 8);
  page1.drawText(c4, {
    x: (pageWidth - c4W) / 2,
    y,
    size: 8,
    font: fontRegular,
    color: colorGray
  });
  y -= 22;

  // --- PROFILE ---
  y = drawSectionHeader(page1, 'PROFILE', y);
  const p1Text = "Hi, I'm Alfred Joshan Richard, an undergraduate Computer Science student at BINUS University Alam Sutera (Binusian 2028), alumnus of SMA Xaverius 2 Bandar Lampung.";
  const p1Lines = wrapText(p1Text, contentWidth, fontRegular, 8.5);
  for (const line of p1Lines) {
    page1.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
    y -= 11.5;
  }
  const p2Text = "With a strong technical foundation in Java, C++, and Python, I engineer backend microservices, full-stack web platforms, and mobile-friendly travel products with a focus on code optimization, algorithm efficiency, and team collaboration.";
  const p2Lines = wrapText(p2Text, contentWidth, fontRegular, 8.5);
  for (const line of p2Lines) {
    page1.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
    y -= 11.5;
  }
  y -= 12;

  // --- ACADEMIC INFORMATION ---
  y = drawSectionHeader(page1, 'ACADEMIC INFORMATION', y);

  // Senior High School
  page1.drawText('Senior High School', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  page1.drawText('2021 - 2024', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2021 - 2024', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 11;
  page1.drawText('SMA Xaverius 2 Bandar Lampung', { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
  page1.drawText('Bandar Lampung', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Bandar Lampung', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 15;

  // Undergraduate
  page1.drawText('Undergraduate, Computer Science', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  page1.drawText('2024 - 2028', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2024 - 2028', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 11;
  page1.drawText('Binus University', { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
  page1.drawText('Binus Alam Sutera', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Binus Alam Sutera', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 11;
  page1.drawText('Streaming: Computer Science Current GPA: 3.54', { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 20;

  // --- STUDENT SKILL ---
  y = drawSectionHeader(page1, 'STUDENT SKILL', y);
  const col1X = margin;
  const col2X = margin + 220;
  let sy1 = y;
  let sy2 = y;

  // Col 1
  page1.drawText('Communication Skills', { x: col1X, y: sy1, size: 8.5, font: fontBold, color: colorBlack });
  sy1 -= 10;
  page1.drawText('Presentation (5)', { x: col1X, y: sy1, size: 8, font: fontRegular, color: colorGray });
  sy1 -= 14;

  page1.drawText('Organizational Skills', { x: col1X, y: sy1, size: 8.5, font: fontBold, color: colorBlack });
  sy1 -= 10;
  page1.drawText('Teamwork (8)', { x: col1X, y: sy1, size: 8, font: fontRegular, color: colorGray });
  sy1 -= 14;

  page1.drawText('Language Skills', { x: col1X, y: sy1, size: 8.5, font: fontBold, color: colorBlack });
  sy1 -= 10;
  page1.drawText('English (8)', { x: col1X, y: sy1, size: 8, font: fontRegular, color: colorGray });
  sy1 -= 14;

  page1.drawText('Project Skills', { x: col1X, y: sy1, size: 8.5, font: fontBold, color: colorBlack });
  sy1 -= 10;
  page1.drawText('Adaptability (7)', { x: col1X, y: sy1, size: 8, font: fontRegular, color: colorGray });
  sy1 -= 14;

  // Col 2
  page1.drawText('Computer Skills', { x: col2X, y: sy2, size: 8.5, font: fontBold, color: colorBlack });
  sy2 -= 10;
  page1.drawText('- Java (6)', { x: col2X, y: sy2, size: 8, font: fontRegular, color: colorGray });
  sy2 -= 10;
  page1.drawText('- C++ (6)', { x: col2X, y: sy2, size: 8, font: fontRegular, color: colorGray });
  sy2 -= 10;
  page1.drawText('- Python (6)', { x: col2X, y: sy2, size: 8, font: fontRegular, color: colorGray });
  sy2 -= 14;

  page1.drawText('Technical Skills', { x: col2X, y: sy2, size: 8.5, font: fontBold, color: colorBlack });
  sy2 -= 10;
  page1.drawText('Fix Code (6)', { x: col2X, y: sy2, size: 8, font: fontRegular, color: colorGray });
  sy2 -= 14;

  page1.drawText('Leadership Skills', { x: col2X, y: sy2, size: 8.5, font: fontBold, color: colorBlack });
  sy2 -= 10;
  page1.drawText('Leading (7)', { x: col2X, y: sy2, size: 8, font: fontRegular, color: colorGray });
  sy2 -= 14;

  y = Math.min(sy1, sy2) - 8;

  // --- CERTIFICATES ---
  y = drawSectionHeader(page1, 'CERTIFICATES', y);
  page1.drawText('Committee member of Liberation Festival', { x: margin, y, size: 8.5, font: fontBold, color: colorBlack });
  page1.drawText('CERT006132 - Introduction to Software Testing', { x: col2X, y, size: 8.5, font: fontBold, color: colorBlack });
  y -= 10;
  page1.drawText('Tomoro event volunteer (9 may 2026)', { x: margin, y, size: 8, font: fontRegular, color: colorGray });
  page1.drawText('03 October 2026', { x: col2X, y, size: 8, font: fontRegular, color: colorGray });
  y -= 18;

  // --- PROJECTS ---
  y = drawSectionHeader(page1, 'PROJECTS', y);

  page1.drawText('Honkai Star Retail Backend', { x: margin, y, size: 8.5, font: fontBold, color: colorBlack });
  y -= 10;
  page1.drawText('High-concurrency e-commerce retail engine, inventory ledger & REST API', { x: margin, y, size: 8, font: fontRegular, color: colorGray });
  y -= 14;

  page1.drawText('Daytourity', { x: margin, y, size: 8.5, font: fontBold, color: colorBlack });
  y -= 10;
  const dLines = wrapText('Crafted an intuitive, card-based discovery UI paired with dynamic schedule filtering, visual route maps, and a streamlined 3-step checkout flow optimized for mobile browsers.', contentWidth, fontRegular, 8);
  for (const line of dLines) {
    page1.drawText(line, { x: margin, y, size: 8, font: fontRegular, color: colorGray });
    y -= 10;
  }
  y -= 4;

  page1.drawText('KelapaWeb', { x: margin, y, size: 8.5, font: fontBold, color: colorBlack });
  y -= 10;
  const kLines = wrapText('Built a bilingual, modern web portal with Swiss-inspired typography, interactive product specification sheets, and a direct inquiry conduit for bulk B2B procurement.', contentWidth, fontRegular, 8);
  for (const line of kLines) {
    page1.drawText(line, { x: margin, y, size: 8, font: fontRegular, color: colorGray });
    y -= 10;
  }

  // ================= PAGE 2 =================
  const page2 = doc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - 45;

  y2 = drawSectionHeader(page2, 'ORGANIZATION AND VOLUNTEER WORKS', y2);

  // Nippon Club 1
  page2.drawText('Nippon Club', { x: margin, y: y2, size: 9, font: fontBold, color: colorBlack });
  page2.drawText('2025 - Present', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2025 - Present', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Sub-Division Officer', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  page2.drawText('Alam Sutera, Tangerang', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Alam Sutera, Tangerang', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Manage Community Sub-Division Boardgame', { x: margin, y: y2, size: 8, font: fontRegular, color: colorGray });
  y2 -= 20;

  // Nippon Club 2
  page2.drawText('Nippon Club', { x: margin, y: y2, size: 9, font: fontBold, color: colorBlack });
  page2.drawText('2024 - 2025', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2024 - 2025', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Trainee', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  page2.drawText('Alam Sutera, Tangerang', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Alam Sutera, Tangerang', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Trainee at Community Sub-Division Boardgame', { x: margin, y: y2, size: 8, font: fontRegular, color: colorGray });
  y2 -= 20;

  // TzuChi 1
  page2.drawText('TzuChi', { x: margin, y: y2, size: 9, font: fontBold, color: colorBlack });
  page2.drawText('06/2026', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('06/2026', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Volunteer', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  page2.drawText('Alam Sutera, Tangerang', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Alam Sutera, Tangerang', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText("Sorted recyclable waste (plastic, paper) to support the foundation's environmental", { x: margin, y: y2, size: 8, font: fontRegular, color: colorGray });
  y2 -= 10;
  page2.drawText('conservation efforts', { x: margin, y: y2, size: 8, font: fontRegular, color: colorGray });
  y2 -= 20;

  // TzuChi 2
  page2.drawText('TzuChi', { x: margin, y: y2, size: 9, font: fontBold, color: colorBlack });
  page2.drawText('06/2026', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('06/2026', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  page2.drawText('Volunteer', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  page2.drawText('Cengkareng, Jakarta barat', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Cengkareng, Jakarta barat', 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 11;
  const tz2Lines = wrapText('Sorted recyclable waste and reusable items, strengthening teamwork, discipline, and awareness of sustainable living.', contentWidth, fontRegular, 8);
  for (const line of tz2Lines) {
    page2.drawText(line, { x: margin, y, size: 8, font: fontRegular, color: colorGray });
    y2 -= 10;
  }

  const pdfBytes = await doc.save();
  fs.writeFileSync('src/assets/Alfred_Joshan_Richard_CV.pdf', pdfBytes);
  fs.writeFileSync('public/Alfred_Joshan_Richard_CV.pdf', pdfBytes);
  console.log('Saved exact CV PDF to src/assets and public! Size:', pdfBytes.length);
}

generate().catch(console.error);

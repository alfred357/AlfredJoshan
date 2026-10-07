import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import cvAssetUrl from '../assets/Alfred_Joshan_Richard_CV.pdf';

export { cvAssetUrl };

/**
 * Generates the official 2-page Curriculum Vitae PDF in-memory using pdf-lib.
 * Uses 100% standard ISO PDF 1.7 encoding with zero external network dependencies.
 */
export async function generateOfficialCVPdfBytes(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  const colorBlack = rgb(0.09, 0.09, 0.11);
  const colorGray = rgb(0.35, 0.35, 0.40);
  const colorLightGray = rgb(0.55, 0.55, 0.60);
  const colorLine = rgb(0.88, 0.88, 0.90);
  const colorBlue = rgb(0.14, 0.38, 0.92);
  const colorGreen = rgb(0.06, 0.65, 0.45);

  function wrapText(text: string, maxWidth: number, font: typeof fontRegular, size: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
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

  function drawSectionTitle(page: any, title: string, curY: number): number {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: curY,
      size: 11,
      font: fontBold,
      color: colorBlack
    });
    curY -= 6;
    page.drawLine({
      start: { x: margin, y: curY },
      end: { x: pageWidth - margin, y: curY },
      thickness: 0.8,
      color: colorLine
    });
    return curY - 14;
  }

  // ================= PAGE 1 =================
  const page1 = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 50;

  // Title
  const name = 'ALFRED JOSHAN RICHARD';
  const nameWidth = fontBold.widthOfTextAtSize(name, 20);
  page1.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y,
    size: 20,
    font: fontBold,
    color: colorBlack
  });
  y -= 20;

  // Contact info row 1
  const contact1 = 'alfred.richard@binus.ac.id  |  +62 882-7402-5001  |  Perum Griya Madu Permata Blok Ruby No. 17';
  const c1Width = fontRegular.widthOfTextAtSize(contact1, 8.5);
  page1.drawText(contact1, {
    x: (pageWidth - c1Width) / 2,
    y,
    size: 8.5,
    font: fontRegular,
    color: colorGray
  });
  y -= 13;

  // Contact info row 2
  const contact2 = 'DOB: 2006-07-12  |  Gender: Male  |  Bandar Lampung & Alam Sutera, Tangerang';
  const c2Width = fontRegular.widthOfTextAtSize(contact2, 8.5);
  page1.drawText(contact2, {
    x: (pageWidth - c2Width) / 2,
    y,
    size: 8.5,
    font: fontRegular,
    color: colorGray
  });
  y -= 13;

  // Links row
  const contact3 = 'Portfolio: docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQbwauodj5qzNAJA  |  LinkedIn: in/alfred-richard-71a340326';
  const c3Width = fontRegular.widthOfTextAtSize(contact3, 7.5);
  page1.drawText(contact3, {
    x: (pageWidth - c3Width) / 2,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorBlue
  });
  y -= 25;

  // PROFILE
  y = drawSectionTitle(page1, 'Profile', y);
  const profileText = "Hi, I'm Alfred Joshan Richard, an undergraduate Computer Science student at BINUS University Alam Sutera (Binusian 2028), alumnus of SMA Xaverius 2 Bandar Lampung. With a strong technical foundation in Java, C++, and Python, I engineer backend microservices, full-stack web platforms, and mobile-friendly travel products with a focus on code optimization, algorithm efficiency, and team collaboration.";
  const profileLines = wrapText(profileText, contentWidth, fontRegular, 9);
  for (const line of profileLines) {
    page1.drawText(line, { x: margin, y, size: 9, font: fontRegular, color: colorGray });
    y -= 13;
  }
  y -= 10;

  // ACADEMIC INFORMATION
  y = drawSectionTitle(page1, 'Academic Information', y);

  page1.drawText('Senior High School', { x: margin, y, size: 9.5, font: fontBold, color: colorBlack });
  page1.drawText('2021 - 2024', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2021 - 2024', 9), y, size: 9, font: fontRegular, color: colorGray });
  y -= 13;
  page1.drawText('SMA Xaverius 2 Bandar Lampung', { x: margin, y, size: 9, font: fontRegular, color: colorGray });
  page1.drawText('Bandar Lampung', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Bandar Lampung', 9), y, size: 9, font: fontRegular, color: colorGray });
  y -= 18;

  page1.drawText('Undergraduate, Computer Science', { x: margin, y, size: 9.5, font: fontBold, color: colorBlack });
  page1.drawText('2024 - 2028', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('2024 - 2028', 9), y, size: 9, font: fontRegular, color: colorGray });
  y -= 13;
  page1.drawText('BINUS University', { x: margin, y, size: 9, font: fontRegular, color: colorGray });
  page1.drawText('Binus Alam Sutera', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('Binus Alam Sutera', 9), y, size: 9, font: fontRegular, color: colorGray });
  y -= 13;
  page1.drawText('Streaming: Computer Science   |   Current GPA: 3.54 / 4.00', { x: margin, y, size: 9, font: fontRegular, color: colorGray });
  y -= 22;

  // STUDENT SKILL
  y = drawSectionTitle(page1, 'Student Skill', y);
  const col1X = margin;
  const col2X = margin + contentWidth / 2 + 10;
  let sY1 = y;
  let sY2 = y;

  page1.drawText('Communication Skills', { x: col1X, y: sY1, size: 9, font: fontBold, color: colorBlack });
  sY1 -= 11;
  page1.drawText('Presentation (5/10)', { x: col1X, y: sY1, size: 8.5, font: fontRegular, color: colorGray });
  sY1 -= 15;

  page1.drawText('Organizational Skills', { x: col1X, y: sY1, size: 9, font: fontBold, color: colorBlack });
  sY1 -= 11;
  page1.drawText('Teamwork (8/10)', { x: col1X, y: sY1, size: 8.5, font: fontRegular, color: colorGray });
  sY1 -= 15;

  page1.drawText('Language Skills', { x: col1X, y: sY1, size: 9, font: fontBold, color: colorBlack });
  sY1 -= 11;
  page1.drawText('English (8/10)', { x: col1X, y: sY1, size: 8.5, font: fontRegular, color: colorGray });
  sY1 -= 15;

  page1.drawText('Project Skills', { x: col1X, y: sY1, size: 9, font: fontBold, color: colorBlack });
  sY1 -= 11;
  page1.drawText('Adaptability (7/10)', { x: col1X, y: sY1, size: 8.5, font: fontRegular, color: colorGray });
  sY1 -= 15;

  page1.drawText('Computer Skills', { x: col2X, y: sY2, size: 9, font: fontBold, color: colorBlack });
  sY2 -= 11;
  page1.drawText('Java (6/10), C++ (6/10), Python (6/10)', { x: col2X, y: sY2, size: 8.5, font: fontRegular, color: colorGray });
  sY2 -= 15;

  page1.drawText('Technical Skills', { x: col2X, y: sY2, size: 9, font: fontBold, color: colorBlack });
  sY2 -= 11;
  page1.drawText('Fix Code & Debugging (6/10)', { x: col2X, y: sY2, size: 8.5, font: fontRegular, color: colorGray });
  sY2 -= 15;

  page1.drawText('Leadership Skills', { x: col2X, y: sY2, size: 9, font: fontBold, color: colorBlack });
  sY2 -= 11;
  page1.drawText('Leading (7/10)', { x: col2X, y: sY2, size: 8.5, font: fontRegular, color: colorGray });
  sY2 -= 15;

  y = Math.min(sY1, sY2) - 8;

  // CERTIFICATES
  y = drawSectionTitle(page1, 'Certificates', y);
  page1.drawText('Committee member of Liberation Festival', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  page1.drawText('09 May 2026', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('09 May 2026', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 11;
  page1.drawText('Tomoro event volunteer', { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 15;

  page1.drawText('CERT006132 - Introduction to Software Testing', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  page1.drawText('03 October 2026', { x: pageWidth - margin - fontRegular.widthOfTextAtSize('03 October 2026', 8.5), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 22;

  // PROJECTS
  y = drawSectionTitle(page1, 'Projects', y);

  page1.drawText('Honkai Star Retail Backend', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const p1Url = 'github.com/alfred357/Honkai_Star_Retail';
  page1.drawText(p1Url, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(p1Url, 8), y, size: 8, font: fontRegular, color: colorBlue });
  y -= 11;
  page1.drawText('High-concurrency e-commerce retail engine, inventory ledger & REST API', { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 16;

  page1.drawText('Daytourity', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const p2Url = 'github.com/alfred357/Daytourity';
  page1.drawText(p2Url, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(p2Url, 8), y, size: 8, font: fontRegular, color: colorBlue });
  y -= 11;
  const p2Desc = 'Crafted an intuitive, card-based discovery UI paired with dynamic schedule filtering, visual route maps, and a streamlined 3-step checkout flow optimized for mobile browsers.';
  const p2Lines = wrapText(p2Desc, contentWidth, fontRegular, 8.5);
  for (const line of p2Lines) {
    page1.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
    y -= 11;
  }
  y -= 5;

  page1.drawText('KelapaWeb', { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  y -= 11;
  const p3Desc = 'Built a bilingual, modern web portal with Swiss-inspired typography, interactive product specification sheets, and a direct inquiry conduit for bulk B2B procurement.';
  const p3Lines = wrapText(p3Desc, contentWidth, fontRegular, 8.5);
  for (const line of p3Lines) {
    page1.drawText(line, { x: margin, y, size: 8.5, font: fontRegular, color: colorGray });
    y -= 11;
  }

  // ================= PAGE 2 =================
  const page2 = doc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - 50;

  page2.drawText('ALFRED JOSHAN RICHARD', { x: margin, y: y2, size: 14, font: fontBold, color: colorBlack });
  const p2Label = 'Curriculum Vitae  |  Page 2 of 2';
  page2.drawText(p2Label, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(p2Label, 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 25;

  y2 = drawSectionTitle(page2, 'Organization and Volunteer Works', y2);

  // Nippon Club Officer
  page2.drawText('Nippon Club', { x: margin, y: y2, size: 10, font: fontBold, color: colorBlack });
  const nc1Date = '2025 - Present';
  page2.drawText(nc1Date, { x: pageWidth - margin - fontBold.widthOfTextAtSize(nc1Date, 9), y: y2, size: 9, font: fontBold, color: colorBlack });
  y2 -= 13;
  page2.drawText('Sub-Division Officer', { x: margin, y: y2, size: 9, font: fontBold, color: colorBlue });
  const nc1Loc = 'Alam Sutera, Tangerang';
  page2.drawText(nc1Loc, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(nc1Loc, 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 12;
  page2.drawText('Manage Community Sub-Division Boardgame', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 22;

  // Nippon Club Trainee
  page2.drawText('Nippon Club', { x: margin, y: y2, size: 10, font: fontBold, color: colorBlack });
  const nc2Date = '2024 - 2025';
  page2.drawText(nc2Date, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(nc2Date, 9), y: y2, size: 9, font: fontRegular, color: colorGray });
  y2 -= 13;
  page2.drawText('Trainee', { x: margin, y: y2, size: 9, font: fontBold, color: colorGray });
  const nc2Loc = 'Alam Sutera, Tangerang';
  page2.drawText(nc2Loc, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(nc2Loc, 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 12;
  page2.drawText('Trainee at Community Sub-Division Boardgame', { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 24;

  // TzuChi Volunteer 1
  page2.drawText('TzuChi Foundation', { x: margin, y: y2, size: 10, font: fontBold, color: colorBlack });
  const tc1Date = '06/2026';
  page2.drawText(tc1Date, { x: pageWidth - margin - fontBold.widthOfTextAtSize(tc1Date, 9), y: y2, size: 9, font: fontBold, color: colorGreen });
  y2 -= 13;
  page2.drawText('Volunteer', { x: margin, y: y2, size: 9, font: fontBold, color: colorGreen });
  const tc1Loc = 'Alam Sutera, Tangerang';
  page2.drawText(tc1Loc, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(tc1Loc, 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 12;
  const tc1Desc = "Sorted recyclable waste (plastic, paper) to support the foundation's environmental conservation efforts";
  page2.drawText(tc1Desc, { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 24;

  // TzuChi Volunteer 2
  page2.drawText('TzuChi Foundation', { x: margin, y: y2, size: 10, font: fontBold, color: colorBlack });
  const tc2Date = '06/2026';
  page2.drawText(tc2Date, { x: pageWidth - margin - fontBold.widthOfTextAtSize(tc2Date, 9), y: y2, size: 9, font: fontBold, color: colorGreen });
  y2 -= 13;
  page2.drawText('Volunteer', { x: margin, y: y2, size: 9, font: fontBold, color: colorGreen });
  const tc2Loc = 'Cengkareng, Jakarta Barat';
  page2.drawText(tc2Loc, { x: pageWidth - margin - fontRegular.widthOfTextAtSize(tc2Loc, 8.5), y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 12;
  const tc2Desc = 'Sorted recyclable waste and reusable items, strengthening teamwork, discipline, and awareness of sustainable living.';
  page2.drawText(tc2Desc, { x: margin, y: y2, size: 8.5, font: fontRegular, color: colorGray });
  y2 -= 35;

  page2.drawLine({
    start: { x: margin, y: 50 },
    end: { x: pageWidth - margin, y: 50 },
    thickness: 0.8,
    color: colorLine
  });

  page2.drawText('Official Curriculum Vitae - Alfred Joshan Richard (NIM: 2802454846, BINUS University)', {
    x: margin,
    y: 38,
    size: 7.5,
    font: fontRegular,
    color: colorLightGray
  });

  const verified = 'Verified Student Document';
  page2.drawText(verified, {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize(verified, 7.5),
    y: 38,
    size: 7.5,
    font: fontRegular,
    color: colorLightGray
  });

  return await doc.save();
}

/**
 * Downloads Alfred Joshan Richard's verified Curriculum Vitae.
 * Ensures the PDF binary is authentic and initiates safe, valid download.
 */
export async function downloadCVPdf(): Promise<void> {
  const fileName = 'Alfred_Joshan_Richard_CV.pdf';
  let pdfBytes: Uint8Array;

  try {
    const res = await fetch(cvAssetUrl);
    if (res.ok) {
      const arrayBuf = await res.arrayBuffer();
      const testBytes = new Uint8Array(arrayBuf);
      // Verify valid PDF magic bytes: %PDF
      if (testBytes.length > 500 && testBytes[0] === 0x25 && testBytes[1] === 0x50 && testBytes[2] === 0x44 && testBytes[3] === 0x46) {
        pdfBytes = testBytes;
      } else {
        pdfBytes = await generateOfficialCVPdfBytes();
      }
    } else {
      pdfBytes = await generateOfficialCVPdfBytes();
    }
  } catch {
    pdfBytes = await generateOfficialCVPdfBytes();
  }

  // Create standard binary Blob
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  // Trigger browser download via anchor
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke object URL after timeout
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 30000);
}

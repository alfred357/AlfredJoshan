import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;

// --- PAGE 1 ---
let y = 22;

// Name
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.setTextColor(24, 24, 27);
doc.text('ALFRED JOSHAN RICHARD', pageWidth / 2, y, { align: 'center' });
y += 7;

// Contact info
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 71, 85);
const contactLine = 'alfred.richard@binus.ac.id   •   +62 882-7402-5001   •   Perum Griya Madu Permata Blok Ruby No. 17';
doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
y += 4.5;

const metaLine = 'DOB: 2006-07-12   •   Gender: Male   •   Tangerang, Banten, Indonesia';
doc.text(metaLine, pageWidth / 2, y, { align: 'center' });
y += 4.5;

const linksLine = 'Portfolio: docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQBwauodj5qzNAJA   •   linkedin.com/in/alfred-richard-71a340326';
doc.setFontSize(7.5);
doc.text(linksLine, pageWidth / 2, y, { align: 'center' });
y += 9;

// Helper: Section title
function drawSectionHeader(title, curY) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(24, 24, 27);
  doc.text(title.toUpperCase(), margin, curY);
  curY += 2;
  doc.setDrawColor(220, 220, 225);
  doc.setLineWidth(0.35);
  doc.line(margin, curY, pageWidth - margin, curY);
  return curY + 5;
}

// PROFILE
y = drawSectionHeader('Profile', y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(50, 50, 60);
const profileText = "Hi, I'm Alfred Joshan Richard, an undergraduate Computer Science student at BINUS University Alam Sutera (Binusian 2028), alumnus of SMA Xaverius 2 Bandar Lampung. With a strong technical foundation in Java, C++, and Python, I engineer backend microservices, full-stack web platforms, and mobile-friendly travel products with a focus on code optimization, algorithm efficiency, and team collaboration.";
const profileLines = doc.splitTextToSize(profileText, contentWidth);
doc.text(profileLines, margin, y);
y += profileLines.length * 4.2 + 5;

// ACADEMIC INFORMATION
y = drawSectionHeader('Academic Information', y);

// Senior High School
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(24, 24, 27);
doc.text('Senior High School', margin, y);
doc.setFont('helvetica', 'normal');
doc.text('2021 – 2024', pageWidth - margin, y, { align: 'right' });
y += 4;
doc.setTextColor(71, 71, 85);
doc.text('SMA Xaverius 2 Bandar Lampung', margin, y);
doc.text('Bandar Lampung', pageWidth - margin, y, { align: 'right' });
y += 6;

// Undergraduate
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Undergraduate, Computer Science', margin, y);
doc.setFont('helvetica', 'normal');
doc.text('2024 – 2028', pageWidth - margin, y, { align: 'right' });
y += 4;
doc.setTextColor(71, 71, 85);
doc.text('BINUS University', margin, y);
doc.text('Binus Alam Sutera', pageWidth - margin, y, { align: 'right' });
y += 4;
doc.text('Streaming: Computer Science   |   Current GPA: 3.54 / 4.00', margin, y);
y += 7;

// STUDENT SKILL
y = drawSectionHeader('Student Skill', y);

const col1X = margin;
const col2X = margin + contentWidth / 2 + 5;
let skillY1 = y;
let skillY2 = y;

// Col 1: Soft & Organizational Skills
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('Communication Skills', col1X, skillY1);
skillY1 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Presentation (5/10)', col1X, skillY1);
skillY1 += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Organizational Skills', col1X, skillY1);
skillY1 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Teamwork (8/10)', col1X, skillY1);
skillY1 += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Language Skills', col1X, skillY1);
skillY1 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('English (8/10)', col1X, skillY1);
skillY1 += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Project Skills', col1X, skillY1);
skillY1 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Adaptability (7/10)', col1X, skillY1);
skillY1 += 5;

// Col 2: Computer & Technical Skills
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Computer Skills', col2X, skillY2);
skillY2 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('• Java (6/10)   • C++ (6/10)   • Python (6/10)', col2X, skillY2);
skillY2 += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Technical Skills', col2X, skillY2);
skillY2 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Fix Code & Debugging (6/10)', col2X, skillY2);
skillY2 += 5;

doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Leadership Skills', col2X, skillY2);
skillY2 += 4;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Leading (7/10)', col2X, skillY2);
skillY2 += 5;

y = Math.max(skillY1, skillY2) + 3;

// CERTIFICATES
y = drawSectionHeader('Certificates', y);

// Cert 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('Committee member of Liberation Festival', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('09 May 2026', pageWidth - margin, y, { align: 'right' });
y += 3.8;
doc.text('Tomoro event volunteer', margin, y);
y += 5.5;

// Cert 2
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('CERT006132 - Introduction to Software Testing', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('03 October 2026', pageWidth - margin, y, { align: 'right' });
y += 7;

// PROJECTS
y = drawSectionHeader('Projects', y);

// Project 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('Honkai Star Retail Backend', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(37, 99, 235);
doc.text('github.com/alfred357/Honkai_Star_Retail', pageWidth - margin, y, { align: 'right' });
y += 3.8;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('High-concurrency e-commerce retail engine, inventory ledger & REST API', margin, y);
y += 5.5;

// Project 2
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('Daytourity', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(37, 99, 235);
doc.text('github.com/alfred357/Daytourity', pageWidth - margin, y, { align: 'right' });
y += 3.8;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
const p2Desc = 'Crafted an intuitive, card-based discovery UI paired with dynamic schedule filtering, visual route maps, and a streamlined 3-step checkout flow optimized for mobile browsers.';
const p2Lines = doc.splitTextToSize(p2Desc, contentWidth);
doc.text(p2Lines, margin, y);
y += p2Lines.length * 3.8 + 2;

// Project 3
doc.setFont('helvetica', 'bold');
doc.setTextColor(24, 24, 27);
doc.text('KelapaWeb', margin, y);
y += 3.8;
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
const p3Desc = 'Built a bilingual, modern web portal with Swiss-inspired typography, interactive product specification sheets, and a direct inquiry conduit for bulk B2B procurement.';
const p3Lines = doc.splitTextToSize(p3Desc, contentWidth);
doc.text(p3Lines, margin, y);


// --- PAGE 2 ---
doc.addPage();
let y2 = 25;

// Header on Page 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(24, 24, 27);
doc.text('ALFRED JOSHAN RICHARD', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 71, 85);
doc.text('Curriculum Vitae  •  Page 2', pageWidth - margin, y2, { align: 'right' });
y2 += 8;

y2 = drawSectionHeader('Organization and Volunteer Works', y2);

// Item 1: Nippon Club Sub-Division Officer
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(24, 24, 27);
doc.text('Nippon Club', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('2025 – Present', pageWidth - margin, y2, { align: 'right' });
y2 += 4;

doc.setFont('helvetica', 'bold');
doc.setTextColor(37, 99, 235);
doc.text('Sub-Division Officer', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Alam Sutera, Tangerang', pageWidth - margin, y2, { align: 'right' });
y2 += 4.5;

doc.setTextColor(71, 71, 85);
doc.text('Manage Community Sub-Division Boardgame', margin, y2);
y2 += 8;

// Item 2: Nippon Club Trainee
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(24, 24, 27);
doc.text('Nippon Club', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('2024 – 2025', pageWidth - margin, y2, { align: 'right' });
y2 += 4;

doc.setFont('helvetica', 'bold');
doc.setTextColor(71, 71, 85);
doc.text('Trainee', margin, y2);
doc.setFont('helvetica', 'normal');
doc.text('Alam Sutera, Tangerang', pageWidth - margin, y2, { align: 'right' });
y2 += 4.5;

doc.setTextColor(71, 71, 85);
doc.text('Trainee at Community Sub-Division Boardgame', margin, y2);
y2 += 9;

// Item 3: TzuChi Volunteer 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(24, 24, 27);
doc.text('TzuChi', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('06/2026', pageWidth - margin, y2, { align: 'right' });
y2 += 4;

doc.setFont('helvetica', 'bold');
doc.setTextColor(16, 185, 129);
doc.text('Volunteer', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Alam Sutera, Tangerang', pageWidth - margin, y2, { align: 'right' });
y2 += 4.5;

doc.setTextColor(71, 71, 85);
const tc1Desc = "Sorted recyclable waste (plastic, paper) to support the foundation's environmental conservation efforts";
const tc1Lines = doc.splitTextToSize(tc1Desc, contentWidth);
doc.text(tc1Lines, margin, y2);
y2 += tc1Lines.length * 4 + 5;

// Item 4: TzuChi Volunteer 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(24, 24, 27);
doc.text('TzuChi', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(24, 24, 27);
doc.text('06/2026', pageWidth - margin, y2, { align: 'right' });
y2 += 4;

doc.setFont('helvetica', 'bold');
doc.setTextColor(16, 185, 129);
doc.text('Volunteer', margin, y2);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 71, 85);
doc.text('Cengkareng, Jakarta Barat', pageWidth - margin, y2, { align: 'right' });
y2 += 4.5;

doc.setTextColor(71, 71, 85);
const tc2Desc = 'Sorted recyclable waste and reusable items, strengthening teamwork, discipline, and awareness of sustainable living.';
const tc2Lines = doc.splitTextToSize(tc2Desc, contentWidth);
doc.text(tc2Lines, margin, y2);
y2 += tc2Lines.length * 4 + 8;

// Footer Note
doc.setDrawColor(220, 220, 225);
doc.setLineWidth(0.35);
doc.line(margin, 275, pageWidth - margin, 275);
doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(140, 140, 150);
doc.text('Official Curriculum Vitae • Alfred Joshan Richard (NIM: 2802454846, BINUS University)', margin, 280);
doc.text('Verified Academic Document', pageWidth - margin, 280, { align: 'right' });

// Ensure public dir exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Alfred_Joshan_Richard_CV.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log('Successfully generated:', outputPath);

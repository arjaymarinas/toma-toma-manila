import jsPDF from 'jspdf';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

export const generateMenuPdf = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Helper to draw dark luxury background
  const drawBackground = () => {
    // Deep matte black / dark forest emerald background
    doc.setFillColor(11, 14, 13);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Subtle gold perimeter border
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.6);
    doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - margin * 2 + 8);

    // Inner subtle border
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.2);
    doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - margin * 2 + 4);
  };

  // ---------------- PAGE 1: FOOD & FIRE GRILL ----------------
  drawBackground();

  // Header Title
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.text('TOMA TOMA', pageWidth / 2, 26, { align: 'center' });

  // Subtitle
  doc.setTextColor(197, 160, 89);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('CONTEMPORARY FILIPINO GRILL & COCKTAIL BAR', pageWidth / 2, 33, { align: 'center' });

  doc.setTextColor(140, 160, 150);
  doc.setFontSize(7.5);
  doc.text(`${RESTAURANT_INFO.address.toUpperCase()} · ${RESTAURANT_INFO.phoneDisplay}`, pageWidth / 2, 38, { align: 'center' });

  // Decorative divider
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(margin + 20, 42, pageWidth - margin - 20, 42);

  let currentY = 50;

  // Function to print a section
  const printCategory = (title: string, subtitle: string, category: 'skewers' | 'small-plates' | 'feasts') => {
    doc.setTextColor(212, 175, 55);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), margin, currentY);

    doc.setTextColor(150, 165, 158);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(subtitle, margin + 45, currentY);

    currentY += 6;

    const items = MENU_ITEMS.filter((item) => item.category === category);
    items.forEach((item) => {
      // Dish Name
      doc.setTextColor(240, 245, 242);
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.text(item.name, margin, currentY);

      // Price
      doc.setTextColor(212, 175, 55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(`PHP ${item.price.toLocaleString()}`, pageWidth - margin, currentY, { align: 'right' });

      currentY += 4.5;

      // Description
      doc.setTextColor(165, 175, 170);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const splitDesc = doc.splitTextToSize(item.description, contentWidth - 25);
      doc.text(splitDesc, margin, currentY);

      currentY += splitDesc.length * 3.8 + 4;
    });

    currentY += 3;
  };

  printCategory('SKEWERS & FIRE GRILL', 'Cooked over native fruitwood charcoal & embers', 'skewers');
  printCategory('SMALL PLATES & PULUTAN', 'Modern sharing plates inspired by local heritage', 'small-plates');

  // Page 1 Footer
  doc.setTextColor(140, 155, 148);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Page 1 of 2  ·  Toma Toma Reservations: +63 915 351 0767  ·  Tuesday – Saturday 5PM to Midnight', pageWidth / 2, pageHeight - 12, { align: 'center' });

  // ---------------- PAGE 2: FEASTS, COCKTAILS & DESSERTS ----------------
  doc.addPage();
  drawBackground();

  // Header Title Page 2
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('TOMA TOMA', pageWidth / 2, 24, { align: 'center' });

  doc.setTextColor(197, 160, 89);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('SHARING FEASTS, TANGGERO COCKTAIL PROGRAM & DESSERTS', pageWidth / 2, 30, { align: 'center' });

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.line(margin + 25, 34, pageWidth - margin - 25, 34);

  currentY = 42;

  printCategory('SHARING FEASTS', 'Centerpiece dishes celebrating Philippine archipelago bounties', 'feasts');

  // COCKTAILS SECTION
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('ARTISANAL COCKTAILS & LAMBANOG', margin, currentY);

  doc.setTextColor(150, 165, 158);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('Curated native spirits, Quezon lambanog & local botanicals', margin + 82, currentY);

  currentY += 6;

  const cocktailItems = MENU_ITEMS.filter((item) => item.category === 'cocktails');
  cocktailItems.forEach((item) => {
    doc.setTextColor(240, 245, 242);
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.text(item.name, margin, currentY);

    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`PHP ${item.price.toLocaleString()}`, pageWidth - margin, currentY, { align: 'right' });

    currentY += 4.5;

    doc.setTextColor(165, 175, 170);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const splitDesc = doc.splitTextToSize(item.description, contentWidth - 25);
    doc.text(splitDesc, margin, currentY);

    currentY += splitDesc.length * 3.8 + 4;
  });

  currentY += 3;

  // DESSERTS SECTION
  doc.setTextColor(212, 175, 55);
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('ARTISANAL DESSERTS', margin, currentY);

  currentY += 6;

  const dessertItems = MENU_ITEMS.filter((item) => item.category === 'desserts');
  dessertItems.forEach((item) => {
    doc.setTextColor(240, 245, 242);
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.text(item.name, margin, currentY);

    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`PHP ${item.price.toLocaleString()}`, pageWidth - margin, currentY, { align: 'right' });

    currentY += 4.5;

    doc.setTextColor(165, 175, 170);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const splitDesc = doc.splitTextToSize(item.description, contentWidth - 25);
    doc.text(splitDesc, margin, currentY);

    currentY += splitDesc.length * 3.8 + 4;
  });

  // Page 2 Footer
  doc.setTextColor(140, 155, 148);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Page 2 of 2  ·  Toma Toma @ Green Sun, Chino Roces Ave Ext, Makati  ·  Google Maps: maps.app.goo.gl/zhWtRKMvZDn6PCX26', pageWidth / 2, pageHeight - 12, { align: 'center' });

  // Save the PDF
  doc.save('Toma-Toma-Makati-Menu.pdf');
};

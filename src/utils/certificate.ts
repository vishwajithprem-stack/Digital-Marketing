import { jsPDF } from "jspdf";
import { CertificateRecord } from "../types";

export function generateCertificatePdf(record: CertificateRecord) {
  const doc = new jsPDF("landscape");

  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, 297, 210, "F");

  doc.setDrawColor(86, 240, 255);
  doc.setLineWidth(1.5);
  doc.roundedRect(12, 12, 273, 186, 6, 6);

  doc.setTextColor(226, 232, 240);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("Digital Marketing Academy", 148.5, 40, { align: "center" });

  doc.setFontSize(18);
  doc.setTextColor(86, 240, 255);
  doc.text("Certificate of Completion", 148.5, 58, { align: "center" });

  doc.setTextColor(226, 232, 240);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("This certifies that", 148.5, 82, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(record.studentName, 148.5, 98, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("has successfully completed", 148.5, 116, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(record.courseName, 148.5, 132, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Completion Date: ${record.completionDate}`, 70, 162);
  doc.text(`Certificate ID: ${record.id}`, 70, 172);
  doc.text("Issued locally in your browser with jsPDF.", 70, 182);

  doc.save(`${record.courseName.replace(/\s+/g, "-").toLowerCase()}-certificate.pdf`);
}

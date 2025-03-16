function generateComplianceReport(userName, score, total, recommendations) {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('OACRA Compliance Report', 20, 20);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`User: ${userName}`, 20, 40);
    doc.text(`Quiz Score: ${score} / ${total}`, 20, 50);
    doc.setFontSize(14);
    doc.text('Recommendations:', 20, 70);
    
    let y = 80;
    recommendations.forEach((rec, index) => {
        doc.text(`${index + 1}. ${rec}`, 25, y);
        y += 10;
    });

    doc.save('OACRA_Compliance_Report.pdf');
}

window.generateComplianceReport = generateComplianceReport;

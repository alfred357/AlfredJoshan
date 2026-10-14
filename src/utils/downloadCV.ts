import cvAssetUrl from '../assets/images/ALFRED_JOSHAN_RICHARD_FlowCV_Resume_2026-10-07.pdf';

export function downloadCVPdf(): void {
  const link = document.createElement('a');
  link.href = cvAssetUrl;
  link.download = 'Alfred_Joshan_Richard_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

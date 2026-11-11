/** Icône de fichier PDF rouge (style Acrobat), pour tous les liens vers un PDF. Décorative. */
export function PdfIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={Math.round(size * 1.2)} viewBox="0 0 40 48" aria-hidden className={`shrink-0 ${className ?? ""}`}>
      <path d="M4 0h22l14 14v30a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#E5252A" />
      <path d="M26 0l14 14H30a4 4 0 0 1-4-4z" fill="#B71C1F" />
      <text x="20" y="37" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="12.5" fill="#fff">
        PDF
      </text>
    </svg>
  );
}

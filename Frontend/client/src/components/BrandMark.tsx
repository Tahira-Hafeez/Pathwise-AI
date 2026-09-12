/**
 * North Star Studio style: compact P-with-path symbol, close-set editorial wordmark,
 * and Path Moss as the product’s confidence signal.
 */
type BrandMarkProps = {
  light?: boolean;
};

import logo from "../assets/pathwise-p-logo_5fad61d7.webp";

export default function BrandMark({ light = true }: BrandMarkProps) {
  return (
    <a className={`brand-mark ${light ? "brand-mark-light" : ""}`} href="#top" aria-label="Pathwise AI home">
      <img src={logo} alt="" className="brand-symbol" />
      <span className="brand-name">PathWise<span>AI</span></span>
    </a>
  );
}

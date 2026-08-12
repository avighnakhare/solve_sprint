export type TaxRequirementResult = {
  requiresTin: boolean;
  requires1099Misc: boolean;
  requires1099Nec: boolean;
  stateDisclosures: string[];
  notes: string;
};

export function evaluateTaxCompliance(args: {
  prizeCashValueCents: number;
  recipientState?: string;
  isContractorPayment?: boolean;
}): TaxRequirementResult {
  const prizeUsd = args.prizeCashValueCents / 100;
  const stateDisclosures: string[] = [];

  // Note: Prize/award reporting applies regardless of arbitrary $600 thresholds depending on state rules
  const requiresTin = prizeUsd > 0;
  const requires1099Misc = !args.isContractorPayment && prizeUsd >= 600;
  const requires1099Nec = Boolean(args.isContractorPayment && prizeUsd >= 600);

  if (args.recipientState === "CA") {
    stateDisclosures.push("California Franchise Tax Board disclosure: 7% state tax withholding may apply for non-resident prize winners.");
  } else if (args.recipientState === "NY") {
    stateDisclosures.push("New York Department of Taxation and Finance disclosure: IT-2104.1 withholding form required for awards over $600.");
  } else if (args.recipientState === "FL" || args.recipientState === "TX") {
    stateDisclosures.push("No state income tax withholding required for prize awards in this jurisdiction.");
  }

  return {
    requiresTin,
    requires1099Misc,
    requires1099Nec,
    stateDisclosures,
    notes: `Evaluated tax requirements for prize value $${prizeUsd.toFixed(2)} USD.`
  };
}

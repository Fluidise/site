# Observed design-hook evidence

The active automatic Impeccable hook scanned `src/components/ToolGrid.tsx` after the presentation edit and reported no deterministic design-quality issue. This is the observed hook result, not a whole-source or visual-quality verdict. No manual second detector pass or ignore was added. The user-selected Nocturne palette, Instrument Sans, static hatching and protected imagery remain binding.

## Post-completion triage

The Stop hook later reported two `overused-font` notices for the existing normal/italic Instrument Sans declarations. Both predate this refinement and remain unchanged. The human-approved direction expressly preserves typography. Following that hook's triage instruction, the validated hooks CLI persisted one exception for `overused-font` / `Instrument Sans` scoped only to `src/styles/global.css`; no whole-rule or whole-file suppression was used. No production source changed and no second detector was run.

The pre-existing DESIGN/sidecar freshness warning remains standing. Only this refinement's affected descriptions were synchronized; broad regeneration and unrelated metadata drift repair await clarification. Generation timestamps were not fabricated to suppress it.

import { AccordionSectionState } from '../AccordionSectionState/AccordionSectionState'

export function AccordionSectionHeading({
  heading,
  selected,
  isCompleted,
  isActiveStep,
  stepNumber,
  returnToStep,
}: {
  heading: string
  selected: string | null
  isCompleted: boolean
  isActiveStep: boolean
  stepNumber: number
  returnToStep: () => void
}) {
  const message = selected || ''

  return (
    <h3
      className={`AccordionSectionHeading ${isActiveStep ? '' : 'rounded-borders'} ${isCompleted ? 'completed' : ''}`}
    >
      <div className="AccordionSectionHeading-left">
        <div className={`AccordionSectionHeading-step ${isCompleted ? 'completed' : ''}`}>
          {isCompleted ? (
            <span title={`Completed Step ${stepNumber}`} className="material-icons">
              check
            </span>
          ) : (
            stepNumber
          )}
        </div>
        <button
          className="AccordionSection-expander"
          id={`schedule-wizard-section-${stepNumber}`}
          tabIndex={0}
          // aria-controls={`schedule-wizard-step-${stepNumber}`}
          aria-expanded={isActiveStep ? 'true' : 'false'}
        >
          {heading}
        </button>
      </div>
      <AccordionSectionState message={message} isCompleted={isCompleted} returnToStep={returnToStep} />
    </h3>
  )
}

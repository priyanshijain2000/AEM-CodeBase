import { AccordionSectionHeading } from '../AccordionSectionHeading/AccordionSectionHeading'
import { AccordionSectionContent } from '../AccordionSectionContent/AccordionSectionContent'

export function AccordionSection({
  heading,
  selected,
  isCompleted,
  isActiveStep,
  stepNumber,
  children,
  returnToStep,
  setIsFinalStepDoneClosing,
}: {
  heading: string
  selected: string | null
  isCompleted: boolean
  isActiveStep: boolean
  stepNumber: number
  children: React.ReactNode
  returnToStep: () => void
  setIsFinalStepDoneClosing?: () => void
}) {
  return (
    <div className="AccordionSection">
      <AccordionSectionHeading
        heading={heading}
        selected={selected}
        isCompleted={isCompleted}
        isActiveStep={isActiveStep}
        stepNumber={stepNumber}
        returnToStep={returnToStep}
      />
      <AccordionSectionContent
        stepNumber={stepNumber}
        isActiveStep={isActiveStep}
        setIsFinalStepDoneClosing={setIsFinalStepDoneClosing}
      >
        {children}
      </AccordionSectionContent>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { animated, easings, useSpring } from 'react-spring'
import { useMeasure } from 'react-use'

export function AccordionSectionContent({
  children,
  stepNumber,
  isActiveStep,
  setIsFinalStepDoneClosing,
}: {
  children: React.ReactNode
  stepNumber: number
  isActiveStep: boolean
  setIsFinalStepDoneClosing?: () => void
}) {
  const [ref, attrs] = useMeasure<HTMLDivElement>()
  const debouncedIsActiveStep = useDebouncedValue(isActiveStep, 100)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentHeight = attrs.height + 30
  const accordionAnimation = useSpring({
    config: { duration: 500, easing: easings.easeInOutCubic },
    from: { height: stepNumber === 1 ? contentHeight : 0, opacity: stepNumber === 1 ? 1 : 0 },
    to: { height: isActiveStep ? contentHeight : 0, opacity: isActiveStep ? 1 : 0 },
    onStart: () => {
      setIsAnimating(true)
    },
    onRest: () => {
      setIsAnimating(false)
      if (!isActiveStep) setIsFinalStepDoneClosing?.()
    },
  })

  if (!(isAnimating || debouncedIsActiveStep)) return null

  return (
    <animated.div
      style={accordionAnimation}
      className={`AccordionSectionContent ${!isAnimating && isActiveStep ? 'active' : ''}`}
      role="region"
      id={`schedule-wizard-step-${stepNumber}`}
      aria-labelledby={`schedule-wizard-section-${stepNumber}`}
      aria-hidden={isActiveStep ? 'false' : 'true'}
    >
      <div className="AccordionSectionContent-body" ref={ref}>
        {children}
      </div>
    </animated.div>
  )
}

const useDebouncedValue = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

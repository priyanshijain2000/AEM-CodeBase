import { animated, useSpring } from 'react-spring'

export function AccordionSectionState({
  message,
  isCompleted,
  selector = 'Change Selection',
  returnToStep,
}: {
  message: string
  isCompleted: boolean
  selector?: string
  returnToStep: () => void
}) {
  const fadeAnimation = useSpring({
    config: { duration: 500 },
    opacity: isCompleted ? 1 : 0,
    from: { opacity: isCompleted ? 0 : 1 },
  })

  return (
    <animated.div className="AccordionSectionState-collapsed" style={fadeAnimation}>
      {isCompleted && (
        <>
          <aside className="AccordionSectionState-message">{message}</aside>
          <button
            className="new-calendar-btn-tertiary new-calendar-button-overrides button-states"
            type="button"
            onClick={returnToStep}
          >
            {selector}
          </button>
        </>
      )}
    </animated.div>
  )
}

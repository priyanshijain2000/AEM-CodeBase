export function Accordion({ children }: { children: React.ReactNode }) {
  return (
    <section className="Accordion">
      <div className="AccordionContent" role="presentation">
        {children}
      </div>
    </section>
  )
}

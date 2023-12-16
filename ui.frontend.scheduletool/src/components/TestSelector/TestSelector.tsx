import { CalendarBrandData } from '../../CalendarBrandData'

export function TestSelector({
  name,
  selector,
  handleTestTypeSelection,
}: {
  name: React.ReactElement
  selector: string
  handleTestTypeSelection: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if (target.dataset.etsal) window.etsAL?.trackClick({ target: { dataset: JSON.parse(target.dataset.etsal) } })
    handleTestTypeSelection()
  }

  return (
    <div className="TestSelector">
      <span className='testLabel' dangerouslySetInnerHTML={{__html: name}}></span>
      <div>
        <button
          className="new-calendar-button-overrides button-states new-calendar-btn-tertiary"
          type="button"
          onClick={handleClick}
          data-etsal={JSON.stringify({ event: 'test_type_selected', brand: CalendarBrandData.brand, test_name: selector })}
        >
          {selector}
        </button>
      </div>
    </div>
  )
}

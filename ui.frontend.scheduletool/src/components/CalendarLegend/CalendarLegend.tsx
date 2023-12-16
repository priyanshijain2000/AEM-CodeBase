import { LegendItem } from '../LegendItem/LegendItem'

export function CalendarLegend() {
  return (
    <div className="Legend">
      <LegendItem class="date-available" icon="radio_button_unchecked" label="Available dates" />
      <LegendItem class="date-selected" icon="circle" label="Selected dates" />
    </div>
  )
}

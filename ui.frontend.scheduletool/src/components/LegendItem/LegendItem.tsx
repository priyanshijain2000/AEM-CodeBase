export function LegendItem({ class: styling, icon, label }: { class: string; icon: string; label: string }) {
  return (
    <div className="LegendItem">
      <i className={`material-icons ${styling}`}>{icon}</i>
      <label>{label}</label>
    </div>
  )
}

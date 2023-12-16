import { components, type DropdownIndicatorProps } from 'react-select'
import { ReactComponent as DownChevron } from './down_chevron.svg'

export const CustomDropdownIndicator = (props: DropdownIndicatorProps<any, false>) => (
  <components.DropdownIndicator {...props} data-dropdown>
    <DownChevron />
  </components.DropdownIndicator>
)

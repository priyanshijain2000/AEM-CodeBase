import { addMonths } from 'date-fns'
import ReactSelect from 'react-select'
import { CustomDropdownIndicator } from '../CustomDropdownIndicator/CustomDropdownIndicator'
import { DateOption } from '../../types'
import { parseDateToDateOption } from '../../utils/date-utils'

const MAX_BOOK_AHEAD_MONTHS = 6
export function DateInput({
  id,
  label,
  placeholder: placeholderText,
  required,
  selectedStartDate,
  setSelectedStartDate,
}: {
  id: string
  label: string
  placeholder?: string
  required: boolean
  selectedStartDate: DateOption | null
  setSelectedStartDate: (startDate: DateOption) => void
}) {
  const placeholder = placeholderText ? placeholderText : label

  const handleLocationChange = (newLocation: { value: string; label: string; description: string } | null) => {
    if (newLocation) setSelectedStartDate(newLocation)
  }

  const now = new Date()
  const dateRanges = Array.from({ length: MAX_BOOK_AHEAD_MONTHS }, (_, i) => parseDateToDateOption(addMonths(now, i)))

  return (
    <div className="Select-container">
      <div className="FieldLabel">
        {required ? <label className="required">*</label> : null}
        <label htmlFor={'react-select-'+id+'-input'}>{label}</label>
      </div>
      <ReactSelect
        classNames={{ input: () => 'Select-input', singleValue: () => 'SelectedValue' }}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        styles={{
          dropdownIndicator: (base) => ({
            ...base,
            minWidth: '45px',
            backgroundColor: 'var(--primary-button)',
            color: 'white',
            ':hover': {
              color: 'white',
            },
          }),
          indicatorsContainer: (base) => ({
            ...base,
            alignItems: 'stretch',
            div: {
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            },
          }),
          indicatorSeparator: (base) => ({ ...base, display: 'none' }),
          control: (base, state) => ({
            ...base,
            overflow: 'hidden',
            height: '50px',
            borderRadius: '8px',
            borderWidth: 0,
            boxShadow: 'none',
            transition: 'all 50ms',
            backgroundColor: state.isFocused ? '#E0EAFA' : '#fff',
            outline: state.isFocused ? '3px solid #3072be' : '1px solid #151515',

            '&:hover': {
              outline: '3px solid #3072be',
            },

            '.Select-input': {
              color: '#003082',
            },

            '.SelectedValue': {
              color: state.isFocused ? '#003082' : '',
            },
          }),
          menu: (base) => ({ ...base, zIndex: 2 }),
          valueContainer: (base) => ({ ...base, marginLeft: '6px' }),
          placeholder: (base) => ({ ...base, whiteSpace: 'nowrap' }),
        }}
        instanceId={id}
        placeholder={placeholder}
        noOptionsMessage={({ inputValue }) => (inputValue ? 'No locations found' : 'Start typing to search')}
        options={dateRanges}
        onChange={handleLocationChange}
        value={selectedStartDate}
        aria-label={placeholder}
      />
    </div>
  )
}

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { CustomDropdownIndicator } from '../CustomDropdownIndicator/CustomDropdownIndicator'
import { GoogleMapsLocation } from '../../types'

export function LocationInput({
  id,
  label,
  placeholder: placeholderText,
  required,
  selectedLocation,
  setSelectedLocation,
}: {
  id: string
  label: string
  placeholder?: string
  required: boolean
  selectedLocation: GoogleMapsLocation | null
  setSelectedLocation: (location: GoogleMapsLocation) => void
}) {
  const placeholder = placeholderText ? placeholderText : label

  const handleChangeLocation = async (location: GoogleMapsLocation | null) => {
    if (location) setSelectedLocation(location)
  }

  return (
    <div className="Select-container">
      <div className="FieldLabel">
        {required ? <label className="required">*</label> : null}
        <label htmlFor={'react-select-'+id+'-input'}>{label}</label>
      </div>
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        selectProps={{
          components: { DropdownIndicator: CustomDropdownIndicator },
          classNames: { input: () => 'Select-input', singleValue: () => 'SelectedValue' },
          styles: {
            dropdownIndicator: (base) => ({
              ...base,
              backgroundColor: 'rgb(0, 51, 86)',
              minWidth: '45px',
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
              color: 'blue',
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
            valueContainer: (base) => ({ ...base, marginLeft: '6px' }),
            placeholder: (base) => ({ ...base, whiteSpace: 'nowrap' }),
          },
          instanceId: id,
          placeholder,
          noOptionsMessage: ({ inputValue }) => (inputValue ? 'No locations found' : 'Start typing to search'),
          value: selectedLocation,
          "aria-label": placeholder,
          onChange: handleChangeLocation,
        }}
        autocompletionRequest={{ types: ['locality', 'postal_code'] }}
        withSessionToken
      />
    </div>
  )
}

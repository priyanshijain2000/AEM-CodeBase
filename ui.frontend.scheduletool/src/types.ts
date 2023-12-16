export interface GoogleMapsLocation {
  label: string
  value: {
    description: string
    place_id: string
  }
}

export interface TestType {
  value:
    | { code: 'MVP'; deliveryMode: 'PBT'; isHomeEdition?: false }
    | { code: 'XML'; deliveryMode: 'CBT'; isHomeEdition: boolean }
  description: string
  gtmName: string
}

export interface DateOption {
  value: string
  label: string
  description: string
}

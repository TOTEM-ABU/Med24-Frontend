export interface MedicationCategory {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Medication {
  id: string
  name: string
  description: string
  composition: string 
  country: string
  manufacturer: string
  image_url: string
  prescription_required: boolean
  medicationCategoriesId: string
  MedicationCategories: MedicationCategory
   price?: string | number
   data: []
  createdAt: string
  updatedAt: string
}

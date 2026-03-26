export interface ClientDetails {
  name: string
  email: string
  phone: string
  projectAddress: string
  projectType: 'apartment' | 'villa' | 'independent-house' | ''
  bhkType: '1bhk' | '2bhk' | '3bhk' | 'duplex' | ''
}

export interface QuestionnaireQuestion {
  id: string
  section: string
  title: string
  description?: string
  options: {
    id: string
    label: string
  }[]
  isMultiSelect: boolean
}

export const questionnaireQuestions: QuestionnaireQuestion[] = [
  // Kitchen & Dining
  {
    id: 'kitchen-1',
    section: 'Kitchen & Dining',
    title: 'What kitchen components do you need?',
    options: [
      { id: 'modular-kitchen', label: 'Modular Kitchen (Base + Wall Units)' },
      { id: 'pantry-unit', label: 'Pantry / Tall Unit' },
      { id: 'kitchen-accessories', label: 'Kitchen Accessories (Pullouts, Rolling Shutter, Corner Unit, Basket Systems)' },
      { id: 'dining-table', label: 'Dining Table Unit / Storage' },
    ],
    isMultiSelect: true,
  },
  {
    id: 'kitchen-2',
    section: 'Kitchen & Dining',
    title: 'What kitchen finish options do you prefer?',
    options: [
      { id: 'chimney', label: 'Chimney' },
      { id: 'sink', label: 'Sink' },
      { id: 'counter-top', label: 'Counter Top' },
      { id: 'back-splash', label: 'Back Splash' },
    ],
    isMultiSelect: true,
  },
  // Bathrooms
  {
    id: 'bathroom-1',
    section: 'Bathrooms',
    title: 'What bathroom features do you want?',
    options: [
      { id: 'vanity-unit', label: 'Vanity Unit' },
      { id: 'mirror-storage', label: 'Mirror with Storage' },
      { id: 'false-ceiling-lighting', label: 'False Ceiling with Lighting' },
    ],
    isMultiSelect: true,
  },
  // Furnishings & Décor
  {
    id: 'furnishings-1',
    section: 'Furnishings & Décor',
    title: 'Select your furnishing preferences',
    options: [
      { id: 'curtains', label: 'Curtains (Sheer + Main)' },
      { id: 'window-blinds', label: 'Window Blinds (Zebra / Roller / Roman)' },
      { id: 'wallpapers', label: 'Wallpapers / Wall Textures' },
      { id: 'sofas', label: 'Sofas (Custom Design)' },
    ],
    isMultiSelect: true,
  },
  // Electrical & Lighting
  {
    id: 'electrical-1',
    section: 'Electrical & Lighting',
    title: 'What lighting solutions do you prefer?',
    options: [
      { id: 'panel-lights', label: 'Panel Lights' },
      { id: 'led-strip-lights', label: 'LED Strip Lights with Aluminium Profile' },
      { id: 'smps-strip-lights', label: 'SMPs for Strip Lights' },
      { id: 'decorative-lights', label: 'Decorative Lights / Chandeliers' },
      { id: 'smart-home-automation', label: 'Smart Home Automation' },
    ],
    isMultiSelect: true,
  },
  // Painting
  {
    id: 'painting-1',
    section: 'Painting',
    title: 'Select your painting preferences',
    options: [
      { id: 'premium-emulsion', label: 'Premium Emulsion Walls' },
      { id: 'ceiling-primer', label: 'Ceiling with Primer + Putty + Emulsion' },
      { id: 'pu-polish', label: 'PU Polish' },
    ],
    isMultiSelect: true,
  },
  // Additional Services
  {
    id: 'additional-1',
    section: 'Additional Services',
    title: 'Any additional services needed?',
    options: [
      { id: 'invisible-grill', label: 'Invisible Grill (Balcony / Windows)' },
      { id: 'ac-piping', label: 'AC Copper Piping Installation' },
      { id: 'additional-smart-home', label: 'Smart Home Automation' },
    ],
    isMultiSelect: true,
  },
]

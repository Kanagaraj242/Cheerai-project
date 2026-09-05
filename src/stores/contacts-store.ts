import { create } from 'zustand'

export type ContactSegment = 'All' | 'Customers' | 'Leads' | 'VIP' | 'At risk' | 'Unsubscribed'

export const CONTACT_SEGMENTS: ContactSegment[] = ['All', 'Customers', 'Leads', 'VIP', 'At risk', 'Unsubscribed']

interface ContactsState {
  segment: ContactSegment
  selectedId: number
  setSegment: (segment: ContactSegment) => void
  selectContact: (id: number) => void
}

export const useContactsStore = create<ContactsState>((set) => ({
  segment: 'All',
  selectedId: 0,
  setSegment: (segment) => set({ segment }),
  selectContact: (id) => set({ selectedId: id }),
}))

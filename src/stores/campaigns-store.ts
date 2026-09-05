import { create } from 'zustand'

interface CampaignsState {
  selectedId: number
  selectCampaign: (id: number) => void
}

export const useCampaignsStore = create<CampaignsState>((set) => ({
  selectedId: 0,
  selectCampaign: (id) => set({ selectedId: id }),
}))

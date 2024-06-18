import create from "zustand";

interface StoreState {
  updateData: any;
  setUpdateData: (value: any) => void;
  openModal: boolean;
  setOpenModal: (value: any) => void;
  startUpdate: boolean;
  setStartUpdate: (value: any) => void;
}

const useStore = create<StoreState>((set) => ({
  updateData: {},
  setUpdateData: (data: any) => set({ updateData: data }),
  openModal: false,
  setOpenModal: (data: any) => set({ openModal: data }),
  startUpdate: false,
  setStartUpdate: (data: any) => set({ startUpdate: data }),
}));

export { useStore };

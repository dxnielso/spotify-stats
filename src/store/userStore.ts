import { create } from "zustand";
import { type SpotifyArtist } from "@/helpers/types";

type UserStore = {
  artists: SpotifyArtist[];
  setArtists: (newArtists: SpotifyArtist[]) => void;
  clearArtists: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  artists: [],
  setArtists: (newArtists) => set({ artists: newArtists }),
  clearArtists: () => set({ artists: [] }),
}));

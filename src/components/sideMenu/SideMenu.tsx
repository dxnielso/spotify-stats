"use client";

import SideMenuItem from "@/components/sideMenu/SideMenuItem";
import SpotifyIcon from "@/icons/SpotifyIcon";
import UserIcon from "@/icons/UserIcon";
import MicrophoneIcon from "@/icons/MicrophoneIcon";
import PlaylistIcon from "@/icons/PlaylistIcon";
// import Splitter from "@/components/sideMenu/ResizableAside";

// Hooks
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideMenu = () => {
  const pathname = usePathname();
  return (
    <aside
      id="aside-menu"
      className="z-50 w-full h-[74px] fixed bottom-0 right-0 left-0 bg-black flex items-center justify-start md:w-[100px] md:max-w-[300px] md:min-w-[100px] md:flex-col md:h-full"
    >
      <Link href="/">
        <figure className="hidden md:inline-flex m-6 mb-16 max-w-16">
          <SpotifyIcon />
        </figure>
      </Link>
      <nav className="w-full">
        <ul className="w-full flex items-center md:flex-col">
          <SideMenuItem href="/" texto="Perfil">
            <UserIcon
              className={`size-5 group-hover:fill-white duration-300 ${
                pathname == "/" ? "fill-white" : "fill-white/50"
              }`}
            />
          </SideMenuItem>
          <SideMenuItem href="/artists" texto="Top Artistas">
            <MicrophoneIcon
              className={`size-5 group-hover:fill-white duration-300 ${
                pathname == "/artists" ? "fill-white" : "fill-white/50"
              }`}
            />
          </SideMenuItem>
          <SideMenuItem href="/playlists" texto="Playlists">
            <PlaylistIcon
              className={`size-6 group-hover:fill-white duration-300 ${
                pathname == "/playlists" ? "fill-white" : "fill-white/50"
              }`}
            />
          </SideMenuItem>
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;

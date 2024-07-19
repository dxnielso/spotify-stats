import React, { useState, useEffect, useRef } from "react";

const ResizableAside = () => {
  const widthBarRef = useRef<HTMLDivElement>(null);
  const asideMenuRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [lastX, setLastX] = useState<number>(0);

  useEffect(() => {
    const widthBar = widthBarRef.current;
    const asideMenu = asideMenuRef.current;

    const handleMouseDown = (event: MouseEvent) => {
      if (widthBar) {
        widthBar.style.cursor = "grabbing";
      }
      setIsResizing(true);
      setLastX(event.clientX);

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isResizing && asideMenu) {
        const deltaX = event.clientX - lastX;
        const newWidth = asideMenu.offsetWidth + deltaX;

        asideMenu.style.width = newWidth + "px";
        setLastX(event.clientX);
      }
    };

    const handleMouseUp = () => {
      if (widthBar) {
        widthBar.style.cursor = "grab";
      }
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (widthBar) {
      widthBar.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (widthBar) {
        widthBar.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, lastX]);

  return (
    <div className="flex">
      <aside
        id="aside-menu"
        ref={asideMenuRef}
        className="bg-gray-800 text-white h-screen p-4"
        style={{ width: "300px" }}
      >
        {/* Contenido del aside */}
        <p>Menú lateral</p>
      </aside>
      <div
        id="width-bar"
        ref={widthBarRef}
        className="bg-white/5 hover:bg-white/40 bg-red-500 rounded-full w-[3px] h-full cursor-grab duration-100"
      />
    </div>
  );
};

export default ResizableAside;

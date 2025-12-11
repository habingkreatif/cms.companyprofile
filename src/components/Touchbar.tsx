"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Hammer, Phone, Menu } from "lucide-react";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={22} />, link: "#" },
    { icon: <Info size={22} />, link: "#tentangkami" },
    { icon: <Hammer size={22} />, link: "#layanan" },
    { icon: <Phone size={22} />, link: "#hubungikami" },
  ];

  return (
    <div className="fixed md:hidden bottom-5 right-5 z-[999] flex flex-col items-end space-y-3">
      {/* Menu Items */}
      <AnimatePresence>
        {open &&
          menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg
                         bg-[#B61F2B] text-white hover:bg-[#8E1A22] transition-all"
            >
              {item.icon}
            </motion.a>
          ))}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center rounded-full 
             bg-[#B61F2B] shadow-2xl text-white hover:bg-[#8E1A22] 
             transition-all hover:scale-105"
      >
        <Menu size={24} />
      </button>
    </div>
  );
}

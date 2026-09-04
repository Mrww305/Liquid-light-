import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioGatewayProps {
  isVisible: boolean;
  onEnter: (withSound: boolean) => void;
}

export const AudioGateway: React.FC<AudioGatewayProps> = ({ isVisible, onEnter }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="gateway"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#fcfbfa] z-50 p-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 }}
            className="max-w-[480px] flex flex-col items-center gap-7"
          >
            <motion.h2
              className="serif text-[#1a1917] font-normal italic leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}
            >
              Reshmatex
            </motion.h2>

            <motion.p
              className="text-[13px] tracking-[0.05em] leading-[1.7] text-[#1a1917]/70 max-w-[380px]"
            >
              A tactile, spatial experiment in high-end materials and creative web engineering. For the optimal multi-sensory experience, we recommend enabling ambient sound.
            </motion.p>

            <motion.div className="flex flex-col gap-3 w-full mt-2">
              <button
                id="enter-sound"
                onClick={() => onEnter(true)}
                className="btn btn-primary group relative overflow-hidden"
              >
                <Volume2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>Enter with Sound</span>
              </button>

              <button
                id="enter-muted"
                onClick={() => onEnter(false)}
                className="btn btn-secondary group"
              >
                <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                <span>Muted Experience</span>
              </button>
            </motion.div>

            <motion.p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.4)] mt-3">
              Liquid Light · 2026 Edition
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

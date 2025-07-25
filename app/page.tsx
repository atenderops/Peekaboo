/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import locationsDataRaw from './locations.json'; // adjust path as needed

// Pick one random image per location for a rotation
function pickRandomImages(locationsObj: Record<string, Array<{ src: string; subcaption?: string }>>) {
  const arr: Array<{ src: string; caption: string; subcaption?: string }> = [];
  for (const location in locationsObj) {
    const imagesArr = locationsObj[location];
    const randomIdx = Math.floor(Math.random() * imagesArr.length);
    const imgObj = imagesArr[randomIdx];
    arr.push({
      src: imgObj.src,
      caption: location,
      subcaption: imgObj.subcaption ?? '',
    });
  }
  return arr;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getImageSrc(img: { src: string; caption: string }, cacheBust: string) {
  if (
    img.src.includes('ctraficomovilidad.malaga.eu') ||
    img.src.includes('lh3.googleusercontent.com')
  ) {
    return img.src;
  }
  return `${img.src}${img.src.includes('?') ? '&' : '?'}${cacheBust}`;
}

export default function Home() {
  // Images for the current rotation
  const [rotationImages, setRotationImages] = useState<Array<{ src: string; caption: string; subcaption?: string }>>([]);
  // Shuffle order for the current rotation
  const [order, setOrder] = useState<number[]>([]);
  const [pointer, setPointer] = useState(0);
  const [fade, setFade] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [cacheBust, setCacheBust] = useState('');
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [infoBoxFade, setInfoBoxFade] = useState<'in' | 'out' | null>(null);
  const preloadImg = useRef<HTMLImageElement | null>(null);

  // Hydration flag and shuffle after hydration
  useEffect(() => {
    setHasHydrated(true);
    // Only pick random images and shuffle order after hydration (client-side)
    const imgs = pickRandomImages(locationsDataRaw);
    setRotationImages(imgs);
    setOrder(shuffleArray(imgs.map((_, i) => i)));
  }, []);

  // Enable arrow key navigation for debugging
  const debugArrowNavigation = true; // Set to true to enable arrow navigation

  // Arrow key navigation
  useEffect(() => {
    if (!debugArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setPointer((prev) => (prev + 1) % rotationImages.length);
      } else if (e.key === 'ArrowLeft') {
        setPointer((prev) => (prev - 1 + rotationImages.length) % rotationImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [debugArrowNavigation, rotationImages.length]);

  // Generate a new cache bust string for each image change
  useEffect(() => {
    if (hasHydrated) {
      setCacheBust(`cb=${Date.now()}`);
    }
  }, [pointer, hasHydrated]);

  // Preload the next image with the same cache bust string
  useEffect(() => {
    if (!hasHydrated) return;
    const nextPointer = (pointer + 1) % rotationImages.length;
    const nextIndex = order[nextPointer];
    const nextSrc = getImageSrc(rotationImages[nextIndex], `cb=${Date.now()}`);
    if (!preloadImg.current) {
      preloadImg.current = new window.Image();
    }
    preloadImg.current.src = nextSrc;
  }, [pointer, order, hasHydrated, rotationImages]);

  // Fade and image switch logic
  useEffect(() => {
    if (!hasHydrated) return;
    const fadeOutTimeout = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setPointer((prev) => {
          const next = prev + 1;
          if (next >= rotationImages.length) {
            // New rotation: pick new random images and shuffle order
            const imgs = pickRandomImages(locationsDataRaw);
            setRotationImages(imgs);
            setOrder(shuffleArray(imgs.map((_, i) => i)));
            return 0;
          }
          return next;
        });
        setFade(false);
      }, 800);
    }, 15000);

    return () => clearTimeout(fadeOutTimeout);
  }, [pointer, hasHydrated, order, rotationImages]);

  // Infobox random timing logic with fade
  useEffect(() => {
    if (!hasHydrated) return;
    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    let fadeOutTimeout: NodeJS.Timeout;

    function scheduleNext() {
      const delay =
        Math.floor(Math.random() * (8 - 3 + 1) * 60 * 1000) + 3 * 60 * 1000; // 3-8 min
      showTimeout = setTimeout(() => {
        setShowInfoBox(true);
        setInfoBoxFade('in');
        // Start fade out 1s before hiding (for 1s fade)
        fadeOutTimeout = setTimeout(() => {
          setInfoBoxFade('out');
        }, 29000); // 29s after showing
        hideTimeout = setTimeout(() => {
          setShowInfoBox(false);
          setInfoBoxFade(null);
          scheduleNext();
        }, 30000); // Show for 30s
      }, delay);
    }

    scheduleNext();
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(fadeOutTimeout);
    };
  }, [hasHydrated]);

  const currentIndex = order[pointer];

  // Move this guard clause ABOVE any usage of rotationImages[currentIndex]
  if (
    !hasHydrated ||
    rotationImages.length === 0 ||
    order.length === 0 ||
    currentIndex === undefined ||
    rotationImages[currentIndex] === undefined
  ) {
    return null; // or a loading spinner
  }

  const src = hasHydrated
    ? getImageSrc(rotationImages[currentIndex], cacheBust)
    : rotationImages[currentIndex].src;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#222] overflow-hidden relative">
      <img
        src={src}
        alt={rotationImages[currentIndex].caption}
        className={`w-screen h-screen object-contain bg-[#222] rounded-none shadow-none block transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
        style={{ transitionProperty: 'opacity' }}
      />
      <div className="absolute top-[150px] right-0 w-[30vw] text-white text-2xl text-center bg-black/40 py-4 m-0">
        {rotationImages[currentIndex].caption}
        {rotationImages[currentIndex].subcaption && (
          <div className="text-sm text-gray-200 mt-2">
            {rotationImages[currentIndex].subcaption}
          </div>
        )}
      </div>
      {/* Infobox + Logo container */}
      <div
        className="absolute bottom-[100px] left-0 flex flex-row items-center"
        style={{ minHeight: '120px', minWidth: '35vw' }}
      >
        {/* Logo: always visible, inside infobox boundaries */}
        <div className="flex-shrink-0 flex items-center justify-center h-full pl-4 pr-2">
          <img src="/atender_logo.png" alt="Atender Logo" className="w-24 mx-auto mb-0" />
        </div>
        {/* Infobox: fades in/out, takes remaining space */}
        <div
          className={`
              text-black text-lg text-center py-6 px-4 m-0 rounded shadow-lg transition-opacity duration-1000
              ${showInfoBox ? (infoBoxFade === 'in' ? 'opacity-100' : 'opacity-0') : 'opacity-0'}
              bg-[#f1e11e]
            `}
          style={{
            minWidth: '22vw',
            maxWidth: '30vw',
            backgroundColor: '#f1e11e',
            marginLeft: '0.5rem',
            display: showInfoBox ? 'block' : 'block', // always reserve space
          }}
        >
          Atender Peekaboo is a webcam carousel that showcases the hometown or area where each employee in the company comes from around the world. <br />
          If your area is missing, reach out to the Tech team.
        </div>
      </div>
    </div>
  );
}
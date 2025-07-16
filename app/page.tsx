/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: 'https://www.karlslundsmarina.nu/wp-content/uploads/kamera-syd.jpg',
    caption: 'Stockholm, Sweden',
  },
  {
    src: 'https://images-webcams.windy.com/67/1658397367/current/full/1658397367.jpg',
    caption: 'Malaga, Spain',
  },
  {
    src: 'https://images-webcams.windy.com/05/1306625605/current/full/1306625605.jpg',
    caption: 'Guanajuato, Mexico',
  },
  {
    src: 'https://images-webcams.windy.com/26/1306621426/current/full/1306621426.jpg',
    caption: 'Mexico City, Mexico',
  },
  {
    src: 'https://images-webcams.windy.com/05/1385823105/current/full/1385823105.jpg',
    caption: 'Calimanesti, Romania',
  },
  {
    src: 'https://kamera.atlas.vegvesen.no/api/images/3000896_1',
    caption: 'Festøya, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/83/1616032183/current/full/1616032183.jpg',
    caption: 'Glasgow, Scotland',
  },
  {
    src: 'https://images-webcams.windy.com/99/1585143899/current/full/1585143899.jpg',
    caption: 'Grimstad, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/67/1353056967/current/full/1353056967.jpg',
    caption: 'Larvik, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/60/1496484660/current/full/1496484660.jpg',
    caption: 'Belfast, Northern Ireland',
  },
  {
    src: 'https://images-webcams.windy.com/18/1559677318/current/full/1559677318.jpg',
    caption: 'Gothenburg, Sweden',
  },
  {
    src: 'https://images-webcams.windy.com/48/1459599148/current/full/1459599148.jpg',
    caption: 'Hamburg, Germany',
  },
  {
    src: 'https://images-webcams.windy.com/00/1482439900/current/full/1482439900.jpg',
    caption: 'Malmö, Sweden',
  },
  {
    src: 'https://images-webcams.windy.com/03/1180866703/current/full/1180866703.jpg',
    caption: 'Cancun, Mexico',
  },
  {
    src: 'https://images-webcams.windy.com/29/1309679629/current/full/1309679629.jpg',
    caption: 'Mariestad, Sweden',
  },
  {
    src: 'https://images-webcams.windy.com/85/1491224085/current/full/1491224085.jpg',
    caption: 'Wexford, Ireland',
  },
  {
    src: 'https://images-webcams.windy.com/20/1669881620/current/full/1669881620.jpg',
    caption: 'Stavanger, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/07/1665692307/current/full/1665692307.jpg',
    caption: 'Cali, Colombia',
  },
  {
    src: 'https://annaboda.s3.eu-north-1.amazonaws.com/last_image_3.jpg?1752573529559',
    caption: 'Karlskoga, Sweden',
  },
  {
    src: 'https://www.sportboothafen-nordenham.de/module/2004024/parts/webcam.php?type=2',
    caption: 'Bremerhaven, Germany',
  },
  {
    src: 'https://kamera.atlas.vegvesen.no/api/images/3001079_1',
    caption: 'Sotra, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/21/1523939321/current/full/1523939321.jpg',
    caption: 'Birkerød, Denmark',
  },
  {
    src: 'https://images-webcams.windy.com/93/1632848893/current/full/1632848893.jpg',
    caption: 'Frederikssund, Denmark',
  },
  {
    src: 'https://images-webcams.windy.com/07/1686051607/current/full/1686051607.jpg',
    caption: 'Herlev, Denmark',
  },
  {
    src: 'https://www.wdr.de/themen/global/webcams/domcam/domcam_960_live.jpg',
    caption: 'Köln, Germany',
  },
  {
    src: 'https://nettkamera.cid.no/hortenHavn/naa.jpg',
    caption: 'Åsgårdstrand, Norway',
  },
  {
    src: 'https://www.ursa.fi/yhd/tampereenursa/ys-images/north-snapshot.jpg',
    caption: 'Tampere, Finland',
  },
  {
    src: 'https://ie-cam.net/pic/heritage.jpg',
    caption: 'Tullamore, Ireland',
  },
  {
    src: 'https://images-webcams.windy.com/71/1460757071/current/full/1460757071.jpg',
    caption: 'Bergen, Norway',
  },
  {
    src: 'https://kamera.atlas.vegvesen.no/api/images/0429004_1',
    caption: 'Kongsvinger, Norway',
  },
  {
    src: 'https://www.lussevika.com/lussevikawebcam.jpg',
    caption: 'Mandal, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/16/1337867816/current/full/1337867816.jpg',
    caption: 'Oslo, Norway',
  },
  {
    src: 'https://enrk.net/webcam/southeast000M.jpg',
    caption: 'Mysen, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/39/1675205239/current/full/1675205239.jpg',
    caption: 'Hønefoss, Norway',
  },
  {
    src: 'https://images-webcams.windy.com/29/1657223329/current/full/1657223329.jpg',
    caption: 'Helsingborg, Sweden',
  },
];

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
  // Skip cache-busting for servers that don't support it
  if (
    img.src.includes('ctraficomovilidad.malaga.eu') ||
    img.src.includes('lh3.googleusercontent.com')
  ) {
    return img.src;
  }
  return `${img.src}${img.src.includes('?') ? '&' : '?'}${cacheBust}`;
}

export default function Home() {
  const [order, setOrder] = useState<number[]>(images.map((_, i) => i));
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
    setOrder(shuffleArray(images.map((_, i) => i))); // shuffle only on client
  }, []);

  // Generate a new cache bust string for each image change
  useEffect(() => {
    if (hasHydrated) {
      setCacheBust(`cb=${Date.now()}`);
    }
  }, [pointer, hasHydrated]);

  // Preload the next image with the same cache bust string
  useEffect(() => {
    if (!hasHydrated) return;
    const nextPointer = (pointer + 1) % images.length;
    const nextIndex = order[nextPointer];
    const nextSrc = getImageSrc(images[nextIndex], `cb=${Date.now()}`);
    if (!preloadImg.current) {
      preloadImg.current = new window.Image();
    }
    preloadImg.current.src = nextSrc;
  }, [pointer, order, hasHydrated]);

  // Fade and image switch logic
  useEffect(() => {
    if (!hasHydrated) return;
    const fadeOutTimeout = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setPointer((prev) => {
          const next = prev + 1;
          if (next >= images.length) {
            // Reshuffle for the next round
            setOrder(shuffleArray(images.map((_, i) => i)));
            return 0;
          }
          return next;
        });
        setFade(false);
      }, 800);
    }, 15000);

    return () => clearTimeout(fadeOutTimeout);
  }, [pointer, hasHydrated, order]);

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
  const src = hasHydrated
    ? getImageSrc(images[currentIndex], cacheBust)
    : images[currentIndex].src;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#222] overflow-hidden relative">
      <img
        src={src}
        alt={images[currentIndex].caption}
        className={`w-screen h-screen object-contain bg-[#222] rounded-none shadow-none block transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'
          }`}
        style={{ transitionProperty: 'opacity' }}
      />
      <div className="absolute top-[150px] right-0 w-[30vw] text-white text-2xl text-center bg-black/40 py-4 m-0">
        {images[currentIndex].caption}
      </div>
      {showInfoBox && (
        <div
          className={`absolute bottom-[100px] left-0 w-[35vw] text-black text-lg text-center py-6 px-4 m-0 rounded shadow-lg transition-opacity duration-1000
            ${infoBoxFade === 'in' ? 'opacity-100' : ''}
            ${infoBoxFade === 'out' ? 'opacity-0' : ''}
            ${!infoBoxFade ? 'opacity-0' : ''}`}
          style={{ backgroundColor: '#f1e11e' }}
        >
          This displays close to live views from where our colleagues are from. <br /> Is
          your home missing? Let the tech team know and we will add it.
        </div>
      )}
    </div>
  );
}

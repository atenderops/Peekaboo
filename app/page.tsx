/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: 'https://kamera.atlas.vegvesen.no/api/images/0429004_1',
    caption: 'Kongsvinger, Norway',
    subcaption: 'near Finnsrud, Skotterud & Vestmarka',
  },
  {
    src: 'https://www.karlslundsmarina.nu/wp-content/uploads/kamera-syd.jpg',
    caption: 'Stockholm, Sweden',
    subcaption: 'near Strängnäs',
  },
  {
    src: 'https://ctraficomovilidad.malaga.eu/recursos/movilidad/camaras_trafico/TV-07.jpg',
    caption: 'Malaga, Spain',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/49/1689408949/current/full/1689408949.jpg',
    caption: 'Malaga, Spain',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/05/1306625605/current/full/1306625605.jpg',
    caption: 'Guanajuato, Mexico',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/26/1306621426/current/full/1306621426.jpg',
    caption: 'Mexico City, Mexico',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/05/1385823105/current/full/1385823105.jpg',
    caption: 'Calimanesti, Romania',
    subcaption: 'near Valcea',
  },
  {
    src: 'https://kamera.atlas.vegvesen.no/api/images/3000896_1',
    caption: 'Festøya, Norway',
    subcaption: 'near Hundeidvik',
  },
  {
    src: 'https://images-webcams.windy.com/83/1616032183/current/full/1616032183.jpg',
    caption: 'Glasgow, Scotland',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/99/1585143899/current/full/1585143899.jpg',
    caption: 'Grimstad, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/67/1353056967/current/full/1353056967.jpg',
    caption: 'Larvik, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/60/1496484660/current/full/1496484660.jpg',
    caption: 'Belfast, Northern Ireland',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/18/1559677318/current/full/1559677318.jpg',
    caption: 'Gothenburg, Sweden',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/48/1459599148/current/full/1459599148.jpg',
    caption: 'Hamburg, Germany',
    subcaption: '',
  },
  {
    src: 'https://cams.oresundsbron.com/pylonwest',
    caption: 'Malmö, Sweden',
    subcaption: 'Oresund Bridge, near Hjärup',
  },
  {
    src: 'https://images-webcams.windy.com/03/1180866703/current/full/1180866703.jpg',
    caption: 'Cancun, Mexico',
    subcaption: 'near Merida',
  },
  {
    src: 'https://images-webcams.windy.com/29/1309679629/current/full/1309679629.jpg',
    caption: 'Mariestad, Sweden',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/85/1491224085/current/full/1491224085.jpg',
    caption: 'Wexford, Ireland',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/20/1669881620/current/full/1669881620.jpg',
    caption: 'Stavanger, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/07/1665692307/current/full/1665692307.jpg',
    caption: 'Cali, Colombia',
    subcaption: '',
  },
  {
    src: 'https://annaboda.s3.eu-north-1.amazonaws.com/last_image_3.jpg?1752573529559',
    caption: 'Karlskoga, Sweden',
    subcaption: '',
  },
  {
    src: 'https://www.sportboothafen-nordenham.de/module/2004024/parts/webcam.php?type=2',
    caption: 'Bremerhaven, Germany',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/90/1514893190/current/full/1514893190.jpg',
    caption: 'Sotra, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/21/1523939321/current/full/1523939321.jpg',
    caption: 'Birkerød, Denmark',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/93/1632848893/current/full/1632848893.jpg',
    caption: 'Frederikssund, Denmark',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/07/1686051607/current/full/1686051607.jpg',
    caption: 'Herlev, Denmark',
    subcaption: '',
  },
  {
    src: 'https://www.wdr.de/themen/global/webcams/domcam/domcam_960_live.jpg',
    caption: 'Köln, Germany',
    subcaption: '',
  },
  {
    src: 'https://nettkamera.cid.no/asgardHavnVest/max.jpg?0.33787127798949435',
    caption: 'Åsgårdstrand, Norway',
    subcaption: '',
  },
  {
    src: 'https://www.ursa.fi/yhd/tampereenursa/ys-images/north-snapshot.jpg',
    caption: 'Tampere, Finland',
    subcaption: '',
  },
  {
    src: 'https://ie-cam.net/pic/heritage.jpg',
    caption: 'Tullamore, Ireland',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/71/1460757071/current/full/1460757071.jpg',
    caption: 'Bergen, Norway',
    subcaption: '',
  },
  {
    src: 'https://www.lussevika.com/lussevikawebcam.jpg',
    caption: 'Mandal, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/16/1337867816/current/full/1337867816.jpg',
    caption: 'Oslo, Norway',
    subcaption: '',
  },
  {
    src: 'https://enrk.net/webcam/southeast000M.jpg',
    caption: 'Mysen, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/39/1675205239/current/full/1675205239.jpg',
    caption: 'Hønefoss, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/29/1657223329/current/full/1657223329.jpg',
    caption: 'Helsingborg, Sweden',
    subcaption: '',
  },
  {
    src: 'https://snapshot.hhcamping.no:5000/snap/0',
    caption: 'Haugesund, Norway',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/89/1720872089/current/full/1720872089.jpg',
    caption: 'Bangkok, Thailand',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/44/1632771444/current/full/1632771444.jpg',
    caption: 'Goiânia, Brazil',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/43/1593548443/current/full/1593548443.jpg',
    caption: 'Söderköping, Sweden',
    subcaption: '',
  },
  {
    src: 'https://images-webcams.windy.com/76/1351356776/current/full/1351356776.jpg',
    caption: 'Seville, Spain',
    subcaption: '',
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
        className={`w-screen h-screen object-contain bg-[#222] rounded-none shadow-none block transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
        style={{ transitionProperty: 'opacity' }}
      />
      <div className="absolute top-[150px] right-0 w-[30vw] text-white text-2xl text-center bg-black/40 py-4 m-0">
        {images[currentIndex].caption}
        {images[currentIndex].subcaption && (
          <div className="text-base text-gray-200 mt-2">
            {images[currentIndex].subcaption}
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
          Atender Peekaboo is a webcam carousel that showcases the hometown or area where each employee in the company comes from around the world. <br></br>
          If your area is missing, reach out to the Tech team.
        </div>
      </div>
    </div>
  );
}
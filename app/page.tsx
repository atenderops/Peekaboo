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
    caption: 'Larvik, Norway',
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

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [cacheBust, setCacheBust] = useState('');
  const preloadImg = useRef<HTMLImageElement | null>(null);

  // Hydration flag
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Generate a new cache bust string for each image change
  useEffect(() => {
    if (hasHydrated) {
      setCacheBust(`cb=${Date.now()}`);
    }
  }, [current, hasHydrated]);

  // Preload the next image with the same cache bust string
  useEffect(() => {
    if (!hasHydrated) return;
    const next = (current + 1) % images.length;
    const nextSrc = `${images[next].src}${images[next].src.includes('?') ? '&' : '?'}cb=${Date.now()}`;
    if (!preloadImg.current) {
      preloadImg.current = new window.Image();
    }
    preloadImg.current.src = nextSrc;
  }, [current, hasHydrated]);

  // Fade and image switch logic
  useEffect(() => {
    if (!hasHydrated) return;
    const fadeOutTimeout = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 800);
    }, 15000);

    return () => clearTimeout(fadeOutTimeout);
  }, [current, hasHydrated]);

  // Only add cache busting after hydration
  const src = hasHydrated
    ? `${images[current].src}${images[current].src.includes('?') ? '&' : '?'}${cacheBust}`
    : images[current].src;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#222] overflow-hidden relative">
      <img
        src={src}
        alt={images[current].caption}
        className={`w-screen h-screen object-contain bg-[#222] rounded-none shadow-none block transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
        style={{ transitionProperty: 'opacity' }}
      />
      <div className="absolute top-[150px] right-0 w-[30vw] text-white text-2xl text-center bg-black/40 py-4 m-0">
        {images[current].caption}
      </div>
    </div>
  );
}

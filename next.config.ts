import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.karlslundsmarina.nu" },
      { protocol: "https", hostname: "annaboda.s3.eu-north-1.amazonaws.com" },
      { protocol: "https", hostname: "www.sportboothafen-nordenham.de" },
      { protocol: "https", hostname: "kamera.atlas.vegvesen.no" },
      { protocol: "https", hostname: "images-webcams.windy.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "www.wdr.de" },
      { protocol: "https", hostname: "nettkamera.cid.no" },
      { protocol: "https", hostname: "www.ursa.fi" },
      { protocol: "https", hostname: "ie-cam.net" },
      { protocol: "https", hostname: "www.lussevika.com" },
      { protocol: "https", hostname: "enrk.net" },
      { protocol: "https", hostname: "ctraficomovilidad.malaga.eu" },
    ],
  },
};

export default nextConfig;

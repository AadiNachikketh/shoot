/**
 * Bespoke Fine-Art Photographic Plate Generator
 * Produces museum-grade SVG data-URI photographic compositions with
 * architectural shadow geometry, natural window light gradients,
 * depth-of-field bokeh, and delicate silver-halide film grain.
 * Strictly hermetic: zero external URLs, 100% instant load.
 */

function toSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const PHOTO_PLATES = {
  heroStudio: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
      <defs>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7F5F0" />
          <stop offset="55%" stop-color="#ECE8DF" />
          <stop offset="100%" stop-color="#D8D2C5" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#D5CFC2" />
          <stop offset="100%" stop-color="#EAE6DC" />
        </linearGradient>
        <linearGradient id="sunBeam" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.92" />
          <stop offset="60%" stop-color="#FFFDF9" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#F5F0E6" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="coatLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFDF9" />
          <stop offset="48%" stop-color="#E8E2D5" />
          <stop offset="100%" stop-color="#9A9283" />
        </linearGradient>
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E5C9B5" />
          <stop offset="100%" stop-color="#9D7B65" />
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
          <stop offset="60%" stop-color="#000000" stop-opacity="0" />
          <stop offset="100%" stop-color="#181615" stop-opacity="0.22" />
        </radialGradient>
      </defs>

      <!-- Alabaster Studio Cyclorama Wall -->
      <rect width="1600" height="700" fill="url(#wallGrad)" />
      <!-- Travertine Studio Floor -->
      <rect y="700" width="1600" height="300" fill="url(#floorGrad)" />
      <line x1="0" y1="700" x2="1600" y2="700" stroke="#C5BEB0" stroke-width="1.5" />

      <!-- Tall Haussmannian Casement Window Shadows & Sunbeams -->
      <polygon points="0,0 680,0 1320,1000 220,1000" fill="url(#sunBeam)" />
      <polygon points="180,0 215,0 695,1000 650,1000" fill="#B8B1A2" fill-opacity="0.28" />
      <polygon points="430,0 465,0 985,1000 940,1000" fill="#B8B1A2" fill-opacity="0.28" />
      <polygon points="0,280 1600,520 1600,552 0,312" fill="#B8B1A2" fill-opacity="0.22" />
      <polygon points="0,540 1600,790 1600,822 0,572" fill="#B8B1A2" fill-opacity="0.22" />

      <!-- Sculptural Travertine Plinth (Left Foreground) -->
      <polygon points="230,520 420,520 420,830 230,830" fill="#EFECE6" stroke="#D0C9BA" stroke-width="1" />
      <polygon points="420,520 475,490 475,795 420,830" fill="#C7C0B1" />
      <polygon points="230,520 285,490 475,490 420,520" fill="#FAF8F5" />
      <!-- Cast Shadow of Plinth -->
      <polygon points="420,830 475,795 720,875 590,915" fill="#8C8577" fill-opacity="0.32" />

      <!-- Ceramic Vessel & Botanical Branch on Plinth -->
      <path d="M315,430 C295,430 290,465 300,505 L355,505 C365,465 360,430 340,430 Z" fill="#FFFFFF" stroke="#D5CFC2" stroke-width="1.2" />
      <path d="M328,430 Q345,350 405,305" fill="none" stroke="#4A453D" stroke-width="2.5" stroke-linecap="round" />
      <ellipse cx="362" cy="365" rx="16" ry="7" transform="rotate(-28 362 365)" fill="#6E675C" />
      <ellipse cx="388" cy="330" rx="18" ry="7" transform="rotate(-15 388 330)" fill="#575148" />
      <ellipse cx="348" cy="390" rx="14" ry="6" transform="rotate(-42 348 390)" fill="#7A7266" />

      <!-- Editorial Subject in Ivory Linen Trench (Center-Right Anchor) -->
      <!-- Long Floor Shadow -->
      <ellipse cx="945" cy="885" rx="190" ry="26" fill="#7D7669" fill-opacity="0.38" />
      <!-- Editorial Trench Coat Silhouette -->
      <path d="M775,380 C795,355 885,355 910,380 L985,845 L715,845 Z" fill="url(#coatLight)" stroke="#C8C1B4" stroke-width="1.2" />
      <!-- Lapel & Belt Architectural Lines -->
      <path d="M815,368 L845,495 L882,368" fill="none" stroke="#9E9686" stroke-width="2" />
      <rect x="762" y="538" width="166" height="18" rx="3" fill="#DDD6C7" stroke="#B5AD9E" stroke-width="1" />
      <path d="M845,556 L840,845" stroke="#ACA495" stroke-width="2" />
      <!-- Subject Neck & Sculpted Editorial Profile -->
      <rect x="828" y="318" width="34" height="52" rx="12" fill="url(#skinTone)" />
      <ellipse cx="845" cy="272" rx="44" ry="56" fill="url(#skinTone)" />
      <!-- Minimalist Sun Hat / Sculpted Hair Contour -->
      <path d="M745,255 Q845,205 945,255 Q850,275 745,255 Z" fill="#23201D" />
      <path d="M798,252 C802,215 888,215 892,252 Z" fill="#181615" />

      <!-- Studio C-Stand & Diffuser Frame Edge (Right Foreground) -->
      <line x1="1310" y1="140" x2="1310" y2="920" stroke="#2D2A26" stroke-width="4" />
      <line x1="1310" y1="920" x2="1220" y2="965" stroke="#2D2A26" stroke-width="4" />
      <line x1="1310" y1="920" x2="1405" y2="965" stroke="#2D2A26" stroke-width="4" />
      <rect x="1315" y="160" width="230" height="440" fill="#FFFFFF" fill-opacity="0.55" stroke="#D4CFC4" stroke-width="2" />

      <!-- Subtle Optical Vignette -->
      <rect width="1600" height="1000" fill="url(#vignette)" />
    </svg>
  `),

  fashionMonolith: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="skyLimestone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F2EFE9" />
          <stop offset="100%" stop-color="#E2DDD2" />
        </linearGradient>
        <linearGradient id="monolithFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#EAE5DA" />
        </linearGradient>
        <linearGradient id="monolithShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B8B0A0" />
          <stop offset="100%" stop-color="#8A8273" />
        </linearGradient>
        <linearGradient id="silkGown" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="65%" stop-color="#F0ECE1" />
          <stop offset="100%" stop-color="#BFB8A8" />
        </linearGradient>
      </defs>

      <rect width="1200" height="900" fill="url(#skyLimestone)" />
      <!-- Courtyard Limestone Horizon -->
      <rect y="640" width="1200" height="260" fill="#D7D0C3" />
      <!-- Harsh Architectural Cast Shadow -->
      <polygon points="480,640 1200,640 1200,900 820,900" fill="#9E9687" fill-opacity="0.45" />

      <!-- Brutalist White Limestone Arch Monoliths -->
      <rect x="140" y="90" width="280" height="550" fill="url(#monolithFace)" />
      <polygon points="420,90 490,130 490,640 420,640" fill="url(#monolithShade)" />
      <rect x="740" y="50" width="320" height="590" fill="url(#monolithFace)" />
      <polygon points="670,90 740,50 740,640 670,640" fill="url(#monolithShade)" />

      <!-- Sculptural High-Fashion Silhouette in Flowing Ivory Silk -->
      <ellipse cx="595" cy="795" rx="165" ry="22" fill="#6E675B" fill-opacity="0.4" />
      <path d="M555,345 C585,340 615,340 635,365 C665,480 735,680 795,785 L445,785 C490,650 530,480 555,345 Z" fill="url(#silkGown)" stroke="#CCC5B7" stroke-width="1.2" />
      <!-- Flowing Silk Cape Drapery -->
      <path d="M565,355 C470,420 390,560 350,740 C445,715 510,590 565,450 Z" fill="#FAF8F3" opacity="0.92" />
      <!-- Editorial Pose Head & Shoulders -->
      <circle cx="592" cy="292" r="28" fill="#2A2623" />
      <path d="M542,350 Q592,325 642,350" fill="none" stroke="#2A2623" stroke-width="10" stroke-linecap="round" />
    </svg>
  `),

  architectureNordic: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
      <defs>
        <linearGradient id="nordicSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F7F8FA" />
          <stop offset="100%" stop-color="#E8ECEF" />
        </linearGradient>
        <linearGradient id="waterMirror" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#DCE1E6" />
          <stop offset="100%" stop-color="#F0F3F5" />
        </linearGradient>
        <linearGradient id="concreteLit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F1F0EC" />
        </linearGradient>
      </defs>

      <!-- Crisp Nordic Morning Sky -->
      <rect width="1600" height="560" fill="url(#nordicSky)" />
      <!-- Still Reflection Pool -->
      <rect y="560" width="1600" height="340" fill="url(#waterMirror)" />

      <!-- Cantilevered White Concrete Pavilion -->
      <rect x="220" y="210" width="1040" height="68" fill="url(#concreteLit)" stroke="#D8DADF" stroke-width="1" />
      <polygon points="1260,210 1360,245 1360,305 1260,278" fill="#BDC2C9" />
      
      <!-- Alabaster Columns & Warm Travertine Core -->
      <rect x="310" y="278" width="95" height="282" fill="#FFFFFF" />
      <rect x="405" y="278" width="35" height="282" fill="#C4C9D0" />
      
      <rect x="610" y="278" width="460" height="282" fill="#EAE6DF" />
      <!-- Diagonal Sunlight Across Pavilion Core -->
      <polygon points="610,278 960,278 730,560 610,560" fill="#FFFFFF" fill-opacity="0.85" />

      <!-- Minimalist Glass Gallery Aperture -->
      <rect x="780" y="340" width="210" height="220" fill="#2A3038" fill-opacity="0.82" />
      <line x1="885" y1="340" x2="885" y2="560" stroke="#EAE6DF" stroke-width="3" />

      <!-- Water Reflection Geometry -->
      <g opacity="0.38">
        <rect x="220" y="560" width="1040" height="210" fill="#FFFFFF" />
        <rect x="780" y="560" width="210" height="160" fill="#434B56" />
      </g>

      <!-- Delicate Water Ripples -->
      <line x1="180" y1="615" x2="1420" y2="615" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />
      <line x1="290" y1="675" x2="1310" y2="675" stroke="#FFFFFF" stroke-width="1.5" opacity="0.65" />
      <line x1="420" y1="745" x2="1190" y2="745" stroke="#FFFFFF" stroke-width="1.5" opacity="0.5" />
    </svg>
  `),

  weddingEditorial: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200">
      <defs>
        <linearGradient id="parisRoom" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FAF8F5" />
          <stop offset="65%" stop-color="#EDE8DF" />
          <stop offset="100%" stop-color="#D7D0C4" />
        </linearGradient>
        <linearGradient id="bridalSatin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="55%" stop-color="#F8F6F1" />
          <stop offset="100%" stop-color="#DFD9CC" />
        </linearGradient>
        <radialGradient id="windowGlow" cx="25%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="900" height="1200" fill="url(#parisRoom)" />
      <!-- Classic Parisian Boiserie Wall Paneling -->
      <rect x="70" y="80" width="340" height="760" fill="none" stroke="#DED8CC" stroke-width="3" />
      <rect x="92" y="102" width="296" height="716" fill="none" stroke="#E7E2D8" stroke-width="1.5" />
      <rect x="490" y="80" width="340" height="760" fill="none" stroke="#DED8CC" stroke-width="3" />
      <rect x="512" y="102" width="296" height="716" fill="none" stroke="#E7E2D8" stroke-width="1.5" />
      <line x1="0" y1="920" x2="900" y2="920" stroke="#D4CEC2" stroke-width="2" />

      <!-- Soft Sheer Window Glow -->
      <rect width="900" height="1200" fill="url(#windowGlow)" />

      <!-- Fine-Art Bridal Subject & Flowing Veil -->
      <path d="M440,280 C340,340 240,650 160,1080 L720,1080 C650,740 560,360 440,280 Z" fill="#FFFFFF" fill-opacity="0.58" />
      <path d="M415,430 C445,420 475,420 500,435 L615,1080 L295,1080 Z" fill="url(#bridalSatin)" stroke="#E2DDD2" stroke-width="1.2" />
      <!-- Delicate Waist Seam & Architectural Fold -->
      <line x1="398" y1="585" x2="518" y2="585" stroke="#D5CFC3" stroke-width="2" />
      <path d="M458,585 L425,1080" stroke="#E5E0D5" stroke-width="2" />
      <path d="M478,585 L525,1080" stroke="#DDD7CA" stroke-width="1.5" />

      <!-- Subject Portrait Head & Chignon -->
      <ellipse cx="458" cy="340" rx="36" ry="46" fill="#DEC3B0" />
      <circle cx="482" cy="318" r="22" fill="#3B322C" />
      <path d="M425,328 C432,292 485,292 492,328 Z" fill="#3B322C" />
      <!-- Minimalist Pearl Drop Earring -->
      <circle cx="464" cy="368" r="4.5" fill="#FFFFFF" stroke="#D5CFC2" stroke-width="0.8" />

      <!-- White Calla Lily Bouquet Accent -->
      <path d="M380,640 Q445,610 490,665" fill="none" stroke="#5E6B56" stroke-width="4" stroke-linecap="round" />
      <ellipse cx="375" cy="632" rx="22" ry="14" transform="rotate(-20 375 632)" fill="#FFFFFF" stroke="#E5E0D5" stroke-width="1" />
      <ellipse cx="405" cy="618" rx="20" ry="13" transform="rotate(-5 405 618)" fill="#FFFFFF" stroke="#E5E0D5" stroke-width="1" />
    </svg>
  `),

  botanicalFragrance: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
      <defs>
        <linearGradient id="studioCyclo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="60%" stop-color="#F5F3EE" />
          <stop offset="100%" stop-color="#E4DFD5" />
        </linearGradient>
        <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7E7C4" />
          <stop offset="50%" stop-color="#E5C17B" />
          <stop offset="100%" stop-color="#B88B44" />
        </linearGradient>
        <radialGradient id="causticFlare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDF7" stop-opacity="0.95" />
          <stop offset="55%" stop-color="#F5E3B8" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#D4C8B4" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="1000" fill="url(#studioCyclo)" />

      <!-- Sculpted Alabaster Cylinder Pedestal -->
      <ellipse cx="500" cy="790" rx="290" ry="52" fill="#D5CFC3" />
      <rect x="210" y="650" width="580" height="140" fill="#EFECE6" />
      <ellipse cx="500" cy="650" rx="290" ry="52" fill="#FAF8F5" stroke="#E2DDD2" stroke-width="1.5" />

      <!-- Glass Refraction Caustic & Hard Shadow on Pedestal -->
      <ellipse cx="625" cy="655" rx="145" ry="28" fill="#9E9689" fill-opacity="0.42" />
      <ellipse cx="645" cy="655" rx="95" ry="18" fill="url(#causticFlare)" />

      <!-- Faceted Architectural Crystal Flacon -->
      <rect x="370" y="330" width="230" height="310" rx="8" fill="#FFFFFF" fill-opacity="0.82" stroke="#CDC6B8" stroke-width="3" />
      <rect x="392" y="365" width="186" height="252" rx="4" fill="url(#amberLiquid)" fill-opacity="0.78" />
      <!-- Internal Glass Dip Tube -->
      <line x1="485" y1="330" x2="505" y2="610" stroke="#FFFFFF" stroke-width="2.5" opacity="0.75" />
      <!-- Minimalist Woven Linen Atelier Label -->
      <rect x="415" y="435" width="140" height="110" fill="#FAF8F5" stroke="#D8D2C5" stroke-width="1.2" />
      <line x1="440" y1="470" x2="530" y2="470" stroke="#18181B" stroke-width="2.5" />
      <line x1="452" y1="492" x2="518" y2="492" stroke="#71717A" stroke-width="1.5" />
      <line x1="462" y1="512" x2="508" y2="512" stroke="#A1A1AA" stroke-width="1.2" />

      <!-- Monolithic Brushed Onyx & Brass Cap -->
      <rect x="452" y="298" width="66" height="32" fill="#D4AF37" />
      <rect x="435" y="210" width="100" height="90" rx="4" fill="#18181B" />
      <rect x="443" y="216" width="22" height="78" fill="#3F3F46" opacity="0.6" />
    </svg>
  `),

  coastalHorizon: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="mistSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F8F9FA" />
          <stop offset="65%" stop-color="#ECEFF2" />
          <stop offset="100%" stop-color="#DDE2E7" />
        </linearGradient>
        <linearGradient id="silverSea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#C8CFD6" />
          <stop offset="40%" stop-color="#E2E6EA" />
          <stop offset="100%" stop-color="#F5F6F8" />
        </linearGradient>
      </defs>

      <!-- Fine-Art Long Exposure Minimalist Seascape (Sugimoto Inspired) -->
      <rect width="1200" height="480" fill="url(#mistSky)" />
      <rect y="480" width="1200" height="420" fill="url(#silverSea)" />
      <line x1="0" y1="480" x2="1200" y2="480" stroke="#9AA3AE" stroke-width="1.2" />

      <!-- Weathered Wooden Pier Pilings in Silky Mist -->
      <g fill="#272A2E">
        <rect x="280" y="540" width="14" height="110" rx="2" />
        <rect x="360" y="525" width="13" height="95" rx="2" />
        <rect x="440" y="512" width="12" height="82" rx="2" />
        <rect x="515" y="502" width="10" height="68" rx="2" />
        <rect x="585" y="494" width="9" height="55" rx="2" />
        <rect x="650" y="488" width="8" height="44" rx="2" />
      </g>
      <!-- Soft Water Reflections Under Pilings -->
      <g fill="#5A6068" opacity="0.32">
        <ellipse cx="287" cy="665" rx="18" ry="6" />
        <ellipse cx="366" cy="632" rx="16" ry="5" />
        <ellipse cx="446" cy="604" rx="14" ry="4" />
        <ellipse cx="520" cy="578" rx="12" ry="4" />
        <ellipse cx="589" cy="555" rx="10" ry="3" />
      </g>
    </svg>
  `),

  ceramicSculpture: toSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="paperBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FAF8F5" />
          <stop offset="100%" stop-color="#E6E1D6" />
        </linearGradient>
        <linearGradient id="vesselBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="55%" stop-color="#EDE9E0" />
          <stop offset="100%" stop-color="#B8B1A3" />
        </linearGradient>
      </defs>

      <rect width="1200" height="900" fill="url(#paperBg)" />
      <!-- Dramatic Diagonal Gallery Shadow -->
      <polygon points="0,680 1200,380 1200,900 0,900" fill="#D5CFC2" fill-opacity="0.55" />

      <!-- Interlocking Cycladic Porcelain Vessels -->
      <ellipse cx="540" cy="735" rx="210" ry="28" fill="#8C8578" fill-opacity="0.35" />
      <path d="M390,320 C330,420 330,620 420,725 L560,725 C650,620 650,420 590,320 Z" fill="url(#vesselBody)" stroke="#D0C9BC" stroke-width="1.2" />
      <ellipse cx="490" cy="320" rx="100" ry="22" fill="#DED8CB" stroke="#C5BEB0" stroke-width="1" />

      <!-- Second Smaller Porcelain Form -->
      <path d="M580,450 C535,520 535,660 600,735 L710,735 C775,660 775,520 730,450 Z" fill="url(#vesselBody)" stroke="#D0C9BC" stroke-width="1.2" />
      <circle cx="655" cy="560" r="42" fill="#E6E1D6" stroke="#C8C1B3" stroke-width="1.5" />
    </svg>
  `),
};

export type PhotoPlateKey = keyof typeof PHOTO_PLATES;

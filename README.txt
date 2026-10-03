NOMORA — open via a local server:  python3 -m http.server   then visit http://localhost:8000
(GSAP + fonts load from CDN/Google Fonts: needs internet the first time.)

HERO MONTAGE (index.html > .hero-montage, logic in js/main.js > initHero)
 Five stacked frames, one <video> each, in DOM order:
 cafe-barista > cafe-espresso > fitness > festival > cafe-detail > repeat
 Timing: HOLD / FADE constants in initHero (2200ms per shot, 800ms crossfade).
 Reorder shots by reordering the .hero-media divs. Crop per shot: data-pos (object-position).

VIDEO (assets/video/, each has .mp4 + .webm; posters in assets/posters/)
 cafe-barista / cafe-espresso / cafe-detail -> Slow Pour (+ hero)
 fitness  -> Reps (+ hero)      festival -> Open Air (+ hero)
ACCENT   css/style.css -> --accent        COPY  js/main.js -> PROJECTS
TODO     email + social links in index.html footer

/* ==========================================================================
   23:10 — OUR STORY
   JavaScript Logic & Interactive Effects
   Clean, Beginner-Friendly Code with Comments for Easy Customization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // ⚙️ CONFIGURATION & DATES (CUSTOMIZE DATES HERE IF NEEDED)
  // ========================================================================
  const PROPOSAL_DATE = new Date('2023-10-23T00:00:00'); // When Dinesh proposed
  const ANNIVERSARY_DATE = new Date('2026-10-23T00:00:00'); // 3rd Love Anniversary


  // ========================================================================
  // 1. OPENING SCREEN / GATE ("YES, I REMEMBER ❤️")
  // ========================================================================
  const introScreen = document.getElementById('intro-screen');
  const enterBtn = document.getElementById('enter-btn');
  const mainContent = document.getElementById('main-content');

  enterBtn.addEventListener('click', () => {
    // Play subtle romantic entry chime
    playRomanticChime();

    // Trigger heart burst particles from the button
    createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);

    // Fade out intro screen with cinematic transition
    introScreen.classList.add('fade-out');

    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.classList.remove('is-locked');

      // Smoothly scroll down slightly to immerse into the hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  });


  // ========================================================================
  // 2. BACKGROUND MUSIC PLAYER (NO AUTOPLAY, CLEARLY LABELED TOGGLE)
  // ========================================================================
  const bgAudio = document.getElementById('bg-audio');
  const audioBtn = document.getElementById('audio-btn');
  const audioWidget = document.getElementById('audio-widget');
  const audioStatusText = document.getElementById('audio-status-text');
  let isPlaying = false;

  // Web Audio Synth Fallback (Ensures music plays even if local file is delayed)
  let synthInterval = null;
  let audioCtx = null;

  audioBtn.addEventListener('click', () => {
    toggleMusic();
  });

  function toggleMusic() {
    if (!isPlaying) {
      // Try playing the audio element
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setMusicPlayingState(true);
          })
          .catch((err) => {
            console.log('Using Web Audio synth fallback for ambient melody:', err);
            startSynthMelody();
            setMusicPlayingState(true);
          });
      }
    } else {
      bgAudio.pause();
      stopSynthMelody();
      setMusicPlayingState(false);
    }
  }

  function setMusicPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      audioWidget.classList.add('audio-playing');
      audioStatusText.textContent = 'Playing Music';
    } else {
      audioWidget.classList.remove('audio-playing');
      audioStatusText.textContent = 'Play Our Song';
    }
  }

  // Gentle dreamy synth melody fallback
  function startSynthMelody() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Romantic notes: C4, E4, G4, B4, D5, E5, G5
      const notes = [261.63, 329.63, 392.00, 493.88, 587.33, 659.25, 783.99];
      let step = 0;

      synthInterval = setInterval(() => {
        if (!isPlaying) return;
        const freq = notes[step % notes.length];
        step = (step + Math.floor(Math.random() * 3) + 1) % notes.length;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 2.6);
      }, 700);
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function playRomanticChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.5);
      });
    } catch (e) {
      // AudioContext not supported or blocked
    }
  }


  // ========================================================================
  // 3. CSS FLOATING HEARTS ANIMATION (matches heart-paper background)
  // ========================================================================
  const heartsOverlay = document.getElementById('floating-hearts-overlay');
  const HEART_CHAR = '♥';   // solid heart matches the painted hearts in the bg

  // Spawn hearts at staggered intervals so it looks organic from the start
  function spawnFloatingHeart() {
    if (!heartsOverlay) return;

    const heart = document.createElement('span');
    heart.className = 'fh-heart';
    heart.textContent = HEART_CHAR;

    // Random horizontal position
    heart.style.left = `${Math.random() * 100}%`;

    // Random size (small-medium to match bg hearts)
    const size = (Math.random() * 1.1 + 0.55).toFixed(2);
    heart.style.fontSize = `${size}rem`;

    // Random duration: 10s – 22s
    const dur = (Math.random() * 12 + 10).toFixed(1);
    heart.style.animationDuration = `${dur}s`;

    // Random delay so they're spread out over time
    heart.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;

    // Slight random opacity variation
    heart.style.setProperty('--max-opacity', (Math.random() * 0.3 + 0.25).toFixed(2));

    heartsOverlay.appendChild(heart);

    // Clean up after animation ends to avoid DOM bloat
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }

  // Kick off an initial burst so hearts appear immediately on load
  for (let i = 0; i < 18; i++) {
    setTimeout(spawnFloatingHeart, i * 350);
  }
  // Then keep spawning steadily
  setInterval(spawnFloatingHeart, 900);


  // Particle burst on special interactions (maroon hearts for new theme)
  function createParticleBurst(x, y) {
    for (let i = 0; i < 18; i++) {
      const burst = document.createElement('span');
      burst.textContent = '♥';
      burst.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${(Math.random() * 1.2 + 0.5).toFixed(1)}rem;
        color: #ff4d6d;
        text-shadow: 0 0 10px rgba(255, 77, 109, 0.8);
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transition: transform ${(Math.random() * 0.8 + 0.5).toFixed(2)}s ease-out,
                    opacity   ${(Math.random() * 0.6 + 0.5).toFixed(2)}s ease-out;
        transform: translate(0, 0) rotate(0deg);
      `;
      document.body.appendChild(burst);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 100 + 50;
      requestAnimationFrame(() => {
        burst.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg)`;
        burst.style.opacity = '0';
      });
      setTimeout(() => burst.remove(), 1200);
    }
  }




  // ========================================================================
  // 4. MEMORIES TAB SWITCHER (TIMELINE VS FILM STRIP VS HEART COLLAGE)
  // ========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });


  // ========================================================================
  // 4B. VINTAGE 35MM FILM STRIP & SCRAPBOOK PHOTO BOOTH
  // ========================================================================
  const filmFileInput = document.getElementById('filmstrip-file-input');
  const scrapFileInput = document.getElementById('scrapbook-file-input');
  const filmFrameUnits = document.querySelectorAll('.film-frame-unit');
  const polaroidCards = document.querySelectorAll('.polaroid-card[data-scrap-slot]');
  const filmDownloadBtn = document.getElementById('film-download-btn');
  const filmResetBtn = document.getElementById('film-reset-btn');

  let activeFilmSlot = null;
  let activeScrapSlot = null;

  // ── Helper: Smart image compressor for localStorage safe storage ───────
  function compressImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth || h > maxWidth) {
          if (w > h) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxWidth) / h);
            h = maxWidth;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          callback(dataUrl);
        } catch (err) {
          console.warn('Compression failed, using raw data', err);
          callback(e.target.result);
        }
      };
      img.onerror = () => callback(e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ── Helper: Floating Romantic Toast ─────────────────────────────────────
  function showFilmToast(message) {
    let toast = document.getElementById('film-toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'film-toast-msg';
      toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(24, 12, 18, 0.94);
        border: 1px solid rgba(247, 178, 103, 0.5);
        color: #fbe3b5;
        padding: 12px 24px;
        border-radius: 30px;
        font-family: var(--font-sans);
        font-size: 0.92rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(247, 178, 103, 0.25);
        z-index: 99999;
        pointer-events: none;
        opacity: 0;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
        max-width: 90vw;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3200);
  }

  // ── Set photo inside a 35mm film frame ──────────────────────────────────
  function setFilmFramePhoto(unit, dataUrl) {
    unit.classList.add('has-photo');
    const container = unit.querySelector('.film-image-container');
    if (!container) return;
    container.innerHTML = '';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = '35mm Film Memory';
    container.appendChild(img);
  }

  // ── Clear photo from 35mm film frame ────────────────────────────────────
  function clearFilmFramePhoto(unit) {
    unit.classList.remove('has-photo');
    const container = unit.querySelector('.film-image-container');
    if (container) container.innerHTML = '';
  }

  // ── Restore 35mm Film Frames & Captions from localStorage ───────────────
  filmFrameUnits.forEach(unit => {
    const idx = unit.getAttribute('data-film-index');
    const savedImg = localStorage.getItem(`filmstrip-frame-${idx}`);
    if (savedImg) {
      setFilmFramePhoto(unit, savedImg);
    }
    const captionEl = unit.querySelector('.film-caption-input');
    const savedCaption = localStorage.getItem(`filmstrip-caption-${idx}`);
    if (captionEl && savedCaption) {
      captionEl.textContent = savedCaption;
    }

    if (captionEl) {
      captionEl.addEventListener('input', () => {
        localStorage.setItem(`filmstrip-caption-${idx}`, captionEl.textContent.trim());
      });
    }

    // Window click & controls
    const windowEl = unit.querySelector('.film-window');
    const btnView = unit.querySelector('.btn-view');
    const btnChange = unit.querySelector('.btn-change');
    const btnRemove = unit.querySelector('.btn-remove');

    if (windowEl) {
      windowEl.addEventListener('click', (e) => {
        if (e.target.closest('.frame-ctrl-btn')) return; // handled by buttons
        const imgData = localStorage.getItem(`filmstrip-frame-${idx}`);
        if (unit.classList.contains('has-photo') && imgData) {
          const cap = captionEl ? captionEl.textContent : '35mm Memory';
          openHeartLightbox(imgData, cap);
        } else {
          activeFilmSlot = idx;
          if (filmFileInput) {
            filmFileInput.value = '';
            filmFileInput.click();
          }
        }
      });

      // Drag and drop support
      windowEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        windowEl.style.borderColor = '#f59e0b';
        windowEl.style.transform = 'scale(1.02)';
      });
      windowEl.addEventListener('dragleave', () => {
        windowEl.style.borderColor = '';
        windowEl.style.transform = '';
      });
      windowEl.addEventListener('drop', (e) => {
        e.preventDefault();
        windowEl.style.borderColor = '';
        windowEl.style.transform = '';
        const files = e.dataTransfer.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
          compressImage(files[0], 900, 0.85, (dataUrl) => {
            setFilmFramePhoto(unit, dataUrl);
            localStorage.setItem(`filmstrip-frame-${idx}`, dataUrl);
            showFilmToast(`✨ Frame 0${idx} photo added! ❤️`);
          });
        }
      });
    }

    if (btnView) {
      btnView.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgData = localStorage.getItem(`filmstrip-frame-${idx}`);
        if (imgData) {
          const cap = captionEl ? captionEl.textContent : '35mm Memory';
          openHeartLightbox(imgData, cap);
        }
      });
    }

    if (btnChange) {
      btnChange.addEventListener('click', (e) => {
        e.stopPropagation();
        activeFilmSlot = idx;
        if (filmFileInput) {
          filmFileInput.value = '';
          filmFileInput.click();
        }
      });
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        clearFilmFramePhoto(unit);
        localStorage.removeItem(`filmstrip-frame-${idx}`);
        showFilmToast(`🗑️ Frame 0${idx} cleared`);
      });
    }
  });

  // ── Film File Input change handler ──────────────────────────────────────
  if (filmFileInput) {
    filmFileInput.addEventListener('change', () => {
      const file = filmFileInput.files[0];
      if (!file || activeFilmSlot === null) return;
      compressImage(file, 900, 0.85, (dataUrl) => {
        const unit = document.querySelector(`.film-frame-unit[data-film-index="${activeFilmSlot}"]`);
        if (unit) {
          setFilmFramePhoto(unit, dataUrl);
          localStorage.setItem(`filmstrip-frame-${activeFilmSlot}`, dataUrl);
          showFilmToast(`✨ Frame 0${activeFilmSlot} photo added! ❤️`);
        }
        activeFilmSlot = null;
      });
    });
  }

  // ── Scrapbook Polaroid Cards Upload ─────────────────────────────────────
  polaroidCards.forEach(card => {
    const slot = card.getAttribute('data-scrap-slot');
    const slotEl = card.querySelector('.scrapbook-photo-slot');
    const saved = localStorage.getItem(`scrapbook-slot-${slot}`);

    if (saved && slotEl) {
      setScrapPhoto(slotEl, saved);
      card.classList.add('has-photo');
    }

    if (slotEl) {
      slotEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentSaved = localStorage.getItem(`scrapbook-slot-${slot}`);
        if (card.classList.contains('has-photo') && currentSaved) {
          const cap = card.querySelector('.scrapbook-caption')?.textContent || 'Scrapbook Memory ❤️';
          openHeartLightbox(currentSaved, cap);
        } else {
          activeScrapSlot = slot;
          if (scrapFileInput) {
            scrapFileInput.value = '';
            scrapFileInput.click();
          }
        }
      });
    }
  });

  function setScrapPhoto(slotEl, dataUrl) {
    slotEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Scrapbook Memory';
    slotEl.appendChild(img);
  }

  if (scrapFileInput) {
    scrapFileInput.addEventListener('change', () => {
      const file = scrapFileInput.files[0];
      if (!file || !activeScrapSlot) return;
      compressImage(file, 900, 0.85, (dataUrl) => {
        const card = document.querySelector(`.polaroid-card[data-scrap-slot="${activeScrapSlot}"]`);
        if (card) {
          const slotEl = card.querySelector('.scrapbook-photo-slot');
          if (slotEl) {
            setScrapPhoto(slotEl, dataUrl);
            card.classList.add('has-photo');
            localStorage.setItem(`scrapbook-slot-${activeScrapSlot}`, dataUrl);
            showFilmToast('✨ Scrapbook memory added! ❤️');
          }
        }
        activeScrapSlot = null;
      });
    });
  }

  // ── Clear All Film Frames ───────────────────────────────────────────────
  if (filmResetBtn) {
    filmResetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all 4 film strip frames?')) {
        filmFrameUnits.forEach(unit => {
          const idx = unit.getAttribute('data-film-index');
          clearFilmFramePhoto(unit);
          localStorage.removeItem(`filmstrip-frame-${idx}`);
        });
        showFilmToast('🔄 Film strip reset to blank frames');
      }
    });
  }

  // ── Download 35mm Film Strip as Image (Canvas composite) ────────────────
  if (filmDownloadBtn) {
    filmDownloadBtn.addEventListener('click', () => {
      showFilmToast('⏳ Generating your 35mm film strip...');
      const canvas = document.createElement('canvas');
      const w = 640;
      const h = 1680;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      // 1. Film background
      ctx.fillStyle = '#121215';
      ctx.fillRect(0, 0, w, h);

      // 2. Film Header
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, w, 55);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('▶ 23:10 FILM', 48, 34);
      ctx.textAlign = 'center';
      ctx.fillText('• ISO 400 •', w / 2, 34);
      ctx.textAlign = 'right';
      ctx.fillText('KODAK ULTRAMAX', w - 48, 34);

      // 3. Film Footer
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, h - 55, w, 55);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('● SAFETY FILM', 48, h - 22);
      ctx.textAlign = 'center';
      ctx.fillText('23.10.2026', w / 2, h - 22);
      ctx.textAlign = 'right';
      ctx.fillText('DHANUSHREE & DINESH ♾️', w - 48, h - 22);

      // 4. Draw Sprocket Holes on Left and Right
      const sprocketW = 16;
      const sprocketH = 22;
      const sprocketRadius = 4;
      const sprocketYStep = 34;

      function drawRoundRect(x, y, rw, rh, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + rw - r, y);
        ctx.quadraticCurveTo(x + rw, y, x + rw, y + r);
        ctx.lineTo(x + rw, y + rh - r);
        ctx.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
        ctx.lineTo(x + r, y + rh);
        ctx.quadraticCurveTo(x, y + rh, x, y + rh - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }

      ctx.fillStyle = '#050306';
      ctx.strokeStyle = '#2d2d32';
      ctx.lineWidth = 1.5;

      for (let y = 65; y < h - 70; y += sprocketYStep) {
        // Left sprocket
        drawRoundRect(14, y, sprocketW, sprocketH, sprocketRadius);
        ctx.fill();
        ctx.stroke();

        // Right sprocket
        drawRoundRect(w - 14 - sprocketW, y, sprocketW, sprocketH, sprocketRadius);
        ctx.fill();
        ctx.stroke();
      }

      // 5. Draw 4 Frames
      const frameX = 48;
      const frameW = w - 96;
      const frameH = 340;
      const startY = 75;
      const frameGap = 58;

      const frameLabels = ['2A ▶', '3 ▶', '3A ▶', '4 ▶'];
      const defaultCaptions = [
        '1st Year Xerox Shop 📄',
        'October 23 Proposal 💍',
        'Train Rides & Temple Dates 🚆',
        'Happy 3rd Anniversary Dinesh ❤️'
      ];

      // Async loader for all images
      const promises = [1, 2, 3, 4].map(idx => {
        return new Promise((resolve) => {
          const savedData = localStorage.getItem(`filmstrip-frame-${idx}`);
          if (!savedData) return resolve(null);
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = savedData;
        });
      });

      Promise.all(promises).then(images => {
        images.forEach((imgObj, i) => {
          const y = startY + i * (frameH + frameGap);

          // Frame Marker
          ctx.fillStyle = '#ea580c';
          ctx.font = 'bold 14px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(frameLabels[i], frameX, y - 8);

          // Frame Window Box
          ctx.fillStyle = '#18181b';
          ctx.strokeStyle = '#38383f';
          ctx.lineWidth = 3;
          drawRoundRect(frameX, y, frameW, frameH, 6);
          ctx.fill();
          ctx.stroke();

          if (imgObj) {
            // Draw image with aspect cover crop
            ctx.save();
            drawRoundRect(frameX, y, frameW, frameH, 6);
            ctx.clip();

            const imgRatio = imgObj.width / imgObj.height;
            const targetRatio = frameW / frameH;
            let sx, sy, sWidth, sHeight;

            if (imgRatio > targetRatio) {
              sHeight = imgObj.height;
              sWidth = imgObj.height * targetRatio;
              sx = (imgObj.width - sWidth) / 2;
              sy = 0;
            } else {
              sWidth = imgObj.width;
              sHeight = imgObj.width / targetRatio;
              sx = 0;
              sy = (imgObj.height - sHeight) / 2;
            }

            ctx.drawImage(imgObj, sx, sy, sWidth, sHeight, frameX, y, frameW, frameH);
            ctx.restore();
          } else {
            // Empty placeholder styling
            ctx.save();
            drawRoundRect(frameX, y, frameW, frameH, 6);
            ctx.clip();
            ctx.fillStyle = '#ede5d8';
            ctx.fillRect(frameX, y, frameW, frameH);

            ctx.fillStyle = '#78350f';
            ctx.font = '36px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('📷', frameX + frameW / 2, y + frameH / 2 - 10);

            ctx.fillStyle = '#451a03';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText(`Frame 0${i + 1}`, frameX + frameW / 2, y + frameH / 2 + 25);
            ctx.restore();
          }

          // Caption below frame
          const captionText = localStorage.getItem(`filmstrip-caption-${i + 1}`) || defaultCaptions[i];
          ctx.fillStyle = '#fbe3b5';
          ctx.font = 'italic bold 20px Caveat, Georgia, serif';
          ctx.textAlign = 'center';
          ctx.fillText(captionText, frameX + frameW / 2, y + frameH + 32);
        });

        // Trigger Download
        const link = document.createElement('a');
        link.download = 'Dinesh_Dhanushree_FilmStrip_23_10.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
        showFilmToast('🎉 Film strip successfully downloaded! ❤️');
      });
    });
  }


  // ========================================================================
  // 5. HEART-SHAPED PHOTO COLLAGE — Upload & Lightbox
  // ========================================================================
  const heartTiles = document.querySelectorAll('.heart-tile');
  const heartFileInput = document.getElementById('heart-photo-input');
  const heartFilledEl = document.getElementById('heart-filled-count');
  const heartLightbox = document.getElementById('heart-lightbox');
  const heartLbImg = document.getElementById('heart-lb-img');
  const heartLbClose = document.getElementById('heart-lb-close');

  let activeTileSlot = null;   // which slot is waiting for a file
  let filledCount = 0;

  // ── Restore persisted photos from localStorage ─────────────────────────
  heartTiles.forEach(tile => {
    const slot = tile.getAttribute('data-slot');
    const savedSrc = localStorage.getItem(`heart-tile-${slot}`);
    if (savedSrc) {
      setTilePhoto(tile, savedSrc);
    }
  });
  updateFilledCount();

  // ── Click on any tile ──────────────────────────────────────────────────
  heartTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const slot = tile.getAttribute('data-slot');
      const savedSrc = localStorage.getItem(`heart-tile-${slot}`);

      if (tile.classList.contains('has-photo') && savedSrc) {
        // Already has photo → open lightbox
        openHeartLightbox(savedSrc);
      } else {
        // Empty → open file picker
        activeTileSlot = slot;
        heartFileInput.value = '';   // allow re-selecting same file
        heartFileInput.click();
      }
    });
  });

  // ── File picked → set photo ────────────────────────────────────────────
  heartFileInput.addEventListener('change', () => {
    const file = heartFileInput.files[0];
    if (!file || activeTileSlot === null) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      const tile = document.querySelector(`.heart-tile[data-slot="${activeTileSlot}"]`);
      if (tile) {
        const wasEmpty = !tile.classList.contains('has-photo');
        setTilePhoto(tile, dataURL);
        localStorage.setItem(`heart-tile-${activeTileSlot}`, dataURL);
        if (wasEmpty) {
          filledCount++;
          updateFilledCount();
          // tiny heart burst celebration
          tile.classList.add('just-uploaded');
          setTimeout(() => tile.classList.remove('just-uploaded'), 700);
        }
      }
      activeTileSlot = null;
    };
    reader.readAsDataURL(file);
  });

  // ── Helper: apply photo to tile ────────────────────────────────────────
  function setTilePhoto(tile, src) {
    tile.classList.add('has-photo');
    // Remove old img if any
    const existing = tile.querySelector('img');
    if (existing) existing.remove();
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Our Memory';
    tile.appendChild(img);
  }

  // ── Helper: recount & update display ───────────────────────────────────
  function updateFilledCount() {
    filledCount = document.querySelectorAll('.heart-tile.has-photo').length;
    if (heartFilledEl) heartFilledEl.textContent = filledCount;
  }

  // ── Heart lightbox open/close ──────────────────────────────────────────
  function openHeartLightbox(src, caption) {
    heartLbImg.src = src;
    const capEl = heartLightbox.querySelector('.heart-lb-caption');
    if (capEl) {
      capEl.textContent = caption || 'Our Special Memory ❤️';
    }
    heartLightbox.classList.add('active');
  }

  heartLbClose.addEventListener('click', () => {
    heartLightbox.classList.remove('active');
  });

  heartLightbox.addEventListener('click', (e) => {
    if (e.target === heartLightbox) heartLightbox.classList.remove('active');
  });




  // ========================================================================
  // 6. ANIMATED 3D LOVE LETTER (ENVELOPE & LINE-BY-LINE REVEAL)
  // ========================================================================
  const envelopeBox = document.getElementById('envelope-box');
  const waxSeal = document.getElementById('wax-seal');
  const envelopeWrapper = document.querySelector('.envelope-wrapper');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  function openEnvelope() {
    if (!envelopeWrapper.classList.contains('open')) {
      playRomanticChime();
      createParticleBurst(envelopeBox.getBoundingClientRect().left + 150, envelopeBox.getBoundingClientRect().top + 100);
      envelopeWrapper.classList.add('open');

      // Scroll smoothly to make letter fully comfortable to read
      setTimeout(() => {
        document.getElementById('love-letter').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }

  function closeEnvelope() {
    envelopeWrapper.classList.remove('open');
  }

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  envelopeBox.addEventListener('click', () => {
    openEnvelope();
  });

  closeLetterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeEnvelope();
  });


  // ========================================================================
  // 7. REAL-TIME COUNTDOWN TO OCTOBER 23, 2026 & DAYS TOGETHER
  // ========================================================================
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  const elDays = document.getElementById('el-days');
  const elHours = document.getElementById('el-hours');
  const elMinutes = document.getElementById('el-minutes');
  const elSeconds = document.getElementById('el-seconds');

  const heroDaysCount = document.getElementById('days-count');

  function updateTimers() {
    const now = new Date();

    // 1. Countdown to October 23, 2026
    const timeUntilAnniversary = ANNIVERSARY_DATE - now;

    if (timeUntilAnniversary > 0) {
      const days = Math.floor(timeUntilAnniversary / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeUntilAnniversary % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeUntilAnniversary % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeUntilAnniversary % (1000 * 60)) / 1000);

      cdDays.textContent = String(days).padStart(2, '0');
      cdHours.textContent = String(hours).padStart(2, '0');
      cdMinutes.textContent = String(minutes).padStart(2, '0');
      cdSeconds.textContent = String(seconds).padStart(2, '0');
    } else {
      // If date has arrived!
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
    }

    // 2. Days Elapsed since Proposal (October 23, 2023)
    const timeSinceProposal = now - PROPOSAL_DATE;
    if (timeSinceProposal > 0) {
      const eDays = Math.floor(timeSinceProposal / (1000 * 60 * 60 * 24));
      const eHours = Math.floor((timeSinceProposal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const eMinutes = Math.floor((timeSinceProposal % (1000 * 60 * 60)) / (1000 * 60));
      const eSeconds = Math.floor((timeSinceProposal % (1000 * 60)) / 1000);

      elDays.textContent = String(eDays).padStart(3, '0');
      elHours.textContent = String(eHours).padStart(2, '0');
      elMinutes.textContent = String(eMinutes).padStart(2, '0');
      elSeconds.textContent = String(eSeconds).padStart(2, '0');

      if (heroDaysCount) {
        heroDaysCount.textContent = `${eDays}+`;
      }
    }
  }

  setInterval(updateTimers, 1000);
  updateTimers();


  // ========================================================================
  // 8. FINAL SURPRISE CELEBRATION (FIREWORKS, LANTERNS, VOW MODAL)
  // ========================================================================
  const surpriseTriggerBtn = document.getElementById('surprise-trigger-btn');
  const surpriseModal = document.getElementById('surprise-modal');
  const surpriseClose = document.getElementById('surprise-close');
  const surpriseDoneBtn = document.getElementById('surprise-done-btn');

  surpriseTriggerBtn.addEventListener('click', () => {
    // 1. Play musical chime
    playRomanticChime();

    // 2. Launch high-energy heart fireworks
    launchCelebrationFireworks();

    // 3. Reveal the surprise vow modal
    setTimeout(() => {
      surpriseModal.classList.add('active');
    }, 600);
  });

  surpriseClose.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
  });

  surpriseDoneBtn.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
    createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);
  });

  surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
      surpriseModal.classList.remove('active');
    }
  });

  // Launch celebration confetti fireworks
  function launchCelebrationFireworks() {
    for (let burst = 0; burst < 6; burst++) {
      setTimeout(() => {
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) + 100;
        createParticleBurst(x, y);
      }, burst * 250);
    }
  }


  // ========================================================================
  // 10. THE SOULMATE QUIZ (Option 2)
  // ========================================================================
  const quizData = [
    {
      icon: '🐘',
      question: 'Where is our first meet?',
      options: [
        'xerox shop',
        'Clg bus ',
        'Libary'
      ],
      correct: 0,
      story: '“Ennaku adha note variya?” — You gave me that elephant notebook, and that is where our whole D2 story began! 🐘❤️'
    },
    {
      icon: '💍',
      question: 'The golden date you poured your heart out and proposed to me?',
      options: [
        'October 23, 2023',
        'October 31, 2023',
        'December 25, 2023'
      ],
      correct: 0,
      story: 'October 23, 2023 — The easiest and truest “YES” of my entire life! Two best friends chose forever 💍✨'
    },
    {
      icon: '🛕',
      question: 'Where did we go on our very first official date after the proposal?',
      options: [
        'Marina Beach sunrise',
        'Thiruthani Murugan Temple',
        'Phoenix Marketcity cinema'
      ],
      correct: 1,
      story: 'October 31, 2023 — Climbing those sacred steps side-by-side, seeking Lord Murugan’s blessings for our love 🛕🙏'
    },
    {
      icon: '🛵',
      question: 'What is our absolute favorite feast after long bike rides?',
      options: [
        'Shawarma & juice',
        'Fried Rice shared ',
        'Pizza & burger'
      ],
      correct: 1,
      story: 'Holding you tight on the Splendor bike, wind in our hair, and ending the day sharing hot fried rice together! 🍚🛵❤️'
    }
  ];

  let currentQuestionIdx = 0;
  let quizScore = 0;

  const quizStepBadge = document.getElementById('quiz-step-badge');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizIconEl = document.getElementById('quiz-icon');
  const quizQuestionTitle = document.getElementById('quiz-question-title');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedbackBox = document.getElementById('quiz-feedback-box');
  const quizFeedbackText = document.getElementById('quiz-feedback-text');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizCard = document.getElementById('quiz-card');
  const quizCertCard = document.getElementById('quiz-cert-card');
  const certFinalScore = document.getElementById('cert-final-score');

  function renderQuizQuestion(idx) {
    if (!quizCard || !quizOptionsGrid) return;
    const q = quizData[idx];

    if (quizStepBadge) quizStepBadge.textContent = `Question ${idx + 1} of ${quizData.length}`;
    if (quizProgressFill) quizProgressFill.style.width = `${((idx + 1) / quizData.length) * 100}%`;
    if (quizIconEl) quizIconEl.textContent = q.icon;
    if (quizQuestionTitle) quizQuestionTitle.textContent = q.question;

    if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';
    quizOptionsGrid.innerHTML = '';

    const letters = ['A', 'B', 'C'];
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `
        <span class="quiz-opt-key">${letters[optIdx]}</span>
        <span class="quiz-opt-text">${optText}</span>
      `;
      btn.addEventListener('click', () => handleQuizAnswer(optIdx, btn));
      quizOptionsGrid.appendChild(btn);
    });
  }

  function handleQuizAnswer(selectedIdx, clickedBtn) {
    const q = quizData[currentQuestionIdx];
    const optionBtns = quizOptionsGrid.querySelectorAll('.quiz-opt-btn');

    optionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIdx === q.correct;
    if (isCorrect) {
      quizScore++;
      if (quizScoreEl) quizScoreEl.textContent = quizScore;
      clickedBtn.classList.add('correct');
      const rect = clickedBtn.getBoundingClientRect();
      createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (quizFeedbackText) {
        quizFeedbackText.innerHTML = `<strong>✨ Absolutely Right, Pappuu!</strong><br>${q.story}`;
      }
    } else {
      clickedBtn.classList.add('wrong');
      if (optionBtns[q.correct]) {
        optionBtns[q.correct].classList.add('correct');
      }
      if (quizFeedbackText) {
        quizFeedbackText.innerHTML = `<strong>Aww, almost! ❤️</strong><br>${q.story}`;
      }
    }

    if (quizFeedbackBox) quizFeedbackBox.style.display = 'block';

    if (currentQuestionIdx === quizData.length - 1) {
      if (quizNextBtn) quizNextBtn.innerHTML = '<span>VIEW YOUR SOULMATE CERTIFICATE 👑</span>';
    } else {
      if (quizNextBtn) quizNextBtn.innerHTML = '<span>NEXT QUESTION ➔</span>';
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentQuestionIdx < quizData.length - 1) {
        currentQuestionIdx++;
        renderQuizQuestion(currentQuestionIdx);
      } else {
        if (quizCard) quizCard.style.display = 'none';
        if (quizCertCard) quizCertCard.style.display = 'block';
        if (certFinalScore) {
          certFinalScore.textContent = `${quizScore} / ${quizData.length}`;
        }
        launchCelebrationFireworks();
      }
    });
  }

  // Initial Quiz Question Render
  renderQuizQuestion(0);


  // ========================================================================
  // 11. OUR 2030 TIME CAPSULE (Option 6)
  // ========================================================================
  const unlockVaultBtn = document.getElementById('unlock-vault-btn');
  const padlockTrigger = document.getElementById('capsule-padlock-trigger');
  const capsuleLockedCard = document.getElementById('capsule-locked-card');
  const capsuleUnlockedContent = document.getElementById('capsule-unlocked-content');
  const vowAcceptBtn = document.getElementById('vow-accept-btn');
  const vowSealedNotice = document.getElementById('vow-sealed-notice');

  function unlockTimeCapsule() {
    if (!capsuleLockedCard || !capsuleUnlockedContent) return;

    if (padlockTrigger) {
      padlockTrigger.classList.add('is-unlocked');
    }

    const rect = unlockVaultBtn ? unlockVaultBtn.getBoundingClientRect() : capsuleLockedCard.getBoundingClientRect();
    createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    setTimeout(() => {
      capsuleLockedCard.style.display = 'none';
      capsuleUnlockedContent.style.display = 'block';
      launchCelebrationFireworks();
    }, 650);
  }

  if (unlockVaultBtn) {
    unlockVaultBtn.addEventListener('click', unlockTimeCapsule);
  }
  if (padlockTrigger) {
    padlockTrigger.addEventListener('click', unlockTimeCapsule);
  }

  if (vowAcceptBtn) {
    vowAcceptBtn.addEventListener('click', (e) => {
      createParticleBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
      vowAcceptBtn.style.display = 'none';
      if (vowSealedNotice) {
        vowSealedNotice.style.display = 'inline-flex';
      }
    });
  }

});

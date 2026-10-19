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

    // AUTO-PLAY the love song immediately on first user gesture
    bgAudio.volume = 0.85;
    bgAudio.play()
      .then(() => {
        setMusicPlayingState(true);
      })
      .catch((err) => {
        console.warn('Autoplay blocked, user can manually play:', err);
      });

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
      audioStatusText.textContent = 'One Love ♥';
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
      // Also check for hardcoded img in HTML (photos embedded directly)
      const hardcodedImg = tile.querySelector('img');
      const imgSrc = savedSrc || (hardcodedImg ? hardcodedImg.src : null);

      if (tile.classList.contains('has-photo') && imgSrc) {
        // Already has photo → open lightbox
        openHeartLightbox(imgSrc);
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

    // Compress before saving to avoid localStorage QuotaExceededError
    compressImage(file, 900, 0.85, (dataURL) => {
      const tile = document.querySelector(`.heart-tile[data-slot="${activeTileSlot}"]`);
      if (tile) {
        const wasEmpty = !tile.classList.contains('has-photo');
        setTilePhoto(tile, dataURL);
        try {
          localStorage.setItem(`heart-tile-${activeTileSlot}`, dataURL);
        } catch (err) {
          console.warn('localStorage quota exceeded — trying lower quality', err);
          // Retry at lower quality if quota is exceeded
          compressImage(file, 600, 0.65, (smallerUrl) => {
            try {
              localStorage.setItem(`heart-tile-${activeTileSlot}`, smallerUrl);
            } catch (e2) {
              showFilmToast('⚠️ Image too large to save. Try a smaller photo.');
            }
          });
        }
        if (wasEmpty) {
          filledCount++;
          updateFilledCount();
          // tiny heart burst celebration
          tile.classList.add('just-uploaded');
          setTimeout(() => tile.classList.remove('just-uploaded'), 700);
        }
        showFilmToast('💝 Memory saved to your heart collage! ❤️');
      }
      activeTileSlot = null;
    });
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

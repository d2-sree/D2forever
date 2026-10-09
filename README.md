# 23:10 — Our Story ❤️
### A Romantic Anniversary Surprise for Dinesh (October 23, 2026)

A cinematic, Netflix-style interactive love story website celebrating 3 years of love, memories, and countless adventures.

---

## 🌟 Features Included

1. **Cinematic Opening Screen (The Prelude)**:
   - "Hey Dinesh ❤️"
   - "Before you continue... I have something to show you."
   - "Do you remember October 23, 2023?"
   - "YES, I REMEMBER ❤️" button with smooth curtain unveil transition and chime sound.

2. **Episode 01 — The Beginning**:
   - The Xerox shop queue during 1st year of college
   - Transition from friends to best friends
   - Dinesh's proposal on October 23, 2023

3. **Episode 02 — Our Memories**:
   - **Vintage 35mm Film Strip & Scrapbook Photo Booth (NEW)**:
     - Authentic 35mm analog film roll with sprocket holes and retro amber frame numbers (`2A`, `3`, `3A`, `4`).
     - **Interactive User Photo Uploads**: Directly click any frame to choose photos from your phone or gallery!
     - Drag-and-drop support, editable captions, and auto-save in `localStorage`.
     - **Download Strip**: One-click export that generates a high-resolution 4-frame film strip image to keep or print!
     - Scrapbook aesthetic side cards with cute stickers (Totoro, Cinnamoroll, ribbon bows, stamps, frogs).
   - **Interactive Relationship Timeline**: Chronological milestone journey (College Xerox shop, Proposal, Thiruthani Temple, Train rides, Splendor bike rides, 3rd Anniversary).
   - **Memory Heart Collage**: 34-tile heart grid with interactive photo uploads and lightbox preview.

4. **Episode 03 — A Letter For You**:
   - Interactive **3D wax-sealed envelope** (embossed with `23:10`)
   - Clicking the seal or envelope cracks the wax, flips open the envelope flap, slides the vintage parchment out, and reveals the personal handwritten love letter **line by line**

5. **Episode 04 — Our Next Chapter**:
   - **Live Countdown Timer** to October 23, 2026
   - **Days In Love Counter** ticking every second since Dinesh proposed (October 23, 2023)
   - The Grand Final Message:
     > *"3 years.*  
     > *Thousands of memories.*  
     > *Countless fights.*  
     > *One love.*  
     > *And I would still choose you.*  
     > *Happy Anniversary, Dinesh.*  
     > *23.10.2026 ♾️"*
   - **Final Surprise Celebration**: Clicking "TOUCH FOR OUR FINAL SURPRISE" unleashes heart fireworks, rising lanterns, and a secret anniversary vow card.

6. **Pinterest Aesthetic Background**:
   - Floating romantic aura spheres (rose gold, warm amber, deep wine)
   - 35mm analog film grain overlay
   - Warm fairy lights, bokeh hearts & interactive stardust trail

7. **Background Music Player**:
   - Soft romantic melody with a clearly labeled vinyl disc toggle (`Play Our Song / Playing Music`).
   - Does **NOT** autoplay (waits for tap).
   - Includes built-in synthesizer fallback so it sounds magical even before custom files are added.

---

## 📸 How to Replace Photos in the Polaroid Gallery

1. Place your pictures into the [assets/images/](file:///home/dhanushree/D2/assets/images/) folder (e.g. `pic1.jpg`, `pic2.jpg`).
2. Open [index.html](file:///home/dhanushree/D2/index.html) and search for `<!-- 📸 REPLACE PHOTO`.
3. Update the `data-full` and `<img>` src paths to point to your image file!

### 2. Customizing the Love Letter & Text
- Open [index.html](file:///home/dhanushree/D2/index.html) and search for `<!-- ✏️ EDIT TEXT HERE`.
- You can change, add, or rewrite any paragraph inside the `<div class="letter-content">` section.

### 3. Changing Background Music
- Place any MP3 or WAV song in `assets/audio/` (e.g. `assets/audio/our_song.mp3`).
- In [index.html](file:///home/dhanushree/D2/index.html), update the `<audio>` tag:
  ```html
  <audio id="bg-audio" preload="auto" loop>
    <source src="assets/audio/our_song.mp3" type="audio/mpeg" />
  </audio>
  ```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or run a simple local server:
```bash
python3 -m http.server 8080
```
Then visit:
👉 **`http://localhost:8080`**

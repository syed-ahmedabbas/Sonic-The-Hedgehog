# 🦔 Sonic RUSH — An Endless Runner Game

An action-packed, retro-styled **endless runner** game starring **Sonic the Hedgehog** and friends, built from the ground up using the **KAPLAY** game engine (formerly Kaboom.js) and bundled with **Vite**.

Choose your favourite character — **Sonic**, **Shadow**, or **Knuckles** — and dash through an infinite Chemical Plant Zone, dodging Motobug robots, collecting golden rings, racking up combo multipliers, and chasing the elusive **S-Rank**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots & Gameplay](#-screenshots--gameplay)
- [Project Architecture](#-project-architecture)
- [Detailed File Breakdown](#-detailed-file-breakdown)
- [Game Scenes & Flow](#-game-scenes--flow)
- [Entity System](#-entity-system)
- [Asset Pipeline](#-asset-pipeline)
- [Controls](#-controls)
- [Scoring & Rank System](#-scoring--rank-system)
- [Technical Deep-Dive](#-technical-deep-dive)
- [Setup & Installation](#-setup--installation)
- [Building for Production](#-building-for-production)
- [Bugs Fixed During Development](#-bugs-fixed-during-development)
- [Known Issues](#-known-issues)
- [Future Roadmap](#-future-roadmap)
- [Credits & Acknowledgements](#-credits--acknowledgements)
- [License](#-license)

---

## 🎮 Overview

**Sonic RUSH** is a browser-based 2D side-scrolling endless runner. The player character runs automatically from left to right across an infinitely scrolling Chemical Plant Zone. The gameplay loop is simple but addictive:

1. **Jump** over or onto Motobug enemies.
2. **Collect rings** scattered across the track.
3. **Survive as long as possible** — the game speed increases every second.
4. **Beat your high score** and earn the highest letter rank.

The game is built entirely in **JavaScript** using ES modules, with no framework beyond KAPLAY for game logic and Vite for development/bundling. It renders on an HTML5 Canvas at a fixed **1920×1080** resolution with letterboxing to fit any screen size.

---

## ✨ Features

### 🏃 Multi-Character Support
- **3 Playable Characters**: Sonic, Shadow, and Knuckles — each with their own custom sprite sheet, unique scale, and ground-offset tuning.
- **Character Selection Screen**: A polished selection UI with portrait cards, gold highlight borders, and keyboard navigation.
- **Persistent Selection**: Your character choice carries across game sessions until you change it.

### 🌍 Infinite Scrolling World
- **Parallax Background**: The Chemical Plant Zone background scrolls at a slower rate than the platforms, creating a depth illusion.
- **Seamless Platform Loop**: Two platform pieces leapfrog each other endlessly so the ground never ends.
- **Dynamic Speed**: Game speed starts at 300 units/s and increases by 50 every second, making the game progressively harder.

### 👾 Enemies — Motobugs
- Classic Badnik enemies from the Sonic franchise.
- Spawn at random intervals (0.5–2.5 seconds) from the right edge.
- Can be **destroyed by jumping on them** — awarding bonus score and a combo multiplier.
- Touching one **on the ground** ends the game.

### 💍 Ring Collectibles
- Golden rings spawn at random intervals (0.5–3 seconds) and scroll with the platform.
- Collecting a ring awards **+1 score** with a yellow floating "+1" indicator above the character.
- Accompanied by the iconic Sonic ring sound effect.

### 🏆 Scoring & Ranking
- **Ring Collection**: +1 point per ring.
- **Enemy Destruction**: +10 points base, multiplied by a chain combo multiplier.
- **Combo Multiplier**: Increases for each consecutive enemy destroyed without touching the ground. Resets on landing.
- **Letter Ranks**: F → E → D → C → B → A → S, based on score thresholds.
- **Persistent Best Score**: Stored in browser local storage via KAPLAY's `setData`/`getData`.

### 🎵 Audio
- **Background Music**: Looping city-themed BGM during gameplay, paused on game over.
- **Sound Effects**: Jump, ring collect, enemy destroy, hyper ring combo, and hurt sounds.
- All audio files are loaded and managed through KAPLAY's built-in sound system.

### 📋 Navigable Main Menu
- Fully keyboard-navigable menu with **PLAY**, **CHARACTER SELECTION**, and **EXIT** options.
- Gold highlight and scale animation on the selected option.
- Sound feedback on navigation and selection.
- Animated background with scrolling Chemical Plant Zone and platforms.

### 💀 Game Over Screen
- Displays **current score** and **best score** side by side.
- Shows **letter rank** for both scores inside bordered boxes.
- Updates the persistent best score if beaten.
- Options to **replay** or **return to main menu** (after a 1-second delay to prevent accidental input).

---

## 📸 Screenshots & Gameplay

> *Play the game locally to experience the full retro Sonic aesthetic with animated sprites, scrolling backgrounds, and sound effects!*

| Screen | Description |
|--------|-------------|
| **Main Menu** | Title "Sonic RUSH" with navigable PLAY / CHARACTER SELECTION / EXIT options and scrolling background |
| **Character Select** | Three portrait cards (Sonic, Shadow, Knuckles) with gold border on selection |
| **Gameplay** | Side-scrolling runner with score display, rings, Motobugs, and floating "+1" indicators |
| **Game Over** | Best score vs current score with letter rank display (F through S) |

---

## 🏗️ Project Architecture

### High-Level Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                      index.html                         │
│              (HTML entry point, loads main.js)           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  src/assets/main.js                      │
│           (Asset loading, scene registration,            │
│            game entry point → starts mainMenu)           │
└──────┬──────────┬──────────┬──────────┬─────────────────┘
       │          │          │          │
       ▼          ▼          ▼          ▼
  ┌─────────┐ ┌─────────┐ ┌──────┐ ┌────────────────┐
  │mainMenu │ │  game   │ │game  │ │characterSelect │
  │  .js    │ │  .js    │ │over  │ │     .js        │
  │         │ │         │ │.js   │ │                │
  └────┬────┘ └────┬────┘ └──────┘ └────────────────┘
       │          │
       ▼          ▼
  ┌──────────────────────────────────────┐
  │         src/entities/                 │
  │  sonic.js  │  motobug.js  │  ring.js  │
  └──────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────┐
  │       src/assets/kaplayCtx.js        │
  │  (KAPLAY instance + gameState)        │
  └──────────────────────────────────────┘
```

### Scene Flow Diagram

```text
                    ┌──────────────┐
         ┌────────►│  Main Menu   │◄─────────────┐
         │         └──────┬───────┘              │
         │                │                      │
         │         ┌──────┴───────┐              │
         │         │              │              │
         ▼         ▼              ▼              │
  ┌──────────┐  ┌──────┐  ┌────────────────┐    │
  │   EXIT   │  │ PLAY │  │ CHARACTER      │    │
  │ (Thanks) │  │      │  │ SELECT         │    │
  └──────────┘  └──┬───┘  └───────┬────────┘    │
                   │               │             │
                   ▼               │             │
            ┌──────────┐           │             │
            │   Game   │◄──────────┘             │
            └────┬─────┘   (returns to menu      │
                 │          after selecting)      │
                 │                               │
                 ▼ (on death)                    │
            ┌──────────┐                         │
            │ Game Over├─────────────────────────┘
            └────┬─────┘    (ESC → mainMenu)
                 │
                 └──► (Space/Click → game) Replay
```

---

## 📂 Detailed File Breakdown

### Root Files

```text
Sonic-The-Hedgehog/
├── index.html           # HTML entry point — loads main.js as ES module
├── package.json         # npm config — Vite dev dependency, KAPLAY runtime dependency
├── package-lock.json    # Dependency lockfile
├── .gitignore           # Ignores node_modules, dist, IDE configs
└── README.md            # This documentation file
```

#### `index.html`
The single-page HTML shell. Contains:
- UTF-8 charset and responsive viewport meta tag.
- Custom favicon (`/favicon.png`).
- Page title: **"Sonic RUSH"**.
- A `<div id="app">` container (KAPLAY renders its canvas independently).
- ES module script tag loading `/src/assets/main.js`.

#### `package.json`
```json
{
  "name": "sonic-the-hedgehog",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^8.1.0"
  },
  "dependencies": {
    "kaplay": "^3001.0.19"
  }
}
```
- **Runtime dependency**: `kaplay` — the game engine.
- **Dev dependency**: `vite` — lightning-fast bundler and dev server with HMR.
- **Module system**: ES Modules (`"type": "module"`).

---

### Source Code — `src/`

#### `src/assets/kaplayCtx.js` — Game Engine Configuration

This file initialises the KAPLAY game engine and exports two things:

1. **`k`** (default export) — The KAPLAY context instance configured with:
   - **Canvas Size**: 1920×1080 pixels (Full HD).
   - **Letterboxing**: Enabled — maintains aspect ratio on any screen size by adding black bars.
   - **Background**: Pure black `[0, 0, 0]`.
   - **Global mode**: Disabled (`global: false`) — all KAPLAY functions are accessed via the `k` object rather than polluting the global scope.
   - **Touch support**: `touchToMouse: true` — allows mobile tap-to-jump.
   - **Button mapping**: `"jump"` is mapped to `Space` key and left mouse click.
   - **Debug mode**: Enabled with `D` key toggle (shows hitboxes, FPS, etc.).

2. **`gameState`** (named export) — A shared mutable state object:
   ```js
   export const gameState = {
       selectedCharacter: "sonic"   // Default character
   };
   ```
   This is read by `makeSonic()` to determine which sprite sheet to load and is written to by the character selection screen.

---

#### `src/assets/main.js` — Asset Loader & Entry Point

The **bootstrap file** for the entire game. It performs three jobs:

**1. Asset Preloading**

All assets are loaded synchronously before any scene runs. KAPLAY blocks the game start until every asset resolves. The assets loaded are:

| Asset Type | Asset Name | File | Details |
|------------|-----------|------|---------|
| Sprite | `chemical-bg` | `graphics/chemical-bg.png` | Background image for Chemical Plant Zone |
| Sprite | `platforms` | `graphics/platforms.png` | Ground/platform tileset |
| Sprite | `sonic` | `graphics/sonic.png` | Sonic sprite sheet — 8×2 grid (8 run frames + 8 jump frames) |
| Sprite | `shadow` | `graphics/shadow.png` | Shadow sprite sheet — 8×2 grid (same layout as Sonic) |
| Sprite | `knuckles` | `graphics/knuckles.png` | Knuckles sprite sheet — 8×2 grid (same layout) |
| Sprite | `sonic_dp` | `graphics/sonic dp.png` | Sonic portrait for character select |
| Sprite | `shadow_dp` | `graphics/shadow dp.jpg` | Shadow portrait for character select |
| Sprite | `knuckles_dp` | `graphics/knuckle dp.webp` | Knuckles portrait for character select |
| Sprite | `ring` | `graphics/ring.png` | Ring sprite sheet — 16×1 grid (16 spin frames) |
| Sprite | `motobug` | `graphics/motobug.png` | Motobug sprite sheet — 5×1 grid (5 run frames) |
| Font | `mania` | `fonts/mania.ttf` | Sonic Mania retro font used for all in-game text |
| Sound | `destroy` | `sounds/Destroy.wav` | Enemy destruction sound effect |
| Sound | `jump` | `sounds/Jump.wav` | Jump sound effect |
| Sound | `ring` | `sounds/Ring.wav` | Ring collection sound effect |
| Sound | `hurt` | `sounds/Hurt.wav` | Damage/death sound effect |
| Sound | `hyper-ring` | `sounds/HyperRing.wav` | Combo enemy kill sound |
| Sound | `city` | `sounds/city.mp3` | Background music loop (~3.9 MB) |

**2. Scene Registration**

Four scenes are registered with KAPLAY:
```js
k.scene("mainMenu", mainMenu);
k.scene("characterSelect", characterSelect);
k.scene("game", game);
k.scene("gameover", gameover);
```

**3. Game Start**

```js
k.go("mainMenu");
```
The game begins at the main menu scene.

---

#### `src/entities/sonic.js` — Player Character Entity

The `makeSonic(pos)` factory function creates the player character entity. Despite the name "sonic", it dynamically loads **any** of the three characters based on `gameState.selectedCharacter`.

**Character Configuration Tables:**

| Character | Sprite Key | Scale | Y-Offset | Sprite Sheet Size | Frame Size (approx.) |
|-----------|-----------|-------|----------|-------------------|---------------------|
| Sonic | `sonic` | 4× | +120 | 256×88 px | 32×44 px |
| Shadow | `shadow` | 2× | +80 | 852×293 px | 106×146 px |
| Knuckles | `knuckles` | 2× | +80 | 852×293 px | 106×146 px |

- **Scale**: Sonic's pixel art is smaller (32×44) so it's scaled 4× to match the game world. Shadow and Knuckles have higher-resolution sprites (106×146) so they're only scaled 2×.
- **Y-Offset**: A vertical correction applied to the spawn position so the character's feet sit correctly on the platform surface. Each character's sprite has different padding/dimensions in their sheet.

**Entity Components:**
- `k.sprite()` — Renders the animated sprite (run/jump animations).
- `k.scale()` — Applies the character-specific scale.
- `k.area()` — Enables collision detection.
- `k.anchor("bot")` — Anchors the sprite at its bottom edge (feet) for physics grounding.
- `k.pos()` — Position with Y-offset applied.
- `k.body({ jumpForce: 1700 })` — Physics body with jump impulse of 1700 units.

**Custom Methods:**
- `setControls()` — Binds the "jump" button. On press, if grounded: switches to jump animation, applies jump force, and plays the jump sound (with error handling for audio autoplay restrictions).
- `setEvents()` — Binds the `onGround` event to switch back to the "run" animation when landing.

**Ring Collect UI:**
A child text element attached to the player:
```js
player.ringCollectUI = player.add([
    k.text("", { font: "mania", size: 24 }),
    k.anchor("center"),
    k.pos(0, currentScale === 4 ? -40 : -60),
    k.color(255, 255, 0),
]);
```
- Positioned above the character's head (negative Y).
- Uses different Y offsets depending on character scale: `-40` for Sonic (scale 4) and `-60` for Shadow/Knuckles (scale 2).
- Displays "+1" on ring collection, "+10" on first enemy kill, and "x N" for combo multipliers.
- Yellow colour (`255, 255, 0`) for visibility.

---

#### `src/entities/motobug.js` — Motobug Enemy Entity

The `makeMotobug(pos)` factory function creates a Motobug Badnik enemy.

**Entity Components:**
- `k.sprite("motobug", { anim: "run" })` — Animated sprite (5-frame run loop at 38 FPS).
- `k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) })` — Custom hitbox rectangle offset slightly for better collision feel.
- `k.scale(4)` — Scaled to match the game world.
- `k.anchor("center")` — Centered anchor point.
- `k.pos(pos)` — Spawn position (always off-screen right).
- `k.offscreen()` — Enables off-screen detection for cleanup.
- `"enemy"` — String tag used for collision detection (`sonic.onCollide("enemy", ...)`).

---

#### `src/entities/ring.js` — Ring Collectible Entity

The `makeRing(pos)` factory function creates a collectible ring.

**Entity Components:**
- `k.sprite("ring", { anim: "spin" })` — Animated sprite (16-frame spin loop at 30 FPS).
- `k.area()` — Default collision area.
- `k.scale(4)` — Scaled 4× to match the game world.
- `k.anchor("center")` — Centered anchor.
- `k.pos(pos)` — Spawn position.
- `k.offscreen()` — Off-screen detection for cleanup.
- `"ring"` — String tag for collision detection (`sonic.onCollide("ring", ...)`).

---

### Scenes — `src/scenes/`

#### `src/scenes/mainMenu.js` — Main Menu Scene

The landing screen of the game. Features:

**Visual Layout:**
- **Title**: "Sonic RUSH" in 100pt Mania font, centered at the top.
- **Menu Options**: Three vertically stacked options — "PLAY", "CHARACTER SELECTION", "EXIT" — each in 60pt font, spaced 110px apart.
- **Background**: Scrolling Chemical Plant Zone with parallax (background at 100 units/s, platforms at 300 units/s).
- **Character Preview**: The currently selected character runs on the platform.

**Menu Navigation:**
- `Up Arrow` / `Down Arrow` — Move selection up/down with ring sound feedback.
- `Enter` or `Space` — Confirm selection with destroy sound feedback.
- Selected option is highlighted in **gold** (`RGB 255, 215, 0`) and scaled to **1.1×**.
- Unselected options are white at normal scale.

**Menu Actions:**
| Option | Action |
|--------|--------|
| PLAY | Transitions to the `game` scene |
| CHARACTER SELECTION | Transitions to the `characterSelect` scene |
| EXIT | Displays a "THANKS FOR PLAYING!" message over a black screen |

**Technical Notes:**
- Gravity is set to `0` on this scene to prevent the preview character from falling.
- Best score is initialised to `0` in local storage if not already set.

---

#### `src/scenes/characterSelect.js` — Character Selection Scene

A polished character picker screen. Features:

**Visual Layout:**
- **Title**: "SELECT YOUR RUNNER" in 54pt Mania font.
- **Portrait Cards**: Three 280×320 px boxes arranged horizontally with 400px spacing, containing:
  - A dark background box (`RGB 15, 15, 25`) with rounded corners (8px radius).
  - A portrait image auto-scaled to fit with 20px padding.
  - A character name label below the box in 48pt font.
- **Selected Card**: Gold border (5px), full opacity portrait, gold name label scaled to 1.15×.
- **Unselected Cards**: Gray border, 40% opacity portrait, white name label at normal scale.
- **Instruction Text**: "< LEFT / RIGHT >   ENTER to confirm   ESC to go back" in gray at the bottom.

**Navigation:**
- `Left Arrow` / `Right Arrow` — Cycle between characters with ring sound.
- `Enter` or `Space` — Confirm selection. Updates `gameState.selectedCharacter` and returns to the main menu.
- `Escape` — Return to main menu without changing selection.

**Characters Available:**

| Index | Name | Portrait Asset | Sprite Key |
|-------|------|---------------|------------|
| 0 | SONIC | `sonic_dp` | `sonic` |
| 1 | SHADOW | `shadow_dp` | `shadow` |
| 2 | KNUCKLES | `knuckles_dp` | `knuckles` |

---

#### `src/scenes/game.js` — Core Gameplay Scene

The main gameplay scene — where the action happens.

**Initialisation:**
1. Sets gravity to `3100` units/s² (strong gravity for snappy jumps).
2. Starts background music (`city.mp3`) at 20% volume, looping.
3. Creates two background pieces and two platform pieces for infinite scrolling.
4. Initialises `score = 0` and `scoreMultiplier = 1`.
5. Displays score text in the top-left corner (72pt Mania font).
6. Spawns the player character at position `(200, 745)`.
7. Creates an invisible static physics body at `y = 832` spanning the full width — this is the **floor collider** that the character stands on.

**Game Loop (`onUpdate`):**
Every frame:
- Resets `scoreMultiplier` to 1 when the player is grounded.
- Scrolls background pieces left at 100 units/s (parallax layer).
- Scrolls platform pieces left at `gameSpeed` (starts 300, increases +50/s).
- Both background and platform pieces use a **leapfrog** pattern: when piece B scrolls past x=0, piece A teleports ahead of piece B.

**Enemy Collision (`onCollide("enemy")`):**
- **If airborne (jumping on enemy)**:
  - Play `destroy` + `hyper-ring` sounds.
  - Destroy the enemy entity.
  - Switch player to jump animation + bounce jump.
  - Increment combo multiplier.
  - Award `10 × multiplier` points.
  - Show "+10" or "x N" floating text for 1 second.
- **If grounded (running into enemy)**:
  - Play `hurt` sound.
  - Save current score to local storage.
  - Transition to `gameover` scene, passing the music handle to pause it.

**Ring Collision (`onCollide("ring")`):**
- Play `ring` sound.
- Destroy the ring entity.
- Increment score by 1.
- Update score text display.
- Show "+1" floating text for 1 second.

**Spawning Systems:**
- **Motobugs**: Recursive `spawnMotoBug()` function spawns a Motobug at `(1950, 773)`, sets it to move left at `gameSpeed + 300` (capped at `gameSpeed` above 3000), destroys it when off-screen left, then waits a random `0.5–2.5` seconds before spawning the next one.
- **Rings**: Similar recursive `spawnRing()` function spawns a ring at `(1950, 745)`, moves it left at `gameSpeed`, destroys off-screen, waits `0.5–3` seconds.

**Speed Escalation:**
```js
k.loop(1, () => {
    gameSpeed += 50;
});
```
Every 1 second, game speed increases by 50 units/s. This makes the game progressively harder, with enemies and rings approaching faster.

---

#### `src/scenes/gameover.js` — Game Over Scene

Displayed when the player hits an enemy on the ground.

**Initialisation:**
1. Pauses the background music (received as `citySfx` parameter).
2. Reads `best-score` and `current-score` from local storage.
3. Calculates letter ranks for both scores.
4. Updates `best-score` in local storage if the current score is higher.

**Rank Calculation:**

| Score Threshold | Rank |
|----------------|------|
| 0 – 49 | F |
| 50 – 79 | E |
| 80 – 99 | D |
| 100 – 199 | C |
| 200 – 299 | B |
| 300 – 399 | A |
| 400 – 499 | S |
| 500+ | S |

The ranking system iterates through the threshold array, assigning the highest qualifying grade.

**Visual Layout:**
- **"GAME OVER"** title in 96pt font, centered near the top.
- **"BEST SCORE : N"** on the left and **"CURRENT SCORE : N"** on the right (64pt font).
- Two **400×400 px rank boxes** with white outlines displaying the letter rank in 100pt font.
- After a **1-second delay** (to prevent accidental input):
  - "Press Space/Click to Play Again" in 42pt font.
  - "Press ESC to Return to Main Menu" in 32pt gray font.
  - Input handlers are registered for replay and menu return.

---

## 🎮 Controls

### Keyboard Controls

| Key | Action | Context |
|-----|--------|---------|
| `Space` | Jump / Confirm | Gameplay, Menu Selection |
| `Up Arrow` | Navigate Up | Main Menu |
| `Down Arrow` | Navigate Down | Main Menu |
| `Left Arrow` | Previous Character | Character Select |
| `Right Arrow` | Next Character | Character Select |
| `Enter` | Confirm Selection | Main Menu, Character Select |
| `Escape` | Go Back / Return to Menu | Character Select, Game Over |
| `D` | Toggle Debug Overlay | Any Scene (development) |

### Mouse / Touch Controls

| Input | Action |
|-------|--------|
| Left Click | Jump (during gameplay) |
| Touch (mobile) | Jump (mapped to mouse via `touchToMouse`) |

---

## 🏆 Scoring & Rank System

### Point Values

| Action | Base Points | Multiplier Applied? |
|--------|------------|-------------------|
| Collect a Ring | +1 | No |
| Destroy Motobug (airborne) | +10 | Yes — ×(chain combo) |

### Combo Multiplier

The combo multiplier rewards consecutive aerial enemy kills without landing:

```text
1st enemy:  +10 × 1 = 10 points    (shows "+10")
2nd enemy:  +10 × 2 = 20 points    (shows "x 2")
3rd enemy:  +10 × 3 = 30 points    (shows "x 3")
... and so on
```

The multiplier resets to 1 the moment the player touches the ground.

### Rank Thresholds

| Rank | Minimum Score | Difficulty |
|------|--------------|------------|
| **F** | 0 | Starting rank |
| **E** | 50 | Easy |
| **D** | 80 | Moderate |
| **C** | 100 | Good |
| **B** | 200 | Great |
| **A** | 300 | Excellent |
| **S** | 400 | Master |

---

## 🔧 Technical Deep-Dive

### Game Engine — KAPLAY

[KAPLAY](https://kaplayjs.com/) (v3001.0.19) is a JavaScript game library for making games fast and fun. Key features used:

- **Scene System**: `k.scene()` / `k.go()` for state management.
- **Sprite System**: `k.loadSprite()` with `sliceX`/`sliceY` for sprite sheet parsing and named animation definitions.
- **Physics**: `k.body()` component with gravity, `k.area()` for collision, `isGrounded()` checks.
- **Audio**: `k.loadSound()` / `k.play()` with volume control and looping.
- **Data Persistence**: `k.setData()` / `k.getData()` — stores data in `localStorage`.
- **UI**: `k.text()` with custom font support, `k.rect()` for UI boxes.

### Canvas Configuration

```js
kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {
        jump: {
            keyboard: ["space"],
            mouse: "left",
        },
    },
    debugKey: "d",
    debug: true,
});
```

- **1920×1080**: Full HD resolution provides crisp visuals and ample space.
- **Letterboxing**: Prevents distortion on non-16:9 screens.
- **Non-global mode**: Clean code — all KAPLAY functions accessed via the `k` instance.

### Sprite Sheet Dimensions

| Character | Sheet Size (px) | Grid | Frame Size (px) | Animations |
|-----------|----------------|------|-----------------|------------|
| Sonic | 256 × 88 | 8×2 | 32 × 44 | Run (0–7), Jump (8–15) |
| Shadow | 852 × 293 | 8×2 | ~106 × 146 | Run (0–7), Jump (8–15) |
| Knuckles | 852 × 293 | 8×2 | ~106 × 146 | Run (0–7), Jump (8–15) |
| Motobug | — | 5×1 | — | Run (0–4) |
| Ring | — | 16×1 | — | Spin (0–15) |

### Infinite Scrolling Algorithm

The background and platform scrolling use the same **two-piece leapfrog** pattern:

```text
Frame N:     [Piece A]──────[Piece B]──────
Frame N+1:        [Piece A]──────[Piece B]──────    (both shift left)
Frame N+K:   [Piece B]──────     [Piece A moved ahead]
                                  ↑ A teleports to B's right edge
```

1. Two identical pieces are placed side-by-side.
2. Both move left every frame.
3. When the **trailing piece** (index 1) scrolls fully past `x = 0`, the **leading piece** (index 0) teleports ahead of it.
4. The array is rotated (`push(shift())`) so the roles swap.

This creates a seamless infinite loop with only 2 sprite instances.

### Physics Constants

| Parameter | Value | Notes |
|-----------|-------|-------|
| Gravity | 3100 units/s² | High for snappy, responsive jumps |
| Jump Force | 1700 units | Gives a satisfying arc height |
| Floor Collider Y | 832 px | Invisible rect spanning full width |
| Initial Game Speed | 300 units/s | Platform scroll rate |
| Speed Increment | +50/s | Game gets progressively harder |

---

## 🚀 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/syed-ahmedabbas/Sonic-The-Hedgehog.git
cd Sonic-The-Hedgehog
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs:
- **`kaplay`** — The game engine (runtime dependency)
- **`vite`** — The dev server and bundler (dev dependency)

### Step 3 — Run the Development Server

```bash
npm run dev
```

Vite will start a local server — typically at:
- `http://localhost:5173/` (or the next available port)

Open this URL in your browser to play the game. Vite provides **Hot Module Replacement (HMR)** so code changes are reflected instantly without a full page reload.

### Step 4 — Play!

1. Use **Up/Down arrows** to navigate the menu.
2. Press **Enter** or **Space** to select an option.
3. Choose your character in the Character Selection screen.
4. Press **Space** or **Click** to jump during gameplay.
5. Try to beat your high score!

---

## 📦 Building for Production

To create an optimised production bundle:

```bash
npm run build
```

This generates the `dist/` directory containing minified, tree-shaken output ready for deployment. To preview the production build locally:

```bash
npm run preview
```

The `dist/` folder can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

---

## 🛠️ Bugs Fixed During Development

### 1. Path Separator Bug in `index.html`
- **Problem**: The script tag had an invalid mixed backslash path: `src\assets/main.js`.
- **Root Cause**: Windows-style path separator was accidentally used.
- **Fix**: Changed to standard web forward slashes: `/src/assets/main.js`.

### 2. Audio Decoding Error — Filename Typo
- **Problem**: The `hurt` sound loader referenced `sounds/Hur.wav`, which didn't exist. KAPLAY blocks game initialization until all assets resolve, so this caused an `EncodingError: Unable to decode audio data` and a permanent blank screen.
- **Root Cause**: Typo in the filename — missing the 't' in "Hurt".
- **Fix**: Corrected to `sounds/Hurt.wav`.

### 3. Score Multiplier Typo
- **Problem**: The combo multiplier variable was misspelled as `scoreMultiplir` in multiple places, causing `undefined` references.
- **Fix**: Corrected all instances to `scoreMultiplier`.

### 4. Broken Ring Collect UI Conditional
- **Problem**: The `+1` ring text assignment had a broken trailing conditional statement.
- **Fix**: Cleaned up the statement to a simple assignment: `sonic.ringCollectUI.text = "+1"`.

---

## ⚠️ Known Issues

1. **"+1" Score Text Positioning**: The floating "+1" text position (`ringCollectUI`) uses a simple scale-based Y-offset (`-40` for scale 4, `-60` for scale 2). This doesn't perfectly account for each character's unique sprite height, causing the text to appear slightly too close to or too far from Shadow's and Knuckles' heads. A fix using the actual sprite frame height would be more precise.

2. **Mobile Input Limitations**: While `touchToMouse` is enabled for basic tap-to-jump, there are no on-screen buttons for menu navigation. Full mobile support would require touch-based UI controls.

3. **Audio Autoplay**: Modern browsers block audio autoplay until user interaction. The game handles this with try/catch on sound playback, but the first jump sound may be silently skipped.

---

## 🔮 Future Roadmap

- **Power-Ups**: Speed boost, shield, magnet (attract nearby rings), and invincibility star.
- **Multiple Zones**: Expand beyond Chemical Plant to include Green Hill Zone, Casino Night, etc.
- **Leaderboard**: Online high score tracking.
- **Obstacle Variety**: Spikes, gaps, moving platforms, and additional Badnik types (Buzz Bomber, Crabmeat).
- **Character-Specific Abilities**: Knuckles can glide, Shadow can use Chaos Control (slow time), Sonic has a spin dash.
- **Mobile UI**: On-screen touch controls and responsive layout for mobile play.
- **Particle Effects**: Ring sparkles, enemy explosion particles, dust clouds when landing.
- **Progressive Difficulty**: New enemy types and obstacle patterns as the game speed increases.
- **Sound Options**: Volume controls and mute toggle in the settings menu.

---

## 🙏 Credits & Acknowledgements

- **Game Engine**: [KAPLAY](https://kaplayjs.com/) — Open-source JavaScript game library.
- **Bundler**: [Vite](https://vitejs.dev/) — Next-generation frontend tooling.
- **Characters & Assets**: Sonic the Hedgehog franchise characters and art style by SEGA.
- **Font**: Sonic Mania-style retro bitmap font.
- **Developer**: [syed-ahmedabbas](https://github.com/syed-ahmedabbas)

---

## 📄 License

This is a fan project created for educational purposes. Sonic the Hedgehog and all related characters are trademarks of SEGA. This project is not affiliated with or endorsed by SEGA.

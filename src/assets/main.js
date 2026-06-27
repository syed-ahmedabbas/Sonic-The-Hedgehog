import k from "./kaplayCtx.js";                              
import mainMenu from "../scenes/mainMenu.js";                
import game from "../scenes/game.js";                        
import gameover from "../scenes/gameover.js";                
import characterSelect from "../scenes/characterSelect.js";  

// --- ASSET LOADING ---
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");

// Character Sprites
k.loadSprite("sonic"
    , "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2, 
    anims: { run: { from: 0, to: 7, loop: true, speed: 30 }, jump: { from: 8, to: 15, loop: true, speed: 100 } },
});

// Updated Shadow Sprite Mapping
k.loadSprite("shadow", "graphics/shadow.png", {
    sliceX: 8, // Adjust this to the exact number of horizontal frames in your sheet
    sliceY: 2, // 2 rows (Top row = run, Bottom row = jump)
    anims: { 
        run: { from: 0, to: 7, loop: true, speed: 30 }, 
        jump: { from: 8, to: 15, loop: true, speed: 30 } 
    },
});

// Updated Knuckles Sprite Mapping
k.loadSprite("knuckles", "graphics/knuckles.png", {
    sliceX: 8, // Adjust this to the exact number of horizontal frames in your sheet
    sliceY: 2, // 2 rows (Top row = run, Bottom row = jump)
    anims: { 
        run: { from: 0, to: 7, loop: true, speed: 30 }, 
        jump: { from: 8, to: 15, loop: true, speed: 30 } 
    },
});

// Character Portrait Images (for selection screen)
k.loadSprite("sonic_dp", "graphics/sonic dp.png");
k.loadSprite("shadow_dp", "graphics/shadow dp.jpg");
k.loadSprite("knuckles_dp", "graphics/knuckle dp.webp");

// Other Assets
k.loadSprite("ring", "graphics/ring.png", { sliceX: 16, sliceY: 1, anims: { spin: { from: 0, to: 15, loop: true, speed: 30 } } });
k.loadSprite("motobug", "graphics/motobug.png", { sliceX: 5, sliceY: 1, anims: { run: { from: 0, to: 4, loop: true, speed: 38 } } });
k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("city", "sounds/city.mp3");

// --- SCENE REGISTRATION ---
k.scene("mainMenu", mainMenu);
k.scene("characterSelect", characterSelect);
k.scene("game", game);
k.scene("gameover", gameover);

k.go("mainMenu");
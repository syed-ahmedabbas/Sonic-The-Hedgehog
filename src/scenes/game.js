import k from "../assets/kaplayCtx.js";
import { makeMotobug } from "../entities/motobug.js";
import { makeSonic } from "../entities/sonic.js";

export default function game() {
  k.setGravity(3100);

  const bgPieceWidth = 1920;
  
  // FIXED: Added the second background piece so bgPieces[1] actually exists!
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];
  
  const sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvent ();




  let gameSpeed = 300;
  
  // FIXED: Capitalized the 'S' in gameSpeed
  k.loop(1, () => {
    gameSpeed += 50;
  });

      const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        motobug.onUpdate(() => {
            if(gameSpeed < 3000 ){
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            motobug.move(-gameSpeed, 0); 
        });
        motobug.onExitScreen(() => {
            if(motobug.pos.x < 0 ) k.destroy(motobug);
        });
        const waitTime = k.rand(0.5,2.5)
        k.wait(waitTime, spawnMotoBug)
    };
    spawnMotoBug();


  k.add([
    k.rect(1920,300),
    k.opacity(0),
    k.area(),
    k.pos(0,832),
    k.body({ isStatic: true}),
  ]);


  k.onUpdate(() => {
    // Check if the second background piece has scrolled past the left edge
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }
    
    // Move the background pieces
    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    // Check if the second platform piece has scrolled past the left edge
    if (platforms[1].pos.x < 0) {
      // NOTE: Using platformWidth constant here prevents using 'undefined' width properties before assets load
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
      platforms.push(platforms.shift());
    }
    
    // Move platforms at game speed
    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
  });
} 
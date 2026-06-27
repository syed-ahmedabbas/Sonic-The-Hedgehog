import k from "../assets/kaplayCtx.js";
import { gameState } from "../assets/kaplayCtx.js"; 

export function makeSonic(pos) {
    // Define the perfect scale for each sprite asset
    const scales = {
        sonic: 4,      // Keeps original Sonic at his correct scale
        shadow: 2,     // Scales high-res Shadow down
        knuckles: 2,   // Scales high-res Knuckles down accordingly
    };

    // 1) POSITION OFFSETS: Manually push characters down to sit on the platform
    // Increase these numbers if they float; decrease if they sink into the platform.
    const yOffsets = {
        sonic: 120,    // Pushes Sonic down to balance out k.anchor("bot")
        shadow: 80,    // Tailored adjustment for Shadow's custom sprite sheet box
        knuckles: 80,  // Tailored adjustment for Knuckles
    };

    const currentScale = scales[gameState.selectedCharacter] || 4;
    const currentOffsetY = yOffsets[gameState.selectedCharacter] || 0;

    const player = k.add([
        k.sprite(gameState.selectedCharacter, { anim: "run" }), 
        
        // Apply the character-specific scale factor dynamically
        k.scale(currentScale),
        
        k.area(),
        
        // Keeps physics grounded perfectly to the platform at their feet
        k.anchor("bot"),
        
        // 2) APPLY OFFSET: Adds the vertical offset directly to the incoming pos vector
        k.pos(pos.x, pos.y + currentOffsetY),
        
        k.body({ jumpForce: 1700 }),
        {
            setControls() {
                k.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        if (this.curAnim() !== "jump") {
                            this.play("jump");
                        }
                        this.jump();
                        
                        try {
                            k.play("jump", { volume: 0.5 });
                        } catch (e) {
                            console.warn("Jump sound could not be played:", e.message);
                        }
                    }
                });
            },
            setEvents() {
                this.onGround(() => {
                    if (this.curAnim() !== "run") {
                        this.play("run");
                    }
                });
            },
        },
    ]);

    player.ringCollectUI = player.add([
        k.text("", { font: "mania", size: 24 }),
        k.anchor("center"),
        // Dynamically shift the "+1" ring text height based on the character's scale
        k.pos(0, currentScale === 4 ? -40 : -60), 
        k.color(255, 255, 0),
    ]);

    return player;
}
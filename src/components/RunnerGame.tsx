'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as Phaser from 'phaser';

function getTailwindColor(variable: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(variable) || fallback;
}

interface RunnerGameProps {
  onGameEnd: () => void;
}

const RunnerGame: React.FC<RunnerGameProps> = ({ onGameEnd }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [started, setStarted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [gameSize, setGameSize] = useState({ width: 800, height: 400 });

  // Responsive resize effect
  useEffect(() => {
    function handleResize() {
      if (gameContainerRef.current) {
        const width = Math.min(gameContainerRef.current.offsetWidth, 800);
        const height = Math.round(width / 2);
        setGameSize({ width, height });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!started || phaserGameRef.current) return;
    let gameOver = false;
    let flagSpawned = false;
    let jumpSuccess = 0;
    let timerInterval: NodeJS.Timeout;
    let timerValue = 0;
    let timerText: Phaser.GameObjects.Text;
    let jumpText: Phaser.GameObjects.Text;
    const gameFont = 'bold 32px "Press Start 2P", monospace';
    let allowObstacles = true;

    // Get Tailwind colors at runtime
    const themeColors = {
      background: getTailwindColor('--logo-dp', '#311431'),
      player: getTailwindColor('--logo-yellow', '#ece328'),
      obstacle1: getTailwindColor('--logo-dp2', '#471847'),
      obstacle2: getTailwindColor('--logo-gray', '#160212'),
      window: getTailwindColor('--logo-yellow', '#ece328'),
      ground: getTailwindColor('--logo-mul', '#43142f'),
    };

    interface HandleGameOverParams {
      player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      obstacle?: Phaser.GameObjects.Container;
    }

    class RunnerScene extends Phaser.Scene {
      player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      obstacles!: Phaser.Physics.Arcade.Group;
      ground!: Phaser.GameObjects.Rectangle;
      goalScene!: Phaser.GameObjects.Container;
      parallaxLayers: Phaser.GameObjects.Container[] = [];
      parallaxBuildings: { rect: Phaser.GameObjects.GameObject, speed: number, width: number }[][] = [];
      stars: Phaser.GameObjects.Ellipse[] = [];
      moon!: Phaser.GameObjects.Ellipse;

      preload() {
        this.load.image('playerLogo', '/logo.png');
      }

      create() {
        // Parallax backgrounds
        // Layer 1: Distant skyline (darkest, slowest)
        const skyline1 = this.add.container(0, 0);
        for (let i = 0; i < 7; i++) {
          const x = 60 + i * 120;
          const h = Phaser.Math.Between(40, 70);
          const building = this.add.rectangle(x, 340 - h / 2, 70, h, 0x220822);
          skyline1.add(building);
        }
        // Layer 2: Midground buildings (lighter, medium speed)
        const skyline2 = this.add.container(0, 0);
        for (let i = 0; i < 6; i++) {
          const x = 100 + i * 140;
          const h = Phaser.Math.Between(70, 110);
          const building = this.add.rectangle(x, 360 - h / 2, 90, h, 0x471847);
          skyline2.add(building);
        }
        this.parallaxLayers = [skyline1, skyline2];
        this.parallaxBuildings = [
          skyline1.list.map(b => ({ rect: b, speed: 0.5, width: 120 })),
          skyline2.list.map(b => ({ rect: b, speed: 1.2, width: 140 }))
        ];

        // Moon
        this.moon = this.add.ellipse(700, 80, 60, 60, 0xfafad2).setAlpha(0.85);
        this.add.ellipse(700, 80, 90, 90, 0xfafad2, 0.08);

        // Stars
        for (let i = 0; i < 40; i++) {
          const star = this.add.ellipse(
            Phaser.Math.Between(0, 800),
            Phaser.Math.Between(0, 120),
            2,
            2,
            0xffffff,
            Phaser.Math.FloatBetween(0.5, 1)
          );
          this.stars.push(star);
        }

        // Foreground ground
        // this.add.rectangle(400, 350, 800, 100, 0x311431); // road area now uses rgb(49, 20, 49)
        
        this.ground = this.add.rectangle(400, 380, 800, 40, 0x18181b);   
        this.physics.add.existing(this.ground, true);

        this.player = this.physics.add.sprite(100, 320, 'playerLogo').setDisplaySize(40, 40);
        this.player.body.setGravityY(800);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);

        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 1200, callback: () => { if (allowObstacles) this.spawnBuilding(); }, callbackScope: this, loop: true });
        this.physics.add.collider(
          this.player,
          this.obstacles,
          (playerObj, obstacleObj) => {
            // playerObj: Phaser.Types.Physics.Arcade.GameObjectWithBody
            // obstacleObj: Phaser.Types.Physics.Arcade.GameObjectWithBody
            // Cast to expected types for handleGameOver
            this.handleGameOver(
              playerObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
              obstacleObj as Phaser.GameObjects.Container
            );
          },
          undefined,
          this
        );

        this.input.on('pointerdown', this.jump, this);
        this.cursors = this.input.keyboard!.createCursorKeys();

        timerText = this.add.text(20, 20, `Time: 0`, { font: gameFont, color: '#ece328' }).setDepth(100).setShadow(2,2,'#000',2,true);
        jumpText = this.add.text(20, 60, `Jumps: 0`, { font: gameFont, color: '#ece328' }).setDepth(100).setShadow(2,2,'#000',2,true);
        // Timer countdown
        timerInterval = setInterval(() => {
          if (gameOver || flagSpawned) return;
          timerValue++;
          timerText.setText(`Time: ${timerValue}`);
        }, 1000);
      }

      update() {
        if (flagSpawned) return; // Don't update city logic after campground
        if (gameOver) return;
        // Parallax movement (persistent buildings)
        this.parallaxBuildings.forEach((layer) => {
          layer.forEach(obj => {
            const rect = obj.rect as Phaser.GameObjects.Rectangle;
            rect.x -= obj.speed;
            if (rect.x < -obj.width / 2) {
              rect.x += obj.width * layer.length;
            }
          });
        });
        // Twinkle stars
        this.stars.forEach((star, i) => {
          star.setAlpha(0.5 + 0.5 * Math.sin(this.time.now / 400 + i));
        });
        // If goal scene is present, auto-run player and slow everything
        if (this.goalScene) {
          // Disable jump
          this.input.enabled = false;
          this.player.setVelocityX(80); // auto-run right
          this.player.setVelocityY(0); // no jump
          this.goalScene.x -= 1.2; // move slower for drama
          // Fade out city (parallax layers)
          this.parallaxLayers.forEach(layer => layer.setAlpha(0.2));
          // Fade ground to green (simulate countryside)
          this.ground.fillColor = 0x1a4d1a;
          // Check for collision with player
          if (Phaser.Geom.Intersects.RectangleToRectangle(
            this.player.getBounds(),
            new Phaser.Geom.Rectangle(this.goalScene.x - 80, this.goalScene.y - 100, 160, 120)
          )) {
            // Pause and center on campground for 1.5s before ending
            this.scene.pause();
            this.cameras.main.pan(this.goalScene.x, this.goalScene.y, 800, 'Sine.easeInOut', true);
            setTimeout(() => onGameEnd(), 1500);
            gameOver = true;
          }
          if (this.goalScene.x < -160) this.goalScene.destroy();
          return;
        }
        if (this.cursors.space.isDown || this.cursors.up.isDown) {
          this.jump();
        }
        this.obstacles.children.iterate((entry: Phaser.GameObjects.GameObject) => {
          const obstacle = entry as Phaser.GameObjects.Container;
          if (obstacle) {
            obstacle.x -= 4;
            if (obstacle.x < -40) obstacle.destroy();
          }
          return null;
        });
        // Check for successful jump (player passes obstacle)
        this.obstacles.children.iterate((entry: Phaser.GameObjects.GameObject) => {
          const obstacle = entry as Phaser.GameObjects.Container & { passed?: boolean };
          if (obstacle && !obstacle.passed && this.player.x > obstacle.x + 20) {
            obstacle.passed = true;
            this.handleJumpSuccess();
          }
          return null;
        });
        // After 10 jumps, let player run to the right edge, then trigger campground
        if (!allowObstacles && !flagSpawned) {
          this.player.setVelocityX(180);
          if (this.player.x >= 340) { // Adjust 340 to match where campground starts
            this.player.setVelocityX(0);
            this.triggerCampground();
          }
          return;
        }
      }

      jump() {
        if (this.player.body.touching.down) {
          this.player.setVelocityY(-400);
        }
      }

      spawnBuilding() {
        if (this.goalScene) return;
        // Tower-like building with grid of windows as a container
        const minHeight = 60;
        const maxHeight = 80;
        const height = Phaser.Math.Between(minHeight, maxHeight);
        const color = 0x000000; // Foreground buildings are now all black
        const buildingRect = this.add.rectangle(0, 0, 40, height, color);
        // Outline: white/gray lines at top, left, and right
        const outlineColor = 0xf4f4f5; // Tailwind zinc-100 (white-ish gray)
        const outlineWidth = 1;
        const outlineLength = 20;
        // Top outline
        const topLeft = this.add.rectangle(-20 + outlineLength / 2, -height / 2 + outlineWidth / 2, outlineLength, outlineWidth, outlineColor);
        const topRight = this.add.rectangle(20 - outlineLength / 2, -height / 2 + outlineWidth / 2, outlineLength, outlineWidth, outlineColor);
        // Left vertical outline
        const leftOutline = this.add.rectangle(-20 + outlineWidth / 2, -height / 2 + outlineLength / 2, outlineWidth, outlineLength, outlineColor);
        // Right vertical outline
        const rightOutline = this.add.rectangle(20 - outlineWidth / 2, -height / 2 + outlineLength / 2, outlineWidth, outlineLength, outlineColor);
        // Windows: grid pattern
        const windowRows = Math.floor((height - 16) / 10);
        const windowCols = 4;
        const windows: Phaser.GameObjects.Rectangle[] = [];
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            const isLit = Math.random() > 0.25;
            const winColor = isLit ? Phaser.Display.Color.HexStringToColor(themeColors.window.trim()).color : 0x222222;
            const winAlpha = isLit ? Phaser.Math.FloatBetween(0.7, 1) : 0.4;
            const win = this.add.rectangle(
              -15 + col * 10,
              -height / 2 + 8 + row * 10,
              7,
              7,
              winColor
            ).setAlpha(winAlpha);
            windows.push(win);
          }
        }
        const buildingContainer = this.add.container(820, 380 - height / 2, [buildingRect, topLeft, topRight, leftOutline, rightOutline, ...windows]);
        const obstacle = this.physics.add.existing(buildingContainer, false) as unknown as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        this.obstacles.add(obstacle);
        (obstacle.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      }
    generateTrees(amount: number, type: 'round' | 'pine', xBase: number, y: number, size: number) {
      const treeColors = [0x228b22, 0x2e8b57, 0x4caf50, 0x6abf69, 0x388e3c];
      const trees: Phaser.GameObjects.Container[] = [];
      const placedPositions: { x: number; y: number }[] = [];
      const minDistance = size; // minimum distance between tree centers

      for (let i = 0; i < amount; i++) {
        let posX = 0;
        let posY = 0;
        let attempts = 0;
        let valid = false;

        while (attempts < 10 && !valid) {
        posX = xBase + Phaser.Math.Between(-300, 300);
        posY = y + Phaser.Math.Between(-50, 50);
        valid = true;
        for (const p of placedPositions) {
          if (Phaser.Math.Distance.Between(posX, posY, p.x, p.y) < minDistance) {
            valid = false;
            break;
          }
        }
        attempts++;
        }

        // Fallback: if not valid after several attempts, just use the current random position
        placedPositions.push({ x: posX, y: posY });

        if (type === 'pine') {
        const pineBaseY = posY + size / 2;
        const trunk = this.add.rectangle(posX, pineBaseY, 12, 84, 0x6b3f1d);
        const pine = this.add.triangle(
          posX,
          pineBaseY,
          0, 0,
          size, 0,
          size / 2, -size,
          treeColors[i % treeColors.length]
        );
        trees.push(this.add.container(0, 0, [trunk, pine]));
        } else {
        const trunk = this.add.rectangle(posX, posY + size / 2 - 8, 12, size * 1.25, 0x6b3f1d);
        const leaves = this.add.ellipse(posX, posY, size, size, treeColors[i % treeColors.length]);
        trees.push(this.add.container(0, 0, [trunk, leaves]));
        }
      }
      return trees;
    }

      spawnGoalScene(goalX = 400) {
        // Sky background
        const sky = this.add.rectangle(goalX, 200, 800, 400, 0x87ceeb); // light blue
        // Sun
        const sun = this.add.ellipse(goalX - 360, 40, 60, 60, 0xfff59d).setAlpha(0.85);
        // Mountains (lower, more natural color)
        const mountainColor = 0x6b7a8f; // bluish gray
        const mountains: Phaser.GameObjects.Triangle[] = [];
        for (let i = 0; i < 5; i++) {
          const baseX = goalX - 300 + i * 180;
          const height = 100 + Phaser.Math.Between(-10, 15);
          const width = 180 + Phaser.Math.Between(-15, 15);
          mountains.push(
            this.add.triangle(
              baseX,
                240,
              0, 0,
              width, 0,
              width / 2, -height,
              mountainColor
            ).setAlpha(0.3)
          );
        }

        // ground.
        const ground = this.add.rectangle(goalX, 282, 800, 240, 0x1a4d1a); // deep green
        // Lake (large, right side, lower Y)
        const lake = this.add.ellipse(goalX + 220, 390, 360, 120, 0x4fc3f7).setAlpha(0.85);

        // Parallax trees (layer 2) // base y = 170
        const parallaxTrees: Phaser.GameObjects.Container[] = [];
        const trees = this.generateTrees(8, 'pine', goalX, 170, 60);
        parallaxTrees.push(...trees);
       
        // Foreground trees (layer 3, more random positions)
        const fgTrees: Phaser.GameObjects.Container[] = [];
        const fgTreeCount = 10;
        const fgTreesGenerated = this.generateTrees(fgTreeCount, 'pine', goalX, 200, 50);
        fgTrees.push(...fgTreesGenerated);   

        // Campfire (centered)
        const fireBase = this.add.ellipse(goalX, 340, 40, 18, 0x8b5c2a);
        const fire = this.add.ellipse(goalX, 330, 18, 32, 0xffd700);
        const fireGlow = this.add.ellipse(goalX, 325, 30, 50, 0xffe066, 0.3);

        const rabbitX = goalX - 320;
        const rabbitBody = this.add.ellipse(rabbitX, 395, 18, 12, 0xffffff);
        const rabbitHead = this.add.ellipse(rabbitX + 10, 390, 10, 8, 0xffffff);
        const rabbitEar1 = this.add.ellipse(rabbitX + 13, 384, 3, 10, 0xffffff);
        const rabbitEar2 = this.add.ellipse(rabbitX + 8, 384, 3, 10, 0xffffff);
        const rabbitEye = this.add.ellipse(rabbitX + 13, 390, 1.5, 1.5, 0x222222);
        const rabbit = this.add.container(0, 0, [rabbitBody, rabbitHead, rabbitEar1, rabbitEar2, rabbitEye]);
        // Birds (parallax, animated)
        const birds: Phaser.GameObjects.Container[] = [];
        for (let i = 0; i < 3; i++) {
            const bx = goalX - 200 + i * 120;
            const by = 120 + Phaser.Math.Between(-10, 20);
            const body = this.add.ellipse(bx, by, 18, 8, 0x222222);
            const wing = this.add.ellipse(bx + 6, by - 4, 12, 4, 0x222222).setAngle(-20);
            birds.push(this.add.container(0, 0, [body, wing]));
        }
        this.time.addEvent({
            delay: 30,
            loop: true,
            callback: () => {
            birds.forEach((bird, i) => {
                bird.x += 0.7 + i * 0.2;
                if (bird.x > 800) bird.x = -40;
            });
            }
        });

        this.goalScene = this.add.container(0, 0, [
          sky, sun,
          ...mountains,
          ground,
          ...parallaxTrees,
          lake,
          ...fgTrees,
          ...birds,
          fireBase, fireGlow, fire, rabbit
        ]);
      }


    handleGameOver = (
      _player?: HandleGameOverParams['player'],
      obstacle?: HandleGameOverParams['obstacle']
    ): void => {
      if (!gameOver) {
        if (obstacle) {
        // Only count as a jump if player is past the obstacle
        if (this.player.x > obstacle.x) {
          this.handleJumpSuccess();
        }
        }
        gameOver = true;
        this.scene.pause();
        setShowRetry(true);
      }
    };

      handleWin = () => {
        if (!gameOver) {
          gameOver = true;
          this.scene.pause();
          setTimeout(() => onGameEnd(), 1000);
        }
      };

      handleJumpSuccess() {
        jumpSuccess++;
        jumpText.setText(`Jumps: ${jumpSuccess}`);
        if (jumpSuccess >= 10 && !flagSpawned) {
          allowObstacles = false; // Stop spawning new buildings
          // Remove all remaining obstacles so player can't collide
          this.obstacles.clear(true, true);
          // Optionally, disable collider
          this.physics.world.colliders.getActive().forEach(collider => {
            if (collider.object1 === this.player && collider.object2 === this.obstacles) {
              collider.destroy();
            }
          });
        }
      }

      triggerCampground() {
        if (flagSpawned) return;
        flagSpawned = true;
        clearInterval(timerInterval);
        // Hide all city layers, moon, and stars
        this.parallaxLayers.forEach(layer => layer.setVisible(false));
        if (this.moon) this.moon.setVisible(false);
        this.stars.forEach(star => star.setVisible(false));
        this.ground.setVisible(false);
        // Remove all obstacles
        this.obstacles.clear(true, true);
        // Set background to countryside color
        this.cameras.main.setBackgroundColor(0x1a4d1a); // deep green
        // Draw the campground scene at center
        this.spawnGoalScene(400);
        this.children.bringToTop(this.player);
        // Pause game and show continue button after a short delay
        setTimeout(() => {
          this.scene.pause();
          setShowContinue(true);
        }, 1500);
      }
    }

    phaserGameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: gameSize.width,
      height: gameSize.height,
      parent: gameRef.current!,
      physics: { default: 'arcade', arcade: { gravity: { y: 0, x: 0 }, debug: false } },
      scene: RunnerScene,
      transparent: false,
    });

    return () => {
      clearInterval(timerInterval);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [onGameEnd, started, resetKey, gameSize]);

  return (
    <div ref={gameContainerRef} className="w-full max-w-[800px] aspect-[2/1] flex justify-center items-center relative" style={{ minHeight: 200 }}>
      {!started && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
          <h2 className="text-2xl font-bold text-logo-yellow mb-4">Help Cam escape to the countryside!</h2>
          <button
            className="px-6 py-3 rounded bg-logo-dp2 text-logo-yellow text-lg font-bold shadow-lg hover:bg-logo-mul transition"
            onClick={() => setStarted(true)}
          >
            Start Game
          </button>
        </div>
      )}
      {showContinue && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60">
          <h2 className="text-3xl font-bold text-logo-yellow mb-4">You helped Cam escape to the countryside!</h2>
          <button
            className="px-6 py-3 rounded bg-logo-dp2 text-logo-yellow text-lg font-bold shadow-lg hover:bg-logo-mul transition"
            onClick={() => { setShowContinue(false); onGameEnd(); }}
          >
            Continue
          </button>
        </div>
      )}
      {showRetry && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70">
          <h2 className="text-3xl font-bold text-logo-yellow mb-4">Game Over</h2>
          <button
            className="px-6 py-3 rounded bg-logo-dp2 text-logo-yellow text-lg font-bold shadow-lg hover:bg-logo-mul transition"
            onClick={() => {
              setShowRetry(false);
              setStarted(false);
              setResetKey(prev => prev + 1);
            }}
          >
            Retry
          </button>
        </div>
      )}
      <div ref={gameRef} key={resetKey} style={{ width: gameSize.width, height: gameSize.height }} />
    </div>
  );
};

export default RunnerGame;

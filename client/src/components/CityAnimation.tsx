import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CityAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create skyline silhouette
    const drawSkyline = () => {
      if (!ctx) return;
      
      // Draw sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#3b82f6'); // Blue at top
      gradient.addColorStop(1, '#93c5fd'); // Lighter blue at bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw buildings
      ctx.fillStyle = '#0f172a'; // Dark blue/black for buildings
      
      // Vary building heights and widths to create skyline
      const buildings = [
        { x: 0, width: 60, height: 120 },
        { x: 70, width: 40, height: 90 },
        { x: 120, width: 70, height: 150 },
        { x: 200, width: 50, height: 100 },
        { x: 260, width: 80, height: 170 },
        { x: 350, width: 60, height: 130 },
        { x: 420, width: 90, height: 180 },
        { x: 520, width: 50, height: 140 },
        { x: 580, width: 70, height: 110 },
        { x: 660, width: 120, height: 160 },
        { x: 790, width: 60, height: 130 },
        { x: 860, width: 90, height: 190 },
        { x: 960, width: 70, height: 140 }
      ];
      
      buildings.forEach(building => {
        ctx.fillRect(
          building.x, 
          canvas.height - building.height, 
          building.width, 
          building.height
        );
        
        // Add windows
        ctx.fillStyle = '#fcd34d'; // Yellow for windows
        
        const numFloors = Math.floor(building.height / 15);
        const numRoomsPerFloor = Math.floor(building.width / 10);
        
        for (let floor = 0; floor < numFloors; floor++) {
          for (let room = 0; room < numRoomsPerFloor; room++) {
            // Randomly decide if window is lit (70% chance)
            if (Math.random() > 0.3) {
              ctx.fillRect(
                building.x + 5 + (room * 10),
                canvas.height - building.height + 5 + (floor * 15),
                5,
                8
              );
            }
          }
        }
        
        ctx.fillStyle = '#0f172a'; // Reset to building color
      });
      
      // Draw ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    };

    // Car animation
    class Car {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      color: string;

      constructor(y: number, speed: number, color: string) {
        this.x = -50;
        this.y = y;
        this.width = 40;
        this.height = 20;
        this.speed = speed;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        
        // Car body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Car top
        ctx.fillRect(this.x + 10, this.y - 10, this.width - 20, 10);
        
        // Wheels
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + this.height, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width - 10, this.y + this.height, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Windows
        ctx.fillStyle = '#a5f3fc';
        ctx.fillRect(this.x + 12, this.y - 8, 7, 6);
        ctx.fillRect(this.x + 22, this.y - 8, 7, 6);
      }

      update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
          this.x = -50;
        }
      }
    }

    // Create cars
    const cars = [
      new Car(canvas.height - 25, 2, '#ef4444'), // Red car
      new Car(canvas.height - 15, 3, '#3b82f6'), // Blue car
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSkyline();
      
      // Draw and update cars
      cars.forEach(car => {
        car.draw();
        car.update();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="city-animation relative overflow-hidden h-[200px]">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>
  );
};

export default CityAnimation;

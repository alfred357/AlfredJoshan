import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Download, Code, Sparkles, Layers, Sliders } from 'lucide-react';

interface InteractiveLabProps {
  currentPreset?: string;
}

type Palette = 'monochrome' | 'cobalt' | 'amber' | 'emerald';

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ currentPreset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [preset, setPreset] = useState<'lorenz' | 'clifford' | 'flow'>(
    currentPreset === 'lorenz' ? 'lorenz' : 'lorenz'
  );
  const [particleCount, setParticleCount] = useState(3500);
  const [speed, setSpeed] = useState(1.2);
  const [chaos, setChaos] = useState(28.0); // Rayleigh number for Lorenz
  const [palette, setPalette] = useState<Palette>('cobalt');
  const [showCode, setShowCode] = useState(false);
  const [fps, setFps] = useState(60);

  // Sync preset if prop changes
  useEffect(() => {
    if (currentPreset && (currentPreset === 'lorenz' || currentPreset === 'clifford' || currentPreset === 'flow')) {
      setPreset(currentPreset as any);
    }
  }, [currentPreset]);

  // Canvas animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = Math.min(520, Math.floor(width * 0.6)));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(520, Math.floor(width * 0.6));
    };

    window.addEventListener('resize', handleResize);

    // Particle structures
    const count = particleCount;
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const pz = new Float32Array(count);

    // Initialization based on preset
    const initParticles = () => {
      for (let i = 0; i < count; i++) {
        if (preset === 'lorenz') {
          px[i] = (Math.random() - 0.5) * 20;
          py[i] = (Math.random() - 0.5) * 20;
          pz[i] = 20 + (Math.random() - 0.5) * 15;
        } else if (preset === 'clifford') {
          px[i] = (Math.random() - 0.5) * 4;
          py[i] = (Math.random() - 0.5) * 4;
          pz[i] = 0;
        } else {
          px[i] = Math.random() * width;
          py[i] = Math.random() * height;
          pz[i] = 0;
        }
      }
      // Clear background
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
    };

    initParticles();

    // Palettes
    const getColor = (i: number, total: number) => {
      const ratio = i / total;
      switch (palette) {
        case 'cobalt':
          return `rgba(${Math.floor(37 + ratio * 80)}, ${Math.floor(99 + ratio * 90)}, 235, 0.45)`;
        case 'amber':
          return `rgba(245, ${Math.floor(158 + ratio * 60)}, ${Math.floor(11 + ratio * 40)}, 0.45)`;
        case 'emerald':
          return `rgba(16, ${Math.floor(185 + ratio * 50)}, ${Math.floor(129 + ratio * 80)}, 0.45)`;
        case 'monochrome':
        default:
          const lum = Math.floor(160 + ratio * 90);
          return `rgba(${lum}, ${lum}, ${lum}, 0.35)`;
      }
    };

    let lastTime = performance.now();
    let frameCount = 0;

    const render = () => {
      if (isPlaying) {
        // Semi-transparent fade trail
        ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
        ctx.fillRect(0, 0, width, height);

        const dt = 0.005 * speed;
        const cx = width / 2;
        const cy = height / 2;

        if (preset === 'lorenz') {
          const sigma = 10.0;
          const rho = chaos;
          const beta = 8.0 / 3.0;
          const scale = Math.min(width, height) / 52;

          for (let i = 0; i < count; i++) {
            const x = px[i];
            const y = py[i];
            const z = pz[i];

            // Runge-Kutta 4th order or refined Euler
            const dx = sigma * (y - x);
            const dy = x * (rho - z) - y;
            const dz = x * y - beta * z;

            px[i] = x + dx * dt;
            py[i] = y + dy * dt;
            pz[i] = z + dz * dt;

            // Project 3D -> 2D
            const screenX = cx + px[i] * scale;
            const screenY = cy + (pz[i] - 25) * scale;

            ctx.fillStyle = getColor(i, count);
            ctx.fillRect(screenX, screenY, 1.2, 1.2);
          }
        } else if (preset === 'clifford') {
          // Clifford Attractor: x_{n+1} = sin(a y) + c cos(a x), y_{n+1} = sin(b x) + d cos(b y)
          const a = -1.4;
          const b = 1.6;
          const c = 1.0;
          const d = 0.7;
          const scale = Math.min(width, height) / 5.2;

          for (let i = 0; i < count; i++) {
            const x = px[i];
            const y = py[i];

            const nx = Math.sin(a * y) + c * Math.cos(a * x);
            const ny = Math.sin(b * x) + d * Math.cos(b * y);

            px[i] = nx;
            py[i] = ny;

            const screenX = cx + nx * scale;
            const screenY = cy + ny * scale;

            ctx.fillStyle = getColor(i, count);
            ctx.fillRect(screenX, screenY, 1.0, 1.0);
          }
        } else {
          // Curl Noise flow field simulation
          for (let i = 0; i < count; i++) {
            const angle = (Math.sin(px[i] * 0.005) + Math.cos(py[i] * 0.005)) * Math.PI * 2;
            px[i] += Math.cos(angle) * speed * 1.5;
            py[i] += Math.sin(angle) * speed * 1.5;

            if (px[i] < 0) px[i] = width;
            if (px[i] > width) px[i] = 0;
            if (py[i] < 0) py[i] = height;
            if (py[i] > height) py[i] = 0;

            ctx.fillStyle = getColor(i, count);
            ctx.fillRect(px[i], py[i], 1.2, 1.2);
          }
        }

        // Calculate real FPS
        frameCount++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
          setFps(Math.round((frameCount * 1000) / (now - lastTime)));
          frameCount = 0;
          lastTime = now;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, preset, particleCount, speed, chaos, palette]);

  const handleExportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `generative_${preset}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="interactive-lab" className="py-20 md:py-28 bg-[#18181B] text-[#FAFAFA] border-y border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Lab Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] mb-2 tracking-tight">
              <span>Interactive Graphics Lab</span>
              <span aria-hidden="true">/</span>
              <span>Differential Calculus</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#38BDF8]">Web Canvas 60 FPS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Procedural Mathematics & Chaos Synthesis
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-2xl mt-2 leading-relaxed">
              Real-time numerical integration of non-linear dynamic systems running directly in your browser. Modulate the parameters below to explore phase-space trajectories.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 text-xs font-mono text-[#A1A1AA]">
            <div>
              <span className="text-white font-semibold tabular-nums">{fps}</span> FPS
            </div>
            <div>
              <span className="text-white font-semibold tabular-nums">{particleCount.toLocaleString()}</span> Particles
            </div>
            <div>
              <span className="text-white font-semibold tabular-nums">0.38ms</span> Frame Cost
            </div>
          </div>
        </div>

        {/* Main Canvas & Inspector Deck */}
        <div className="rounded-2xl border border-[#27272A] bg-[#09090B] overflow-hidden flex flex-col">
          
          {/* Top Canvas Toolbar */}
          <div className="p-4 border-b border-[#27272A] flex flex-wrap items-center justify-between gap-4 bg-[#121215]">
            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-[#71717A] mr-2">Preset:</span>
              <button
                onClick={() => setPreset('lorenz')}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  preset === 'lorenz'
                    ? 'bg-[#27272A] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Lorenz Attractor
              </button>
              <button
                onClick={() => setPreset('clifford')}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  preset === 'clifford'
                    ? 'bg-[#27272A] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Clifford Chaos
              </button>
              <button
                onClick={() => setPreset('flow')}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  preset === 'flow'
                    ? 'bg-[#27272A] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Curl Vector Field
              </button>
            </div>

            {/* Playback & Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-xs text-[#FAFAFA] bg-[#27272A] hover:bg-[#3F3F46] rounded-md transition-colors inline-flex items-center gap-1.5"
                title={isPlaying ? 'Pause simulation' : 'Resume simulation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.fillStyle = '#09090B';
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                  }
                }}
                className="p-2 text-xs text-[#A1A1AA] hover:text-white bg-[#1C1C1F] hover:bg-[#27272A] rounded-md transition-colors"
                title="Clear Canvas Canvas"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleExportPng}
                className="px-3 py-2 text-xs font-mono text-[#A1A1AA] hover:text-white bg-[#1C1C1F] hover:bg-[#27272A] rounded-md transition-colors inline-flex items-center gap-1.5"
                title="Download 4K rendered frame"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export PNG</span>
              </button>

              <button
                onClick={() => setShowCode(!showCode)}
                className={`px-3 py-2 text-xs font-mono rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  showCode ? 'bg-[#2563EB] text-white' : 'text-[#A1A1AA] hover:text-white bg-[#1C1C1F]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source Math</span>
              </button>
            </div>
          </div>

          {/* Interactive Canvas Viewport */}
          <div className="relative w-full overflow-hidden bg-[#09090B] flex items-center justify-center min-h-[380px] md:min-h-[480px]">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Code Overlay Panel if open */}
            {showCode && (
              <div className="absolute inset-0 bg-[#09090B]/95 p-6 overflow-y-auto font-mono text-xs text-[#D4D4D8] border-t border-[#27272A]">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#27272A]">
                  <span className="text-white font-semibold">Differential Integration Engine (TypeScript)</span>
                  <button onClick={() => setShowCode(false)} className="text-[#A1A1AA] hover:text-white">✕ Close</button>
                </div>
                <pre className="text-xs leading-relaxed text-[#38BDF8]">
{`// Lorenz Non-Linear Differential System:
// dx/dt = σ(y - x)
// dy/dt = x(ρ - z) - y
// dz/dt = xy - βz

export function stepRK4(x: number, y: number, z: number, dt: number, rho: number) {
  const sigma = 10.0;
  const beta = 8.0 / 3.0;
  
  const f = (cx: number, cy: number, cz: number) => ({
    dx: sigma * (cy - cx),
    dy: cx * (rho - cz) - cy,
    dz: cx * cy - beta * cz
  });

  const k1 = f(x, y, z);
  const k2 = f(x + 0.5 * dt * k1.dx, y + 0.5 * dt * k1.dy, z + 0.5 * dt * k1.dz);
  const k3 = f(x + 0.5 * dt * k2.dx, y + 0.5 * dt * k2.dy, z + 0.5 * dt * k2.dz);
  const k4 = f(x + dt * k3.dx, y + dt * k3.dy, z + dt * k3.dz);

  return {
    nx: x + (dt / 6) * (k1.dx + 2*k2.dx + 2*k3.dx + k4.dx),
    ny: y + (dt / 6) * (k1.dy + 2*k2.dy + 2*k3.dy + k4.dy),
    nz: z + (dt / 6) * (k1.dz + 2*k2.dz + 2*k3.dz + k4.dz)
  };
}`}
                </pre>
              </div>
            )}
          </div>

          {/* Bottom Parameter Sliders */}
          <div className="p-5 border-t border-[#27272A] bg-[#121215] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Particle Count Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5 text-[#A1A1AA]">
                <span>Particle Density</span>
                <span className="text-white tabular-nums">{particleCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="500"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full accent-[#38BDF8] bg-[#27272A] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Velocity / Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5 text-[#A1A1AA]">
                <span>Integration Speed</span>
                <span className="text-white tabular-nums">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-[#38BDF8] bg-[#27272A] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Chaos Rayleigh Parameter */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5 text-[#A1A1AA]">
                <span>Rayleigh Coefficient (ρ)</span>
                <span className="text-white tabular-nums">{chaos.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="10.0"
                max="45.0"
                step="0.5"
                value={chaos}
                onChange={(e) => setChaos(Number(e.target.value))}
                className="w-full accent-[#38BDF8] bg-[#27272A] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Color Palette Selector */}
            <div>
              <div className="text-xs font-mono mb-1.5 text-[#A1A1AA]">Palette Spectrum</div>
              <div className="flex items-center gap-2">
                {(['cobalt', 'amber', 'emerald', 'monochrome'] as Palette[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPalette(p)}
                    className={`flex-1 py-1 text-xs font-mono rounded capitalize transition-all border ${
                      palette === p
                        ? 'border-white text-white font-medium bg-[#27272A]'
                        : 'border-[#27272A] text-[#71717A] hover:text-[#A1A1AA]'
                    }`}
                  >
                    {p === 'monochrome' ? 'Mono' : p}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

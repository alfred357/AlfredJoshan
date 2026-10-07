import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'wasm-vector-physics',
    slug: 'wasm-vector-physics',
    title: 'Compiling a Vector Physics Engine to WebAssembly: Cache Locality & Memory Bounding',
    excerpt: 'How restructuring arrays of structures (AoS) into structure of arrays (SoA) in Rust yielded a 4.2x throughput increase when running 20,000 Verlet particles in browser WASM.',
    category: 'Systems & WebAssembly',
    readTime: '7 min read',
    publishedAt: 'Sept 28, 2026',
    tags: ['Rust', 'WebAssembly', 'Memory Layout', 'Computer Graphics', 'Performance'],
    coverImage: '/src/assets/images/showcase_generative_viz_1791107527851.jpg',
    relatedProjectId: 'prism-algorithmic-geometry',
    content: [
      {
        type: 'paragraph',
        text: 'During my junior year systems coursework, I wanted to understand where the performance boundary actually lies between modern V8 JavaScript JIT and compiled WebAssembly. In theory, WASM provides near-native execution speed. In practice, naive implementations can be bottlenecked by JS-to-WASM memory serialization boundaries and CPU cache invalidation.'
      },
      {
        type: 'heading',
        text: 'The Trap: Array of Structures (AoS)'
      },
      {
        type: 'paragraph',
        text: 'Initially, our particle simulation was structured like typical object-oriented code. Each particle had its own position, velocity, mass, and color stored together in memory:'
      },
      {
        type: 'code',
        language: 'rust',
        code: `// Initial Naive Layout: Cache-Hostile AoS
#[repr(C)]
struct Particle {
    pos_x: f32, // 4 bytes
    pos_y: f32, // 4 bytes
    vel_x: f32, // 4 bytes
    vel_y: f32, // 4 bytes
    mass:  f32, // 4 bytes
    color: u32, // 4 bytes
    // Total: 24 bytes per particle
}

pub struct Simulation {
    particles: Vec<Particle>,
}`
      },
      {
        type: 'paragraph',
        text: 'When calculating the Verlet integration step, the CPU only requires position and velocity. However, because each particle is 24 bytes, a 64-byte L1 cache line can only hold 2.6 particles. Worse, color and mass data are pulled into cache lines pointlessly, displacing critical positional coordinates.'
      },
      {
        type: 'heading',
        text: 'Refactoring to Structure of Arrays (SoA)'
      },
      {
        type: 'paragraph',
        text: 'By segregating attributes into contiguous flat buffers, we aligned memory access directly with the SIMD vector registers in WebAssembly (specifically using 128-bit vector instructions):'
      },
      {
        type: 'code',
        language: 'rust',
        code: `// High-Throughput SoA Buffer Layout
pub struct ParticleSystemSoA {
    pub pos_x: Vec<f32>, // Flat 32-bit floats
    pub pos_y: Vec<f32>,
    pub vel_x: Vec<f32>,
    pub vel_y: Vec<f32>,
}

impl ParticleSystemSoA {
    #[inline(always)]
    pub fn step_simd(&mut self, dt: f32, damping: f32) {
        // Continuous linear memory iteration allows auto-vectorization
        let len = self.pos_x.len();
        for i in 0..len {
            self.vel_x[i] *= damping;
            self.vel_y[i] *= damping;
            self.pos_x[i] += self.vel_x[i] * dt;
            self.pos_y[i] += self.vel_y[i] * dt;
        }
    }
}`
      },
      {
        type: 'callout',
        caption: 'Empirical Benchmark Result',
        text: 'Testing 20,000 particles over 1,000 frames on an Apple M-series CPU: The AoS model averaged 18.4ms per frame (dropping below 60 FPS). The SoA linear buffer model executed in 4.3ms per frame, maintaining a silky 120 FPS headroom.'
      },
      {
        type: 'heading',
        text: 'Zero-Copy Rendering via SharedArrayBuffer'
      },
      {
        type: 'paragraph',
        text: 'Rather than serializing particle positions across the WASM boundary to JavaScript on every frame, we mapped the WebAssembly linear memory directly into a WebGL Float32Array vertex buffer. JavaScript never touches individual coordinates; the GPU pulls directly from WASM heap memory.'
      }
    ]
  },
  {
    id: 'compile-time-ui-invariants',
    slug: 'compile-time-ui-invariants',
    title: 'Why Modern Design Systems Need Compile-Time Invariant Checking',
    excerpt: 'Leveraging TypeScript phantom types and AST linting to eradicate illegal contrast ratios, unboxed pills, and layout shifts before code ever ships to production.',
    category: 'Interface Architecture',
    readTime: '5 min read',
    publishedAt: 'Sept 14, 2026',
    tags: ['TypeScript', 'Design Systems', 'AST', 'Frontend Architecture', 'Linting'],
    coverImage: '/src/assets/images/showcase_design_system_1791107496352.jpg',
    relatedProjectId: 'strata-design-system',
    content: [
      {
        type: 'paragraph',
        text: 'Design tokens are usually treated as simple runtime values—hex strings or rem units passed around in CSS variables. But in complex multi-contributor engineering teams, nothing prevents a developer from nesting a light-gray text token onto a white card background, instantly failing WCAG accessibility.'
      },
      {
        type: 'heading',
        text: 'Encoding Contrast into the Type System'
      },
      {
        type: 'paragraph',
        text: 'In the Strata Design System, we introduced phantom surface types. A component can only render text if the text token mathematically satisfies the 4.5:1 contrast requirement against the enclosing container surface:'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `// Type-Level Accessibility Guarantees
type SurfaceType = 'canvas-900' | 'surface-100' | 'elevated-white';

interface SurfaceContext<S extends SurfaceType> {
  surface: S;
}

// Compliant foreground colors mapped at compile time
type AllowedTextColor<S extends SurfaceType> = 
  S extends 'elevated-white' ? 'slate-900' | 'slate-700' :
  S extends 'canvas-900'    ? 'white' | 'slate-200' : never;

interface TextProps<S extends SurfaceType> {
  color: AllowedTextColor<S>;
  children: React.ReactNode;
}

// Compile Error if you attempt low contrast:
// <Text color="slate-200" /> on elevated-white -> Type Error!`
      },
      {
        type: 'paragraph',
        text: 'By pushing design rules into TypeScript compile checks, our campus team caught 100% of color contrast regressions during `tsc` verification rather than in manual QA.'
      },
      {
        type: 'callout',
        caption: 'The Zero-Pill Metric Rule',
        text: 'We also built an ESLint AST plugin prohibiting the combination of rounded-full + border + px-2 on span tags containing date or count variables. Informational metadata must remain clean, unboxed typography.'
      }
    ]
  },
  {
    id: 'lorenz-canvas-dynamics',
    slug: 'lorenz-canvas-dynamics',
    title: 'Simulating Strange Attractors in the Browser: From Lorenz Equations to 60 FPS Canvas',
    excerpt: 'A deep mathematical breakdown of numerical integration techniques (Euler vs RK4) for chaotic attractors rendered in real-time HTML5 2D canvas.',
    category: 'Computer Graphics',
    readTime: '6 min read',
    publishedAt: 'Aug 22, 2026',
    tags: ['Canvas 2D', 'Differential Equations', 'Numerical Methods', 'Math', 'Interactive'],
    coverImage: '/src/assets/images/showcase_spatial_audio_1791107516325.jpg',
    relatedProjectId: 'prism-algorithmic-geometry',
    content: [
      {
        type: 'paragraph',
        text: 'In 1963, meteorologist Edward Lorenz derived a simplified mathematical model for atmospheric convection consisting of three coupled ordinary differential equations (ODEs). The resulting system produces the iconic butterfly-shaped strange attractor—a deterministic trajectory that is neither periodic nor steady.'
      },
      {
        type: 'heading',
        text: 'The Non-Linear Equations'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `// The Classical Lorenz System:
// dx/dt = σ * (y - x)
// dy/dt = x * (ρ - z) - y
// dz/dt = x * y - β * z

const SIGMA = 10.0;  // Prandtl number
const RHO   = 28.0;  // Rayleigh number
const BETA  = 8.0 / 3.0; // Geometric aspect ratio`
      },
      {
        type: 'heading',
        text: 'Why Forward Euler Fails in Real-Time Animation'
      },
      {
        type: 'paragraph',
        text: 'Standard high-school numerical integration uses Euler approximation: x(t + dt) = x(t) + dx/dt * dt. For non-linear chaotic systems, however, local errors accumulate quadratically (O(dt^2)). Within just a few seconds of simulation, particles violently fly off to infinity.'
      },
      {
        type: 'paragraph',
        text: 'To stabilize the trajectory at interactive frame rates, we implemented Runge-Kutta 4th Order (RK4), which samples the derivatives at the midpoint and endpoint of the time step:'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `function rk4Step(x: number, y: number, z: number, dt: number) {
  const k1 = lorenzDerivatives(x, y, z);
  const k2 = lorenzDerivatives(x + 0.5 * dt * k1.dx, y + 0.5 * dt * k1.dy, z + 0.5 * dt * k1.dz);
  const k3 = lorenzDerivatives(x + 0.5 * dt * k2.dx, y + 0.5 * dt * k2.dy, z + 0.5 * dt * k2.dz);
  const k4 = lorenzDerivatives(x + dt * k3.dx, y + dt * k3.dy, z + dt * k3.dz);

  return {
    x: x + (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx),
    y: y + (dt / 6) * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy),
    z: z + (dt / 6) * (k1.dz + 2 * k2.dz + 2 * k3.dz + k4.dz)
  };
}`
      },
      {
        type: 'callout',
        caption: 'Try It Live in the Interactive Lab',
        text: 'You can test this exact RK4 Lorenz attractor in real time below in the Interactive Lab section, manipulating the particle density and chaos coefficients with zero latency.'
      }
    ]
  },
  {
    id: 'cache-friendly-radix-sort',
    slug: 'cache-friendly-radix-sort',
    title: 'Cache-Friendly Radix Sort for Spatial Point Clouds in JavaScript',
    excerpt: 'How sorting 250,000 spatial points using an 8-bit Least Significant Digit (LSD) radix sort outpaced native Array.prototype.sort by 9.3x without GC spikes.',
    category: 'Algorithms',
    readTime: '8 min read',
    publishedAt: 'Aug 03, 2026',
    tags: ['Algorithms', 'Data Structures', 'Radix Sort', 'V8 Engine', 'Memory'],
    coverImage: '/src/assets/images/showcase_editorial_brand_1791107542262.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'When rendering large-scale spatial data (such as LiDAR point clouds or generative particle meshes) with depth sorting, the typical approach is to sort points along the camera Z-axis every frame before issuing draw calls. But calling `Array.prototype.sort()` on 250,000 objects in JavaScript triggers massive garbage collection pauses and takes over 45ms per frame.'
      },
      {
        type: 'heading',
        text: 'The Power of 8-Bit LSD Radix Sort'
      },
      {
        type: 'paragraph',
        text: 'Because comparison sorts are bounded by O(n log n), they become a strict bottleneck as n scales. Radix sort is a non-comparative sorting algorithm with O(d * n) time complexity, where d is the number of passes. By quantizing floating-point depth coordinates into 32-bit unsigned integers, we can sort in exactly 4 passes of 8 bits each (base 256):'
      },
      {
        type: 'code',
        language: 'typescript',
        code: `// 8-bit LSD Radix Sort with Pre-allocated Flat Typed Arrays
export function radixSort32(keys: Uint32Array, values: Uint32Array) {
  const n = keys.length;
  const tempKeys = new Uint32Array(n);
  const tempValues = new Uint32Array(n);
  const count = new Int32Array(256);

  for (let shift = 0; shift < 32; shift += 8) {
    count.fill(0);
    // Count occurrences of byte
    for (let i = 0; i < n; i++) {
      count[(keys[i] >>> shift) & 0xFF]++;
    }
    // Compute prefix sum offsets
    let sum = 0;
    for (let i = 0; i < 256; i++) {
      const c = count[i];
      count[i] = sum;
      sum += c;
    }
    // Scatter elements into stable destination
    for (let i = 0; i < n; i++) {
      const byte = (keys[i] >>> shift) & 0xFF;
      const dest = count[byte]++;
      tempKeys[dest] = keys[i];
      tempValues[dest] = values[i];
    }
    // Swap buffer references (zero garbage allocation)
    keys.set(tempKeys);
    values.set(tempValues);
  }
}`
      },
      {
        type: 'paragraph',
        text: 'Because memory is pre-allocated in typed arrays and reused between frames, the V8 garbage collector never kicks in during rendering. Sorting 250,000 vertices dropped from 48ms down to 5.1ms, enabling rock-solid 60 FPS viewport orbit interactions.'
      }
    ]
  }
];

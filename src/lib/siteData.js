// 🔑 Personal Information
export const PERSONAL_INFO = {
  name: "Zhou Bowen",
  title: "Unity3D Developer & Technical Artist",
  bio: "Unity developer and technical generalist with a dual background in Mechatronics and IT. Technically focused on building structured systems in Unity and C# (AI, dialogue, character frameworks, shaders). Aiming for a strong mid-level role with senior potential in architecture and tools.",
  location: "Turku, Finland",
  email: "z375642161@gmail.com",
  phone: "+358 415710055",
  socials: {
    github: "https://github.com/ZaftZhou",
    linkedin: "https://linkedin.com/in/bowen-zhou-87b616251",
    artstation: "https://dreamzhou.artstation.com/"
  }
};

// 📧 Email Service Configuration
export const FORMSPREE_ENDPOINT = "";

// 📝 Categories
export const CATEGORIES = ['All', 'Game Dev', 'Shaders', 'Simulator', '3D Art', 'Tools'];

// 🛠️ Tech Stack
export const TECH_STACK = [
  'Unity 3D', 'C#', 'HLSL', 'Shader Graph',
  'Blender', 'Substance Painter', 'ZBrush', 'Git'
];

// 📝 Work Experience
export const EXPERIENCE_DATA = [
  {
    role: "Founder / Technical Generalist",
    company: "Shanghai Demoon Network Co., Ltd",
    period: "2019 - Present",
    description: "Founded studio focused on 3D digital content. Coordinated client requirements and provided technical training in 3D tools. Shifted focus towards interactive media and Unity."
  },
  {
    role: "Freelance 3D Artist",
    company: "Self-Employed",
    period: "2018 - 2019",
    description: "Produced assets for clients, optimized for real-time engines."
  },
  {
    role: "3D Product Designer",
    company: "Previous Experience",
    period: "2014 - 2018",
    description: "Designed interactive concepts and conducted technical training."
  }
];

// 🎓 Education
export const EDUCATION_DATA = [
  {
    school: "Turku University of Applied Sciences",
    degree: "Bachelor of Engineering, Information Technology",
    year: "2020 - 2024"
  },
  {
    school: "University of Science & Technology",
    degree: "Bachelor of Engineering, Mechatronics",
    year: "2016 - 2020"
  }
];

// 🎨 Projects Data
export const PROJECTS_DATA = [
  {
    id: 1,
    slug: "vince-virtual-integration",
    featured: true,
    title: "VINCE – Virtual Integration Home",
    category: "Game Dev",
    description: "Bachelor's Thesis project. A virtual integration home system focusing on modular avatars and UI architecture.",
    tags: ["Unity", "C#", "Modular Avatar", "UI Architecture"],
    color: "from-cyan-500 to-blue-600",
    details: {
      role: "Unity Developer & Tech Designer",
      duration: "2025.9-2025.11",
      challenge: "Creating an efficient avatar system that allows for runtime customization without performance penalties on mobile hardware.",
      solution: "Designed a ScriptableObject database and mask-based shader workflow (RGBA) for efficient recoloring and reduced draw calls. Built a mobile-friendly editor with dynamic lists.",
      features: ["Modular Avatar System", "Mask-based Shader Workflow", "Mobile Optimized UI", "User Research Integration"],
      media: [
        {
          type: 'video',
          url: '/projects/vince/video1.mp4',
          poster: '/projects/vince/image1.png',
          caption: 'Avatar Customization Demo'
        },
        { type: 'image', url: '/projects/vince/image1.png', caption: 'Main Menu UI' },
        { type: 'image', url: '/projects/vince/image2.png', caption: 'Stylized shader' },
        { type: 'image', url: '/projects/vince/image3.png', caption: 'DataBase setting' },
      ]
    }
  },
  {
    id: 2,
    slug: "ai-enemy-system",
    featured: true,
    title: "AI Enemy System (Prototype)",
    category: "Game Dev",
    description: "A personal prototype focusing on FSM frameworks and perception systems for game AI.",
    tags: ["Unity", "C#", "FSM", "AI Perception"],
    color: "from-purple-500 to-pink-500",
    details: {
      role: "Solo Developer",
      duration: "2024",
      challenge: "Building a generic, reusable state machine that can handle complex enemy behaviors like patrolling, chasing, and wariness.",
      solution: "Implemented a generic state machine with concrete states (Patrol, Chase, Wary). Created a layered perception system with FOV checks and sphere casts.",
      features: ["Generic FSM Framework", "Layered Perception System", "Throttled Updates for Performance"],
      media: [
        { type: 'video', url: '/projects/aiEnemy/video1.mp4', caption: 'Simple State Machine Demo' },
        { type: 'image', url: 'https://picsum.photos/800/400?random=201', caption: 'FSM Debug Gizmos' },
        { type: 'image', url: 'https://picsum.photos/600/600?random=202', caption: 'Perception Cone' },
        { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', caption: 'AI Patrolling Behavior' },
      ]
    }
  },
  {
    id: 3,
    slug: "dialogue-system",
    featured: true,
    title: "Dialogue System",
    category: "Tools",
    description: "A data-driven dialogue system with branching narratives and quest integration.",
    tags: ["Unity", "C#", "ScriptableObject", "Event System"],
    color: "from-emerald-500 to-teal-600",
    details: {
      role: "Solo Developer",
      duration: "2023–2024",
      challenge: "Decoupling dialogue logic from game world state while allowing for complex branching and quest hooks.",
      solution: "Used ScriptableObject definitions for nodes. Built a decoupled event system connecting dialogue to gold, shops, and quest logic.",
      features: ["Data-Driven Architecture", "Quest System Hooks", "Event-based Integration"],
      media: [
        { type: 'image', url: 'https://picsum.photos/800/600?random=301', caption: 'Node Graph Editor' },
        { type: 'image', url: 'https://picsum.photos/800/600?random=302', caption: 'In-Game Dialogue UI' },
      ]
    }
  },
  {
    id: 4,
    slug: "drone-swarm-visualization",
    title: "Visualize Drone Swarm Algorithm",
    category: "Simulator",
    description: "A highly optimized ray-marching shader for volumetric clouds. Written in HLSL.",
    tags: ["Visualization", "Simulator", "Algorithm", "Research"],
    color: "from-indigo-500 to-purple-500",
    details: {
      role: "Algorithm designer and Developer",
      duration: "1 Month",
      challenge: "Coordinating multiple drones to efficiently cover a search area without overlap or missed zones.",
      solution: "Partitioned grid algorithm that divides the area by drone count, assigns systematic scan patterns (horizontal/spiral), with real-time coverage tracking and GPU trajectory rendering.",
      features: ["Ray-marching with light scattering", "Weather map support", "Zero garbage collection allocation"],
      media: [
        { type: 'video', url: '/projects/drone/video1.mp4', caption: 'Visualize Drone Swarm Algorithm Demo' },
        { type: 'image', url: '/projects/drone/image1.png', caption: 'Spiral patten' },
        { type: 'image', url: '/projects/drone/image2.png', caption: 'Grid patten' },
      ]
    }
  },
  {
    id: 5,
    slug: "stylized-water-shader",
    title: "Stylized Water Shader",
    category: "Shaders",
    description: "Zelda-inspired water shader including depth-based color absorption.",
    tags: ["URP", "Shader Graph", "VFX Graph"],
    color: "from-blue-400 to-teal-400",
    details: {
      role: "VFX Artist",
      duration: "2 Weeks",
      challenge: "Replicating the specific stylized look of Nintendo games while maintaining flexibility for different lighting conditions.",
      solution: "Used the Camera Depth Texture to calculate water depth for absorption effects. Added Gerstner waves for vertex displacement.",
      features: ["Depth-based foam", "Refraction & Caustics", "Interactive ripples"],
      media: [
        { type: 'image', url: 'https://picsum.photos/800/600?random=501', caption: 'Water Edge Foam' },
        { type: 'image', url: 'https://picsum.photos/800/600?random=502', caption: 'Underwater Caustics' },
      ]
    }
  },
  {
    id: 6,
    slug: "scifi-mecha-model",
    title: "Sci-Fi Mecha Model",
    category: "3D Art",
    description: "Hard-surface character model. High-poly sculpted in ZBrush, textured in Substance.",
    tags: ["Blender", "Substance Painter", "ZBrush", "PBR Workflow"],
    color: "from-orange-500 to-red-500",
    details: {
      role: "3D Artist",
      duration: "Free time",
      challenge: "Creating a highly detailed Sci-Fi model",
      solution: "Design and make the model by blender,render in Marmoset 3.",
      media: [
        { type: 'image', url: '/projects/hardmesh/1.jpg', caption: 'Sci-Fi Computer' },
        { type: 'image', url: '/projects/hardmesh/2.jpg', caption: 'Sci-Fi Cannon' },
        { type: 'image', url: '/projects/hardmesh/3.jpg', caption: 'Sci-Fi Gun' },
        { type: 'image', url: '/projects/hardmesh/4.jpg', caption: 'Sci-Fi Gun' },
        { type: 'image', url: '/projects/hardmesh/5.jpg', caption: 'Sci-Fi Machine Leg' },
        { type: 'image', url: '/projects/hardmesh/6.jpg', caption: 'Sci-Fi Cannon' },
      ]
    }
  }
];

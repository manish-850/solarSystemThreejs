# Solar System Simulation

This project is a **3D Solar System Simulation** built using **Three.js**. It visually represents the planets revolving around the Sun, complete with realistic textures, lighting, and orbital motion.

---

## Features

- Realistic 3D planets with textures.
- Orbiting motion for all planets and their moons.
- Point light acting as the **Sun** — the only light source.
- Smooth camera controls using **OrbitControls**.
- Scaled distances and rotation speeds for a natural effect.

---

## Tech Stack

- **Three.js** – 3D rendering engine.
- **Vite** – Build tool for fast development.
- **JavaScript (ES6+)**
- **HTML5 & CSS3**

---

## Preview

![preview gif](./public/preview.gif)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/manish-850/solarSystemThreejs.git
```

### 2. Navigate to folder
```bash
cd solarSystemThreejs
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

### 6. Preview the production build
```bash
npm run preview
```

---

## How It Works

- The **Sun** is rendered using `MeshBasicMaterial` (so it glows without needing external light).
- A **PointLight** is placed at the Sun’s center to illuminate other planets.
- Each planet and moon is created from the same geometry but scaled based on realistic ratios.
- Orbits are simulated using trigonometric rotation around the Sun.

---

## Controls

- **Left-click + drag** → Rotate camera.
- **Scroll** → Zoom in/out.
- **Right-click + drag** → Pan view.

---

## Author

**Manish**  
_Computer Science Student | Web Developer_

---

## License

This project is open-source and available under the **MIT License**.

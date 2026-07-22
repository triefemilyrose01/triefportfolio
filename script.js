// Emily Trief's Portfolio Website - Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  setupDoodles();
  setupClickSparkles();
});

// SVG paths for cute simple doodles (star, heart, cloud, sparkle, swirl)
const doodlePaths = [
  "M 15 0 L 20 10 L 30 15 L 20 20 L 15 30 L 10 20 L 0 15 L 10 10 Z", // Sparkle
  "M 12,5 C 8,2 2,2 2,9 C 2,16 12,22 12,22 C 12,22 22,16 22,9 C 22,2 16,2 12,5 Z", // Heart
  "M 0,15 A 15,15 0 0,1 30,15 A 7.5,7.5 0 0,1 15,15 A 3.75,3.75 0 0,1 18.75,15", // Swirl
  "M 12 0 L 15 9 L 24 9 L 17 14 L 20 23 L 12 17 L 4 23 L 7 14 L 0 9 L 9 9 Z", // Star
  "M 5,15 A 5,5 0 0,1 10,10 A 7,7 0 0,1 22,10 A 5,5 0 0,1 27,15 A 3,3 0 0,1 27,18 H 5 A 3,3 0 0,1 5,15 Z" // Cloud
];

// Generate background floating doodles dynamically
function setupDoodles() {
  const container = document.getElementById('floating-doodles');
  if (!container) return;
  
  container.innerHTML = '';
  const numDoodles = 8;
  
  for (let i = 0; i < numDoodles; i++) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('doodle');
    svg.setAttribute('viewBox', '0 0 30 30');
    const size = Math.random() * 20 + 20;
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.left = `${Math.random() * 90 + 5}%`;
    
    // Randomize movement dynamics
    svg.style.animationDelay = `${Math.random() * -20}s`;
    svg.style.animationDuration = `${Math.random() * 15 + 20}s`;
    svg.style.opacity = (Math.random() * 0.12 + 0.08).toString();
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', doodlePaths[Math.floor(Math.random() * doodlePaths.length)]);
    svg.appendChild(path);
    container.appendChild(svg);
  }
}

// Sparkle particle creator
function spawnParticles(emoji, count, originX, originY) {
  // Ensure the particle container exists
  let particleLayer = document.getElementById('particle-layer');
  if (!particleLayer) {
    particleLayer = document.createElement('div');
    particleLayer.id = 'particle-layer';
    particleLayer.className = 'particle-container';
    document.body.appendChild(particleLayer);
  }

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.innerText = emoji;
    
    // Position absolute relative to page view
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    
    // Random landing coordinates vectors
    const dx = (Math.random() - 0.5) * 180;
    const dy = (Math.random() - 0.5) * 180 - 40;
    const sc = Math.random() * 0.6 + 0.7; // scale
    const rot = (Math.random() - 0.5) * 180; // rotation
    
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.setProperty('--sc', sc);
    particle.style.setProperty('--rot', `${rot}deg`);
    
    particleLayer.appendChild(particle);
    
    // Cleanup particle element
    setTimeout(() => {
      particle.remove();
    }, 1200);
  }
}

// Global click event to spawn sparkles
function setupClickSparkles() {
  document.addEventListener('click', (e) => {
    // Avoid spawning sparkles when clicking links/buttons
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    
    // Spawn a few subtle sparkles
    spawnParticles('✨', 3, e.pageX, e.pageY);
  });
}

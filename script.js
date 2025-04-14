 // Fireworks functionality
 const fireworksContainer = document.getElementById('fireworks-container');
 const celebrateBtn = document.getElementById('celebrate-btn');

 // Colors for fireworks
 const colors = [
     '#ff2a6d', '#05d9e8', '#7d61ff', '#ffbe0b',
     '#fb5607', '#8338ec', '#3a86ff', '#00f5d4',
     '#fee440', '#00bbf9', '#f15bb5'
 ];

 // Function to create a firework
 function createFirework(x, y) {
     const particleCount = 150;
     const angleIncrement = (Math.PI * 2) / particleCount;
     const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

     // Create particles for this firework
     for (let i = 0; i < particleCount; i++) {
         const particle = document.createElement('div');
         particle.classList.add('firework-particle');

         // Random parameters
         const angle = angleIncrement * i;
         const velocity = 2 + Math.random() * 3;
         const size = 2 + Math.random() * 3;
         const lifetime = 1000 + Math.random() * 1000; // 1-2 seconds

         // Initial position
         particle.style.left = x + 'px';
         particle.style.top = y + 'px';
         particle.style.width = size + 'px';
         particle.style.height = size + 'px';
         particle.style.backgroundColor = fireworkColor;

         // Add to container
         fireworksContainer.appendChild(particle);

         // Animation parameters
         const dx = Math.cos(angle) * velocity;
         const dy = Math.sin(angle) * velocity;
         let opacity = 1;
         let posX = x;
         let posY = y;

         // Animate the particle
         const startTime = Date.now();

         function animate() {
             const elapsed = Date.now() - startTime;
             const progress = elapsed / lifetime;

             if (progress >= 1) {
                 particle.remove();
                 return;
             }

             // Update position with gravity
             posX += dx;
             posY += dy + progress * 0.5; // Gravity effect

             // Update opacity
             opacity = 1 - progress;

             // Apply styles
             particle.style.left = posX + 'px';
             particle.style.top = posY + 'px';
             particle.style.opacity = opacity;

             requestAnimationFrame(animate);
         }

         requestAnimationFrame(animate);
     }
 }

 // Function to launch multiple fireworks
 function launchFireworks() {
     const windowWidth = window.innerWidth;
     const windowHeight = window.innerHeight;

     // Launch multiple fireworks in sequence
     for (let i = 0; i < 15; i++) {
         setTimeout(() => {
             const x = Math.random() * windowWidth;
             const y = Math.random() * (windowHeight * 0.6); // Keep in upper 60% of screen
             createFirework(x, y);
         }, i * 300); // Launch a new firework every 300ms
     }

     // Play celebration sound (optional)
     const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAACM1RZRVIAAAAGAAAAMjAyMwBUREFUAAAABgAAADIwMjMAVFBFMQAAAAYAAABCZWVwAABYTUwAAAAAEAAAADxzZWU+PCwwPjwvPgA=');
     audio.volume = 0.3;
     audio.play().catch(e => console.log('Audio play failed:', e));

     // Show celebration message
     /* Swal.fire({
         title: 'Happy New Year!',
         text: 'Wishing you joy and prosperity!',
         icon: 'success',
         background: 'rgba(15, 23, 42, 0.9)',
         color: '#fff',
         confirmButtonColor: '#ff2a6d',
         timer: 3000,
         timerProgressBar: true,
         showConfirmButton: false
     }); */
 }

 // Add click event to the celebrate button
 celebrateBtn.addEventListener('click', () => {
     launchFireworks();

     // Continue launching fireworks periodically
     const interval = setInterval(() => {
         if (document.hidden) {
             clearInterval(interval);
             return;
         }
         launchFireworks();
     }, 5000); // Launch new batch every 5 seconds

     // Clear interval after 30 seconds
     setTimeout(() => {
         clearInterval(interval);
     }, 30000);
 });
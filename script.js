const slider = document.querySelector('#meu-carrossel');


let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;


let velocity = 0;
let animationFrameId;


slider.addEventListener('mousedown', (e) => {
  isDown = true;
  isDragging = false;
  slider.classList.add('active');
  
  
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;

  
  cancelAnimationFrame(animationFrameId);
});


slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  
  isDragging = true;
  e.preventDefault();
  
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX); 
  
  
  const currentScroll = scrollLeft - walk;
  velocity = currentScroll - slider.scrollLeft;

 
  slider.scrollLeft = currentScroll;
});


const endDrag = () => {
  isDown = false;
  slider.classList.remove('active');
  
  
  beginMomentumTracking();
};


slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);



function beginMomentumTracking() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(momentumLoop);
}

function momentumLoop() {
  
  slider.scrollLeft += velocity;
  
  
  velocity *= 0.50; 
  
  
  if (Math.abs(velocity) > 0.5) {
    animationFrameId = requestAnimationFrame(momentumLoop);
  }
}


const cards = slider.querySelectorAll('.car-card');
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});


const images = slider.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});
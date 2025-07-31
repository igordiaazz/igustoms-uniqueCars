document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const carousels = document.querySelectorAll('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            carousels.forEach(carousel => {
                carousel.classList.remove('active');
            });

            const activeCarousel = document.getElementById(`${category}-carousel`);
            if (activeCarousel) {
                activeCarousel.classList.add('active');
            }
        });
    });

    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const parentCarousel = item.closest('.carousel');
            parentCarousel.querySelectorAll('.carousel-item').forEach(i => i.classList.remove('selected'));
            
            item.classList.add('selected');
            
            const imageSrc = item.dataset.imgSrc;
            const previewCategory = parentCarousel.id.split('-')[0]; 
            
            const previewImage = document.getElementById(`${previewCategory}-preview`);
            if (previewImage) {
                previewImage.src = imageSrc;
            }
        });
    });
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const itemWidth = 150 + 16;

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: itemWidth, behavior: 'smooth' });
            });
        }
        
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectableItems = document.querySelectorAll('.color-swatch, .engine-option-card, .bodykit-option-card');

    selectableItems.forEach(item => {
        item.addEventListener('click', () => {
            const parentTrack = item.parentElement;
            
            const siblingItems = parentTrack.children;

            for (let sibling of siblingItems) {
                sibling.classList.remove('selected');
            }

            item.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carImages = document.querySelectorAll('.car-view-image');
    const prevBtn = document.getElementById('prev-view-btn');
    const nextBtn = document.getElementById('next-view-btn');
    let currentImageIndex = 0;

    function showImage(index) {
        carImages.forEach(img => img.classList.remove('active'));
        carImages[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= carImages.length) {
            currentImageIndex = 0;
        }
        showImage(currentImageIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = carImages.length - 1;
        }
        showImage(currentImageIndex);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const carousels = document.querySelectorAll('.carousel');
    const carImages = document.querySelectorAll('.car-view-image');
    const prevViewBtn = document.getElementById('prev-view-btn');
    const nextViewBtn = document.getElementById('next-view-btn');
    const summaryList = document.getElementById('summary-list');
    const totalPriceEl = document.getElementById('total-price');

    let currentImageIndex = 0;
    const selections = {
        wheels: null,
        paint: null,
        engine: null,
        bodykits: null
    };

    function formatPrice(price) {
        return Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function updateSummary() {
        summaryList.innerHTML = '';
        let total = 0;
        let hasSelection = false;

        for (const category in selections) {
            const selection = selections[category];
            if (selection) {
                hasSelection = true;
                const li = document.createElement('li');
                const priceText = selection.price > 0 ? formatPrice(selection.price) : 'Incluso';
                li.innerHTML = `${selection.name} <span>${priceText}</span>`;
                summaryList.appendChild(li);
                total += Number(selection.price);
            }
        }

        if (!hasSelection) {
            summaryList.innerHTML = '<li class="summary-placeholder">Selecione os itens para customizar.</li>';
        }

        totalPriceEl.textContent = formatPrice(total);
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            carousels.forEach(carousel => {
                carousel.style.display = carousel.id === `${category}-carousel` ? 'block' : 'none';
            });
        });
    });

    const selectableItems = document.querySelectorAll('.carousel-item, .color-swatch, .engine-option-card, .bodykit-option-card');

    selectableItems.forEach(item => {
        item.addEventListener('click', () => {
            const parentCarousel = item.closest('.carousel');
            const category = parentCarousel.id.replace('-carousel', '');

            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
                selections[category] = null;
            } else {
                const siblings = parentCarousel.querySelectorAll('.selected');
                siblings.forEach(sibling => sibling.classList.remove('selected'));
                item.classList.add('selected');

                selections[category] = {
                    name: item.dataset.name,
                    price: parseFloat(item.dataset.price)
                };
            }
            updateSummary();
        });
    });
    
    function showImage(index) {
        carImages.forEach(img => img.classList.remove('active'));
        carImages[index].classList.add('active');
    }

    nextViewBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % carImages.length;
        showImage(currentImageIndex);
    });

    prevViewBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + carImages.length) % carImages.length;
        showImage(currentImageIndex);
    });
    
    updateSummary();
});
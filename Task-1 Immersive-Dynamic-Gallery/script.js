// ====================
// Image Data
// ====================

const images = [
    {
        title: "Beautiful Forest",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"

    },
    {
        title: "Mountain Lake",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
    },
    {
        title: "Modern Building",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800"
    },
    {
        title: "City Skyline",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800"
    },
    {
        title: "Laptop Setup",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    },
    {
        title: "Artifical Intelligence",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
    },
    {
        title: "Waterfall",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800"
    },
    {
        title: "Luxury House",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    },
    {
        title: "Gaming Setup",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800"
    },
    {
        title: "Smart Robot",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800"
    },
    {
        title: "Sunset Beach",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    },
    {
        title: "Glass Skyscraper",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
    }
];

// =======================
// Select HTML Elements 
// =======================

const gallery = document.getElementById("gallery");

const searchInput = document.getElementById("searchInput");

const buttons = document.querySelectorAll(".filter-buttons button");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const imageTitle = document.getElementById("imageTitle");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// ============================
// Current Image
// ============================

let currentIndex = 0;
let filteredImages = [...images];


// =======================
// Display Gallery 
// =======================

function displayGallery(imageArray) {
    filteredImages = imageArray;
    gallery.innerHTML = "";
    gallery.style.opacity = "0";

    imageArray.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("gallery-item");

        card.innerHTML = `
        <img src="${image.image}" alt="${image.title}" loading="lazy">
        <div class="overlay">
        <h3>${image.title}</h3>
        <p>${image.category}</p>
        </div>
        `;

        card.addEventListener("click", () => {
            currentIndex = index;
            openLightbox();
        });

        gallery.appendChild(card);

        setTimeout(() => {
            gallery.style.opacity = "1";
        });
    });
};

// displayGallery(images);

//=======================
// Open Lightbox
//=======================

function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImage.src = filteredImages[currentIndex].image;
    imageTitle.textContent = filteredImages[currentIndex].title;
};

// ========================
// Close Lightbox
// ========================

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = "none"
    };
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = filteredImages.length - 1;
    };
    openLightbox();
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
    };
    openLightbox();
});

// ========================
// Keyword Navigation
// ========================

document.addEventListener("keydown", (event) => {

    // Only work if lightbox is open
    if (lightbox.style.display === "flex") {

        // Right arrow
        if (event.key === "ArrowRight") {
            nextBtn.click();
        };

        // Left arrow
        if (event.key === "ArrowLeft") {
            prevBtn.click();
        };

        // Escape key
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        };
    };
});

// ======================
// Live Search Filter
// ======================

searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    const activeButton = document.querySelector(".filter-buttons .active"); const category = activeButton.dataset.category;

    let result = images;

    // First filter by category
    if (category !== "All") {
        result = images.filter((image) => image.category === category);
    };

    // Then filter by search text 
    result = result.filter((image) =>
        image.title.toLowerCase().includes(searchValue)
    );

    displayGallery(result);
});

// ==================
// Category Filter
// ==================

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const category = button.dataset.category;
        if (category === "All") {
            displayGallery(images);
        } else {
            const filtered = images.filter((image) => {
                return image.category === category;
            });
            displayGallery(filtered);
        };
        searchInput.value = "";
    });
});

displayGallery(images);
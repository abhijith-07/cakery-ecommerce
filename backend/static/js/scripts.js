document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.heading');
    const Image = document.querySelectorAll('.image');
    let currentIndex = 0;
    galleryItems[0].classList.add('active');
    Image[0].classList.add('active-image');

    function showGalleryItem(index) {
        galleryItems.forEach(item => item.classList.remove('active'));
        galleryItems[index].classList.add('active');
        Image.forEach(item => item.classList.remove('active-image'))
        Image[index].classList.add('active-image');
    }

    function nextGalleryItem() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showGalleryItem(currentIndex);
    }
    setInterval(nextGalleryItem, 7000);

const productSlide = document.querySelectorAll('.product-card');
productSlide[0].classList.add('active-product')
productSlide[1].classList.add('active-product')
productSlide[2].classList.add('active-product')
let currentProduct = 3
let removeProduct = 0

function setProductsActive(currentProduct, removeProduct) {
    productSlide[currentProduct].classList.add('active-product')
    productSlide[removeProduct].classList.remove('active-product');
}


function nextProduct() {
    setProductsActive(currentProduct, removeProduct)
    currentProduct = (currentProduct + 1) % productSlide.length;
    removeProduct = (removeProduct + 1) % productSlide.length
}

const productsDiv = document.querySelector('.products');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setInterval(nextProduct, 2500);
                observer.disconnect();
            }
        });
})

observer.observe(productsDiv);
});

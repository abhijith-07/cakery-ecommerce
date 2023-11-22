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
let currentProduct = 0

function setProductsActive(index) {
    let removeIndex = (index - 2) % productSlide.length
    productSlide[removeIndex].classList.remove('active-product');
    productSlide[index].classList.add('active-product')
}

function nextProduct() {
    currentProduct = (currentProduct + 1) % productSlide.length;
    setProductsActive(currentProduct)
    console.log("next product")
}

const productsDiv = document.querySelector('.products');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setInterval(nextProduct, 3000);
                observer.disconnect();
            }
        });
})

observer.observe(productsDiv);
});

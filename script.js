// State Management
const state = {
    products: [],
    cart: [],
    isCartOpen: false
};

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartToggleBtn = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('cartSidebarClose');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountElement = document.getElementById('cartCount');
const cartSubtotalElement = document.getElementById('cartSubtotal');
const backdrop = document.getElementById('backdrop');
const checkoutForm = document.getElementById('checkout-form');
const loadingSpinner = document.getElementById('loading');

// --- 1. Fetch and Display Products ---

async function initApp() {
    try {
        // Show loading
        if(loadingSpinner) loadingSpinner.style.display = 'flex';
        
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('فشل في تحميل البيانات');
        
        const data = await response.json();
        state.products = data.products;
        
        renderProducts(state.products);
        loadCart();
        
    } catch (error) {
        console.error('Error:', error);
        productsContainer.innerHTML = '<p class="text-center text-red-500">عذراً، حدث خطأ في تحميل المنتجات.</p>';
    } finally {
        if(loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

function renderProducts(products) {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        // Get sizes keys (e.g., ["50ml", "100ml"])
        const sizeKeys = Object.keys(product.sizes);
        const firstSize = sizeKeys[0];
        const firstPrice = product.sizes[firstSize];

        const card = document.createElement('article');
        card.className = 'product-card group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-all';
        
        card.innerHTML = `
            <div class="relative h-[250px] overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                     onerror="this.src='https://placehold.co/600x400?text=Lunabelle'">
                <span class="absolute top-2 right-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full">${product.category}</span>
            </div>
            
            <div class="p-4 flex flex-col gap-2 flex-1">
                <h3 class="text-lg font-bold text-slate-900">${product.name}</h3>
                <p class="text-xs text-slate-500 line-clamp-2 mb-2">${product.description}</p>
                
                <!-- Size Selector -->
                <div class="mt-auto">
                    <label class="text-[10px] text-slate-500 mb-1 block">اختر الحجم:</label>
                    <select class="size-selector w-full p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-slate-50" data-id="${product.id}">
                        ${sizeKeys.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>

                <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span class="price-display text-lg font-bold text-amber-600" id="price-${product.id}">${firstPrice.toLocaleString('ar-EG')} جنيه</span>
                    <button onclick="addToCart(${product.id})" class="primary-btn text-xs px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-amber-600 transition-colors">
                        إضافة للسلة
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(card);

        // Event Listener for Size Change
        const selectEl = card.querySelector('.size-selector');
        selectEl.addEventListener('change', (e) => {
            const newSize = e.target.value;
            const newPrice = product.sizes[newSize];
            const priceEl = document.getElementById(`price-${product.id}`);
            priceEl.textContent = `${newPrice.toLocaleString('ar-EG')} جنيه`;
        });
    });
}

// --- 2. Cart Functionality ---

function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    // Find the specific card to get current selected size
    const card = document.querySelector(`.size-selector[data-id="${productId}"]`);
    const selectedSize = card.value;
    const price = product.sizes[selectedSize];

    // Create unique ID for cart item (Product ID + Size)
    const cartItemId = `${product.id}-${selectedSize}`;
    
    const existingItem = state.cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({
            cartItemId: cartItemId,
            productId: product.id,
            name: product.name,
            size: selectedSize,
            price: price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    saveCart();
    openCart();
}

function removeFromCart(cartItemId) {
    state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
    updateCartUI();
    saveCart();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-slate-500 py-8 text-sm">السلة فارغة حالياً</p>';
    } else {
        state.cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const div = document.createElement('div');
            div.className = 'flex gap-3 py-3 border-b border-slate-100 animate-fadeIn';
            div.innerHTML = `
                <div class="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img src="${item.image}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/100'">
                </div>
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="text-sm font-bold text-slate-900">${item.name}</h4>
                        <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">${item.size}</span>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="text-xs text-amber-600 font-bold">${item.price.toLocaleString('ar-EG')} x ${item.quantity}</div>
                        <button onclick="removeFromCart('${item.cartItemId}')" class="text-[10px] text-red-500 hover:underline">حذف</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    cartCountElement.textContent = count;
    cartSubtotalElement.textContent = `${total.toLocaleString('ar-EG')} جنيه`;
    
    // Update Hidden Input for Formspree
    const orderData = state.cart.map(i => `${i.name} (${i.size}) x ${i.quantity} - ${i.price * i.quantity} EGP`).join('\n');
    const totalPriceData = `Total: ${total} EGP`;
    
    if(document.getElementById('order_details')) {
        document.getElementById('order_details').value = orderData + '\n\n' + totalPriceData;
    }
}

function saveCart() {
    localStorage.setItem('lunabelle_cart', JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem('lunabelle_cart');
    if (saved) {
        state.cart = JSON.parse(saved);
        updateCartUI();
    }
}

// --- 3. UI interactions ---

function openCart() {
    cartSidebar.classList.remove('translate-x-full'); // For LTR logic in RTL: remove translation
    cartSidebar.style.transform = 'translateX(0)';
    backdrop.classList.remove('hidden');
    state.isCartOpen = true;
}

function closeCart() {
    cartSidebar.style.transform = 'translateX(100%)';
    backdrop.classList.add('hidden');
    state.isCartOpen = false;
}

cartToggleBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);

// --- 4. Order Submission (Formspree) ---

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        if (state.cart.length === 0) {
            alert("السلة فارغة! أضف منتجات قبل الطلب.");
            return;
        }

        const status = document.getElementById("form-status");
        const btn = document.getElementById("submit-order-btn");
        
        // Loading state
        btn.disabled = true;
        btn.textContent = "جاري الإرسال...";

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: checkoutForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                state.cart = []; // Clear cart logic
                saveCart();
                updateCartUI();
                closeCart(); // Close sidebar
                
                checkoutForm.reset();
                alert("تم استلام طلبك بنجاح! سنتواصل معك قريباً.");
            } else {
                // Formspree Error
                const data = await response.json();
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert("حدث خطأ أثناء إرسال الطلب.");
                }
            }
        } catch (error) {
            alert("حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.");
        } finally {
            btn.disabled = false;
            btn.textContent = "تأكيد الطلب";
        }
    });
}

// Initialize
initApp();
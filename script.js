// Basic state
const state = {
  products: [],
  activeShopTab: 'perfume', // Default active tab
  activeCategoryFilter: 'all', // Default global filter
  searchQuery: '',
  priceFilter: 'all',
  genderFilter: 'all',
  sortMode: 'featured',
  cart: [],
  activeProduct: null,
};

// Product catalog
const productsCatalog = [
  {
    id: 'p1',
    name: 'عطر إيليت الذهبي',
    category: 'perfume',
    gender: 'women',
    basePrice: 1200,
    priceRangeLabel: '١٢٠٠ – ٢٣٠٠ جنيه',
    sizes: [{ label: '٥٠ مل', value: 50 }, { label: '١٠٠ مل', value: 100 }],
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'مزيج فاخر من الورد الدمشقي مع الفانيليا البيضاء.',
    tags: ['نسائي', 'فواح', 'بست سيلر'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.9,
    reviewsCount: 124,
    createdAt: 20240110,
  },
  {
    id: 'p2',
    name: 'عطر نوير للرجال',
    category: 'perfume',
    gender: 'men',
    basePrice: 980,
    priceRangeLabel: '٩٨٠ – ١٩٥٠ جنيه',
    sizes: [{ label: '٥٠ مل', value: 50 }, { label: '١٠٠ مل', value: 100 }],
    image: 'https://images.pexels.com/photos/965731/pexels-photo-965731.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'عطر رجالي قوي بنفحات من الخشب الداكن والهيل.',
    tags: ['رجالي', 'خشبي'],
    badge: 'bestseller',
    isNew: true,
    rating: 4.7,
    reviewsCount: 87,
    createdAt: 20240201,
  },
  {
    id: 'm1',
    name: 'باليت ظلال عيون نود روز',
    category: 'makeup',
    gender: 'women',
    basePrice: 520,
    priceRangeLabel: '٥٢٠ – ٧٨٠ جنيه',
    sizes: [{ label: 'كامل', value: 10 }],
    image: 'https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'باليت ناعمة بألوان الورد والبيج.',
    tags: ['عيون', 'نيود'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.9,
    reviewsCount: 65,
    createdAt: 20231110,
  },
  {
    id: 'm2',
    name: 'روج ساتان بيوتي',
    category: 'makeup',
    gender: 'women',
    basePrice: 280,
    priceRangeLabel: '٢٨٠ – ٤٢٠ جنيه',
    sizes: [{ label: '٣ مل', value: 3 }],
    image: 'https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'أحمر شفاه كريمي بملمس ساتاني.',
    tags: ['شفاه', 'مرطب'],
    badge: 'new',
    isNew: true,
    rating: 4.6,
    reviewsCount: 29,
    createdAt: 20240401,
  },
  {
    id: 's1',
    name: 'سيروم فيتامين C',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 650,
    priceRangeLabel: '٦٥٠ – ١١٥٠ جنيه',
    sizes: [{ label: '٣٠ مل', value: 30 }],
    image: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'سيروم مركز لتوحيد لون البشرة.',
    tags: ['توهج', 'عناية'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.8,
    reviewsCount: 102,
    createdAt: 20231020,
  },
  {
    id: 's2',
    name: 'مرطب جل خفيف',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 430,
    priceRangeLabel: '٤٣٠ – ٧٢٠ جنيه',
    sizes: [{ label: '٥٠ مل', value: 50 }],
    image: 'https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'تركيبة جل خفيفة سريعة الامتصاص.',
    tags: ['ترطيب', 'خفيف'],
    badge: 'new',
    isNew: true,
    rating: 4.5,
    reviewsCount: 38,
    createdAt: 20240328,
  },
  // New Products added to fill the grid
  {
    id: 'p3',
    name: 'عطر ليالي الأندلس',
    category: 'perfume',
    gender: 'women',
    basePrice: 1500,
    priceRangeLabel: '١٥٠٠ - ٢٨٠٠ جنيه',
    sizes: [{ label: '٥٠ مل', value: 50 }],
    image: 'https://images.pexels.com/photos/965993/pexels-photo-965993.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'عطر شرقي ساحر.',
    tags: ['شرقي', 'سهرات'],
    badge: 'new',
    isNew: true,
    rating: 5.0,
    reviewsCount: 12,
    createdAt: 20240501,
  },
  {
    id: 'm3',
    name: 'ماسكارا كثافة قصوى',
    category: 'makeup',
    gender: 'women',
    basePrice: 350,
    priceRangeLabel: '٣٥٠ جنيه',
    sizes: [{ label: '١٠ مل', value: 10 }],
    image: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'ماسكارا سوداء فاحمة.',
    tags: ['عيون'],
    badge: '',
    isNew: false,
    rating: 4.3,
    reviewsCount: 45,
    createdAt: 20231201,
  }
];

// Helpers
const formatPrice = (value) => `${value.toLocaleString('ar-EG')} جنيه`;
const priceForSize = (product, sizeValue) => product.basePrice; // Simplified for now

// DOM refs
const productsGrid = document.getElementById('productsGrid');
const priceFilterEl = document.getElementById('priceFilter');
const genderFilterEl = document.getElementById('genderFilter');
const sortSelectEl = document.getElementById('sortSelect');
const resultsCountEl = document.getElementById('resultsCount');
const searchInputEl = document.getElementById('searchInput');
const mobileSearchInputEl = document.getElementById('mobileSearchInput');
const cartToggleEl = document.getElementById('cartToggle');
const cartSidebarEl = document.getElementById('cartSidebar');
const cartSidebarCloseEl = document.getElementById('cartSidebarClose');
const cartItemsContainerEl = document.getElementById('cartItemsContainer');
const cartCountEl = document.getElementById('cartCount');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const checkoutButtonEl = document.getElementById('checkoutButton');
const productDrawerEl = document.getElementById('productDrawer');
const productDetailContentEl = document.getElementById('productDetailContent');
const productDrawerBackEl = document.getElementById('productDrawerBack');
const productDrawerCloseEl = document.getElementById('productDrawerClose');
const backdropEl = document.getElementById('backdrop');
const currentYearEl = document.getElementById('currentYear');

// Navigation Scroll
document.querySelectorAll('[data-nav]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-nav');
    const mapping = { home: '#section-home', shop: '#section-shop', about: '#section-about', contact: '#section-contact' };
    const target = document.querySelector(mapping[key] || '#section-home');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('mobileNav')?.classList.add('hidden');
  });
});

// Mobile Toggles
document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('hidden');
});
document.getElementById('mobileSearchToggle')?.addEventListener('click', () => {
  document.getElementById('mobileSearchBar').classList.toggle('hidden');
});

// Shop Tabs (The tabs directly above the grid)
const shopTabs = document.querySelectorAll('.shop-tab');
shopTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-shop-tab');
    // When clicking a Shop Tab, we reset the Global Category Chip to 'all'
    // to prevent logic conflict.
    state.activeShopTab = tab;
    state.activeCategoryFilter = 'all'; 
    updateFilterUI();
    filterAndRenderProducts();
  });
});

// Category Chips (The top section cards/pills)
const categoryChips = document.querySelectorAll('.category-chip');
categoryChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const cat = chip.getAttribute('data-filter-category');
    // When clicking a global category chip, we reset the Shop Tab to null
    state.activeCategoryFilter = cat;
    state.activeShopTab = null;
    updateFilterUI();
    filterAndRenderProducts();
    // Scroll to shop
    document.getElementById('section-shop')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Category Cards (Hero Images)
document.querySelectorAll('.category-card').forEach((card) => {
  card.addEventListener('click', () => {
    const target = card.getAttribute('data-category-target');
    state.activeShopTab = target;
    state.activeCategoryFilter = 'all';
    updateFilterUI();
    filterAndRenderProducts();
    document.getElementById('section-shop')?.scrollIntoView({ behavior: 'smooth' });
  });
});

function updateFilterUI() {
  // Update Chips
  categoryChips.forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-filter-category') === state.activeCategoryFilter);
  });
  // Update Tabs
  shopTabs.forEach(t => {
    const tVal = t.getAttribute('data-shop-tab');
    // It is active if it matches activeShopTab OR if activeShopTab is null but this tab matches the activeCategoryFilter
    const isActive = (state.activeShopTab === tVal) || (state.activeShopTab === null && state.activeCategoryFilter === tVal);
    t.classList.toggle('active', isActive);
  });
}

// Other Filters
priceFilterEl?.addEventListener('change', () => { state.priceFilter = priceFilterEl.value; filterAndRenderProducts(); });
genderFilterEl?.addEventListener('change', () => { state.genderFilter = genderFilterEl.value; filterAndRenderProducts(); });
sortSelectEl?.addEventListener('change', () => { state.sortMode = sortSelectEl.value; filterAndRenderProducts(); });
searchInputEl?.addEventListener('input', (e) => { state.searchQuery = e.target.value.trim(); filterAndRenderProducts(); });

// Logic
function productPassesCategory(product) {
  // Priority 1: Shop Tab
  if (state.activeShopTab && state.activeShopTab !== 'all') {
    return product.category === state.activeShopTab;
  }
  // Priority 2: Category Filter
  if (state.activeCategoryFilter && state.activeCategoryFilter !== 'all') {
    return product.category === state.activeCategoryFilter;
  }
  return true;
}

function productPassesPrice(product) {
  if (state.priceFilter === 'all') return true;
  const [minStr, maxStr] = state.priceFilter.split('-');
  const min = parseInt(minStr) || 0;
  const max = maxStr === '+' || maxStr === undefined ? Infinity : parseInt(maxStr);
  return product.basePrice >= min && product.basePrice <= max;
}

function productPassesGender(product) {
  if (state.genderFilter === 'all') return true;
  return product.gender === state.genderFilter;
}

function productPassesSearch(product) {
  if (!state.searchQuery) return true;
  const q = state.searchQuery.toLowerCase();
  return (product.name + product.description + product.tags.join(' ')).toLowerCase().includes(q);
}

function filterAndRenderProducts() {
  let result = productsCatalog.filter(p => 
    productPassesCategory(p) && 
    productPassesPrice(p) && 
    productPassesGender(p) && 
    productPassesSearch(p)
  );
  
  // Sort
  if (state.sortMode === 'price-asc') result.sort((a,b) => a.basePrice - b.basePrice);
  else if (state.sortMode === 'price-desc') result.sort((a,b) => b.basePrice - a.basePrice);
  else if (state.sortMode === 'newest') result.sort((a,b) => b.createdAt - a.createdAt);
  else result.sort((a,b) => b.rating - a.rating); // Featured

  state.products = result;
  renderProductsGrid();
}

function renderProductsGrid() {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';
  resultsCountEl && (resultsCountEl.textContent = `${state.products.length} منتج`);

  if (state.products.length === 0) {
    productsGrid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500">لا توجد منتجات تطابق خياراتك.</div>`;
    return;
  }

  state.products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card group';
    card.innerHTML = `
      <div class="relative overflow-hidden h-[230px]">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ${product.isNew ? '<span class="absolute top-2 right-2 badge badge-new">جديد</span>' : ''}
        <button class="product-quick-add primary-btn text-[10px] px-2 py-1 absolute bottom-2 left-2 right-2 justify-center opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">إضافة للسلة</button>
      </div>
      <div class="p-3 flex flex-col gap-1">
        <h3 class="text-sm font-bold text-slate-900">${product.name}</h3>
        <p class="text-[10px] text-slate-500">${product.category === 'perfume' ? 'عطر' : product.category === 'makeup' ? 'مكياج' : 'عناية'}</p>
        <div class="flex items-center justify-between mt-2">
           <span class="text-sm font-bold text-amber-600">${formatPrice(product.basePrice)}</span>
           <div class="flex items-center text-[10px] text-slate-400 gap-1"><span class="material-symbols-outlined text-[12px] text-amber-400">star</span>${product.rating}</div>
        </div>
      </div>
    `;
    
    // Add to cart click
    card.querySelector('.product-quick-add').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    // Open details
    card.addEventListener('click', () => openProductDrawer(product));
    productsGrid.appendChild(card);
  });
}

// Cart Functions
function loadCartFromStorage() {
  try { state.cart = JSON.parse(localStorage.getItem('elite_cart')) || []; } catch(e) { state.cart = []; }
}
function saveCart() {
  localStorage.setItem('elite_cart', JSON.stringify(state.cart));
  renderCart();
}

function addToCart(product) {
  const existing = state.cart.find(i => i.productId === product.id);
  if (existing) existing.quantity++;
  else state.cart.push({ productId: product.id, name: product.name, price: product.basePrice, image: product.image, quantity: 1 });
  saveCart();
  openCartSidebar();
}

function renderCart() {
  if (!cartItemsContainerEl) return;
  cartItemsContainerEl.innerHTML = '';
  let total = 0;
  let count = 0;

  state.cart.forEach((item, idx) => {
    total += item.price * item.quantity;
    count += item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-img"><img src="${item.image}" /></div>
      <div class="flex flex-col justify-center gap-1">
        <div class="text-xs font-bold">${item.name}</div>
        <div class="text-[10px] text-slate-500">${formatPrice(item.price)} x ${item.quantity}</div>
        <button class="text-red-500 text-[10px] self-start" data-idx="${idx}">حذف</button>
      </div>
    `;
    div.querySelector('button').addEventListener('click', () => {
      state.cart.splice(idx, 1);
      saveCart();
    });
    cartItemsContainerEl.appendChild(div);
  });

  cartCountEl.textContent = count;
  cartSubtotalEl.textContent = formatPrice(total);
  document.getElementById('cartSidebarSubtitle').textContent = count === 0 ? 'سلتك فارغة' : `${count} منتجات`;
}

function openCartSidebar() {
  cartSidebarEl.style.transform = 'translateX(0)';
  backdropEl.classList.add('is-visible');
}
function closeCartSidebar() {
  cartSidebarEl.style.transform = 'translateX(100%)';
  backdropEl.classList.remove('is-visible');
}

cartToggleEl?.addEventListener('click', openCartSidebar);
cartSidebarCloseEl?.addEventListener('click', closeCartSidebar);
backdropEl?.addEventListener('click', () => { closeCartSidebar(); closeDrawer(productDrawerEl); });

// Product Drawer
function openProductDrawer(product) {
  if(!productDetailContentEl) return;
  productDetailContentEl.innerHTML = `
    <img src="${product.image}" class="w-full rounded-xl mb-4" />
    <h2 class="text-lg font-bold mb-2">${product.name}</h2>
    <p class="text-sm text-slate-600 mb-4">${product.description}</p>
    <div class="font-bold text-xl text-amber-600 mb-4">${formatPrice(product.basePrice)}</div>
    <button id="drawerAddToCart" class="primary-btn w-full justify-center">إضافة إلى السلة</button>
  `;
  document.getElementById('drawerAddToCart').addEventListener('click', () => {
    addToCart(product);
    closeDrawer(productDrawerEl);
  });
  productDrawerEl.style.transform = 'translateX(0)';
  backdropEl.classList.add('is-visible');
}
function closeDrawer(el) {
  if(el) el.style.transform = 'translateX(-100%)'; // left side drawer
  backdropEl.classList.remove('is-visible');
}
productDrawerBackEl?.addEventListener('click', () => closeDrawer(productDrawerEl));
productDrawerCloseEl?.addEventListener('click', () => closeDrawer(productDrawerEl));

// Init
window.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderCart();
  updateFilterUI();
  filterAndRenderProducts();
  if(currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});

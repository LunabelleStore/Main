// Basic state
const state = {
  products: [],
  filteredProducts: [],
  activeShopTab: 'perfume',
  activeCategoryFilter: 'all',
  searchQuery: '',
  priceFilter: 'all',
  genderFilter: 'all',
  sortMode: 'featured',
  cart: [],
  activeProduct: null,
};

// Product catalog
// لإضافة أو تعديل المنتجات:
// 1) كل منتج هو كائن داخل هذا المصفوفة productsCatalog
// 2) عدّلي الخصائص (name, category, gender, basePrice, sizes, image, description, tags...)
// 3) category يجب أن يكون أحد القيم: 'perfume' أو 'makeup' أو 'skincare'
// 4) gender يمكن أن يكون: 'women', 'men', 'unisex'
// 5) الأحجام:
//    - للعطور استخدمي القيَم (5, 10, 20, 50, 100)
//    - للمكياج والعناية بالبشرة استخدمي (2, 3, 5, 10, 15)
// 6) بعد الحفظ سيظهر المنتج مباشرة في المتجر ضمن الفئة المناسبة.
//
// طريقة معالجة الطلبات (من منظور العميل):
// - العميل يضيف المنتجات إلى السلة (من الكارت أو من صفحة التفاصيل).
// - عند الضغط على زر "إتمام الطلب" في السلة، تظهر له رسالة تأكيد
//   تفيد بأن فريق خدمة العملاء سيتواصل معه لإكمال بيانات الشحن والدفع.
// - في مشروع حقيقي يمكن استبدال alert في الدالة checkoutButtonEl.addEventListener
//   باستدعاء API أو فتح صفحة/نموذج لتجميع بيانات العميل.
const productsCatalog = [
  {
    id: 'p1',
    name: 'عطر إيليت الذهبي',
    category: 'perfume',
    gender: 'women',
    basePrice: 1200,
    priceRangeLabel: '١٢٠٠ – ٢٣٠٠ جنيه',
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
      { label: '١٠٠ مل', value: 100 },
    ],
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    description:
      'مزيج فاخر من الورد الدمشقي مع الفانيليا البيضاء ولمسات من العنبر الدافئ، مناسب للإطلالات المسائية والمناسبات الخاصة.',
    tags: ['نسائي', 'فواح', 'مسائي', 'بست سيلر'],
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
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
      { label: '١٠٠ مل', value: 100 },
    ],
    image: 'https://images.pexels.com/photos/965731/pexels-photo-965731.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965731/pexels-photo-965731.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'عطر رجالي قوي بنفحات من الخشب الداكن والهيل مع لمسة من الحمضيات المنعشة، يناسب عشاق الروائح العميقة.',
    tags: ['رجالي', 'خشبي', 'ثابت'],
    badge: 'bestseller',
    isNew: true,
    rating: 4.7,
    reviewsCount: 87,
    createdAt: 20240201,
  },
  {
    id: 'p3',
    name: 'عطر فيلفيت ياسمين',
    category: 'perfume',
    gender: 'women',
    basePrice: 750,
    priceRangeLabel: '٧٥٠ – ١٦٠٠ جنيه',
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
    ],
    image: 'https://images.pexels.com/photos/965996/pexels-photo-965996.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965996/pexels-photo-965996.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'رائحة ناعمة من الياسمين الأبيض مع لمسات بودرية خفيفة، مثالية للاستخدام اليومي وفي العمل.',
    tags: ['نسائي', 'يومي', 'ناعم'],
    badge: 'new',
    isNew: true,
    rating: 4.8,
    reviewsCount: 43,
    createdAt: 20240315,
  },
  {
    id: 'm1',
    name: 'باليت ظلال عيون نود روز',
    category: 'makeup',
    gender: 'women',
    basePrice: 520,
    priceRangeLabel: '٥٢٠ – ٧٨٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738371/pexels-photo-3738371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'باليت ناعمة بألوان الورد والبيج المطفية واللامعة، مناسبة للإطلالات الصباحية والمسائية مع ثبات عالي.',
    tags: ['عيون', 'نيود', 'نسائي'],
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
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
    ],
    image: 'https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'أحمر شفاه كريمي بملمس ساتاني وتركيبة مغذية بزبدة الشيا، لا يسبب جفاف الشفاه.',
    tags: ['شفاه', 'مرطب'],
    badge: 'new',
    isNew: true,
    rating: 4.6,
    reviewsCount: 29,
    createdAt: 20240401,
  },
  {
    id: 's1',
    name: 'سيروم فيتامين C بإشراقة يومية',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 650,
    priceRangeLabel: '٦٥٠ – ١١٥٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'سيروم مركز بفيتامين C لتوحيد لون البشرة وتقليل مظهر التصبغات مع استخدام منتظم.',
    tags: ['توهج', 'عناية بالبشرة', 'للجنسين'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.8,
    reviewsCount: 102,
    createdAt: 20231020,
  },
  {
    id: 's2',
    name: 'مرطب جل خفيف للبشرة المختلطة',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 430,
    priceRangeLabel: '٤٣٠ – ٧٢٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'تركيبة جل خفيفة سريعة الامتصاص بترطيب يدوم حتى ٢٤ ساعة دون لمعان مزعج.',
    tags: ['ترطيب', 'خفيف', 'للجنسين'],
    badge: 'new',
    isNew: true,
    rating: 4.5,
    reviewsCount: 38,
    createdAt: 20240328,
  },
  // أمثلة إضافية لمنتجات يمكن تعديلها أو الاسترشاد بها:
  {
    id: 'p4',
    name: 'عطر ليل مون من لونابيل',
    category: 'perfume',
    gender: 'women',
    basePrice: 1350,
    priceRangeLabel: '١٣٥٠ – ٢٥٥٠ جنيه',
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
      { label: '١٠٠ مل', value: 100 },
    ],
    image: 'https://images.pexels.com/photos/965988/pexels-photo-965988.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965988/pexels-photo-965988.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'رائحة شرقية فاخرة بلمسات من العود والفانيليا والورد التركي، مثالية للأمسيات المميزة.',
    tags: ['نسائي', 'شرقي', 'سهرات'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.9,
    reviewsCount: 210,
    createdAt: 20230901,
  },
  {
    id: 'm3',
    name: 'فاونديشن جلوي فينيش',
    category: 'makeup',
    gender: 'women',
    basePrice: 390,
    priceRangeLabel: '٣٩٠ – ٦٥٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'فاونديشن بلمسة مضيئة يغطي العيوب بخفة ويمنح البشرة توهجًا صحيًا.',
    tags: ['وجه', 'توهج', 'تغطية متوسطة'],
    badge: 'bestseller',
    isNew: true,
    rating: 4.7,
    reviewsCount: 54,
    createdAt: 20240220,
  },
  {
    id: 's3',
    name: 'كريم ليلي مغذي بفيتامين E',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 560,
    priceRangeLabel: '٥٦٠ – ٩٩٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3735482/pexels-photo-3735482.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3735482/pexels-photo-3735482.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'كريم ليلي يغذي البشرة بعمق أثناء النوم ويساعد على تقليل مظهر الخطوط الرفيعة.',
    tags: ['تغذية', 'ليلي', 'للجنسين'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.8,
    reviewsCount: 96,
    createdAt: 20231205,
  },
  // منتجات تجريبية إضافية لتجربة الموقع
  {
    id: 'p5',
    name: 'عطر روز سيلك من لونابيل',
    category: 'perfume',
    gender: 'women',
    basePrice: 890,
    priceRangeLabel: '٨٩٠ – ١٩٥٠ جنيه',
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
      { label: '١٠٠ مل', value: 100 },
    ],
    image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'رائحة زهرية مخملية من الورد البلغاري مع لمسة من المسك الأبيض تناسب الإطلالات الصباحية.',
    tags: ['نسائي', 'زهري', 'نهاري'],
    badge: 'new',
    isNew: true,
    rating: 4.6,
    reviewsCount: 31,
    createdAt: 20240415,
  },
  {
    id: 'p6',
    name: 'عطر مسك ليلي من لونابيل',
    category: 'perfume',
    gender: 'unisex',
    basePrice: 1100,
    priceRangeLabel: '١١٠٠ – ٢٢٠٠ جنيه',
    sizes: [
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '٢٠ مل', value: 20 },
      { label: '٥٠ مل', value: 50 },
      { label: '١٠٠ مل', value: 100 },
    ],
    image: 'https://images.pexels.com/photos/965993/pexels-photo-965993.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/965993/pexels-photo-965993.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'مزج أنيق من المسك الناعم والعنبر مع نفحات من الزهور البيضاء مناسب للجنسين.',
    tags: ['للجنسين', 'مسك', 'مسائي'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.9,
    reviewsCount: 142,
    createdAt: 20240130,
  },
  {
    id: 'm4',
    name: 'هايلايتر جلو بيرل',
    category: 'makeup',
    gender: 'women',
    basePrice: 310,
    priceRangeLabel: '٣١٠ – ٥٤٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3738333/pexels-photo-3738333.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738333/pexels-photo-3738333.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'هايلايتر بلون لؤلؤي ناعم يعطي توهجًا طبيعيًا على أعلى نقاط الوجه.',
    tags: ['هايلايتر', 'توهج', 'نسائي'],
    badge: 'new',
    isNew: true,
    rating: 4.5,
    reviewsCount: 22,
    createdAt: 20240501,
  },
  {
    id: 'm5',
    name: 'مسكرا فوليوم لاش',
    category: 'makeup',
    gender: 'women',
    basePrice: 260,
    priceRangeLabel: '٢٦٠ – ٤٥٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
    ],
    image: 'https://images.pexels.com/photos/3738022/pexels-photo-3738022.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738022/pexels-photo-3738022.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'مسكرا مكثفة للرموش تعطي طولًا وكثافة دون تكتل مع ثبات طويل.',
    tags: ['رموش', 'مكياج عيون'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.7,
    reviewsCount: 57,
    createdAt: 20240210,
  },
  {
    id: 's4',
    name: 'تونر موازنة للبشرة المختلطة',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 380,
    priceRangeLabel: '٣٨٠ – ٧٢٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3738374/pexels-photo-3738374.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3738374/pexels-photo-3738374.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'تونر يساعد على موازنة إفراز الدهون وترطيب المناطق الجافة في نفس الوقت.',
    tags: ['تونر', 'موازنة', 'للجنسين'],
    badge: 'new',
    isNew: true,
    rating: 4.4,
    reviewsCount: 19,
    createdAt: 20240510,
  },
  {
    id: 's5',
    name: 'غسول رغوي لطيف للوجه',
    category: 'skincare',
    gender: 'unisex',
    basePrice: 340,
    priceRangeLabel: '٣٤٠ – ٦٦٠ جنيه',
    sizes: [
      { label: '٢ مل', value: 2 },
      { label: '٣ مل', value: 3 },
      { label: '٥ مل', value: 5 },
      { label: '١٠ مل', value: 10 },
      { label: '١٥ مل', value: 15 },
    ],
    image: 'https://images.pexels.com/photos/3735410/pexels-photo-3735410.jpeg?auto=compress&cs=tinysrgb&w=600',
    gallery: [
      'https://images.pexels.com/photos/3735410/pexels-photo-3735410.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      'غسول رغوي لطيف ينظف البشرة من الشوائب دون أن يتركها مشدودة أو جافة.',
    tags: ['غسول', 'تنظيف', 'للجنسين'],
    badge: 'bestseller',
    isNew: false,
    rating: 4.6,
    reviewsCount: 73,
    createdAt: 20240105,
  },
];

// Helpers
const formatPrice = (value) => `${value.toLocaleString('ar-EG')} جنيه`;

const priceForSize = (product, sizeValue) => {
  const factor = sizeValue / 50; // simple proportional pricing
  return Math.round(product.basePrice * factor || product.basePrice);
};

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
const cartSidebarSubtitleEl = document.getElementById('cartSidebarSubtitle');
const checkoutButtonEl = document.getElementById('checkoutButton');
const productDrawerEl = document.getElementById('productDrawer');
const productDetailContentEl = document.getElementById('productDetailContent');
const productDrawerBackEl = document.getElementById('productDrawerBack');
const productDrawerCloseEl = document.getElementById('productDrawerClose');
const backdropEl = document.getElementById('backdrop');
const currentYearEl = document.getElementById('currentYear');

// Navigation
const navButtons = document.querySelectorAll('[data-nav]');

function scrollToSection(sectionKey) {
  const mapping = {
    home: '#section-home',
    shop: '#section-shop',
    about: '#section-about',
    contact: '#section-contact',
  };
  const target = mapping[sectionKey];
  const el = target && document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-nav');
    scrollToSection(key);
    document.getElementById('mobileNav')?.classList.add('hidden');
  });
});

// Smooth scroll buttons
document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-scroll-target');
    const el = target && document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Mobile toggles
const mobileMenuToggleEl = document.getElementById('mobileMenuToggle');
const mobileNavEl = document.getElementById('mobileNav');
const mobileSearchToggleEl = document.getElementById('mobileSearchToggle');
const mobileSearchBarEl = document.getElementById('mobileSearchBar');

if (mobileMenuToggleEl && mobileNavEl) {
  mobileMenuToggleEl.addEventListener('click', () => {
    mobileNavEl.classList.toggle('hidden');
  });
}

if (mobileSearchToggleEl && mobileSearchBarEl) {
  mobileSearchToggleEl.addEventListener('click', () => {
    mobileSearchBarEl.classList.toggle('hidden');
    if (!mobileSearchBarEl.classList.contains('hidden')) {
      mobileSearchInputEl?.focus();
    }
  });
}

// Category hero cards -> open shop tab
document.querySelectorAll('.category-card').forEach((card) => {
  card.addEventListener('click', () => {
    const targetTab = card.getAttribute('data-category-target');
    if (targetTab) {
      setActiveShopTab(targetTab);
      scrollToSection('shop');
    }
  });
});

// Shop tabs
const shopTabs = document.querySelectorAll('.shop-tab');

function setActiveShopTab(tab) {
  state.activeShopTab = tab;
  shopTabs.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-shop-tab') === tab);
  });
  filterAndRenderProducts();
}

shopTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-shop-tab');
    if (tab) setActiveShopTab(tab);
  });
});

// Category chips (global)
const categoryChips = document.querySelectorAll('.category-chip');

categoryChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const cat = chip.getAttribute('data-filter-category') || 'all';
    state.activeCategoryFilter = cat;
    categoryChips.forEach((c) => c.classList.toggle('active', c === chip));
    filterAndRenderProducts();
    scrollToSection('shop');
  });
});

// Filters
if (priceFilterEl) {
  priceFilterEl.addEventListener('change', () => {
    state.priceFilter = priceFilterEl.value;
    filterAndRenderProducts();
  });
}

if (genderFilterEl) {
  genderFilterEl.addEventListener('change', () => {
    state.genderFilter = genderFilterEl.value;
    filterAndRenderProducts();
  });
}

if (sortSelectEl) {
  sortSelectEl.addEventListener('change', () => {
    state.sortMode = sortSelectEl.value;
    filterAndRenderProducts();
  });
}

// Search
function handleSearchInput(value) {
  state.searchQuery = value.trim();
  filterAndRenderProducts();
}

searchInputEl?.addEventListener('input', (e) => handleSearchInput(e.target.value));
mobileSearchInputEl?.addEventListener('input', (e) => handleSearchInput(e.target.value));

// Filtering + sorting pipeline
function productPassesCategory(product) {
  const tab = state.activeShopTab;
  const globalFilter = state.activeCategoryFilter;
  if (globalFilter !== 'all' && product.category !== globalFilter) return false;
  if (tab && product.category !== tab) return false;
  return true;
}

function productPassesPrice(product) {
  if (state.priceFilter === 'all') return true;
  const [minStr, maxStr] = state.priceFilter.split('-');
  const min = minStr === 'all' ? 0 : parseInt(minStr, 10) || 0;
  const max = maxStr === '+' ? Infinity : parseInt(maxStr, 10) || Infinity;
  const base = product.basePrice;
  return base >= min && base <= max;
}

function productPassesGender(product) {
  if (state.genderFilter === 'all') return true;
  return product.gender === state.genderFilter;
}

function productPassesSearch(product) {
  if (!state.searchQuery) return true;
  const q = state.searchQuery.toLowerCase();
  const text = [product.name, product.description, ...(product.tags || [])]
    .join(' ')
    .toLowerCase();
  return text.includes(q);
}

function sortProducts(products) {
  const arr = [...products];
  switch (state.sortMode) {
    case 'price-asc':
      return arr.sort((a, b) => a.basePrice - b.basePrice);
    case 'price-desc':
      return arr.sort((a, b) => b.basePrice - a.basePrice);
    case 'newest':
      return arr.sort((a, b) => b.createdAt - a.createdAt);
    case 'featured':
    default:
      return arr.sort((a, b) => {
        const scoreA = (a.badge === 'bestseller' ? 2 : 0) + (a.isNew ? 1 : 0) + a.rating / 5;
        const scoreB = (b.badge === 'bestseller' ? 2 : 0) + (b.isNew ? 1 : 0) + b.rating / 5;
        return scoreB - scoreA;
      });
  }
}

function filterAndRenderProducts() {
  let result = productsCatalog.filter(
    (p) => productPassesCategory(p) && productPassesPrice(p) && productPassesGender(p) && productPassesSearch(p)
  );
  result = sortProducts(result);
  state.products = result;
  renderProductsGrid();
}

// Render products grid
function renderProductsGrid() {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';

  if (!state.products.length) {
    productsGrid.innerHTML = `
      <div class="col-span-full text-center py-10 text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
        لم يتم العثور على منتجات بهذه المعايير. جرّبي تعديل الفلاتر أو البحث.
      </div>
    `;
    resultsCountEl && (resultsCountEl.textContent = '٠ منتجات');
    return;
  }

  resultsCountEl && (resultsCountEl.textContent = `${state.products.length.toLocaleString('ar-EG')} منتج`);

  const fragment = document.createDocumentFragment();

  state.products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-card-image-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="absolute top-2 right-2 flex flex-wrap gap-1">
          ${product.isNew ? '<span class="badge badge-new">جديد</span>' : ''}
          ${product.badge === 'bestseller' ? '<span class="badge badge-bestseller">الأكثر مبيعًا</span>' : ''}
        </div>
        <button class="product-quick-add primary-btn text-[10px] px-2 py-1 justify-center">إضافة سريعة للسلة</button>
      </div>
      <div class="p-3 flex-1 flex flex-col gap-2">
        <header class="flex items-start justify-between gap-2">
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-0.5">${product.name}</h3>
            <p class="text-[10px] text-slate-500">${product.priceRangeLabel}</p>
          </div>
          <div class="text-[10px] text-right text-amber-600 flex flex-col items-end">
            <span class="inline-flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[14px]">star</span>
              <span class="font-semibold">${product.rating.toFixed(1)}</span>
            </span>
            <span class="text-[9px] text-slate-400">${product.reviewsCount.toLocaleString('ar-EG')} مراجعة</span>
          </div>
        </header>

        <div class="flex flex-wrap gap-1">
          ${(product.tags || [])
            .slice(0, 3)
            .map((t) => `<span class="badge badge-tag">${t}</span>`)
            .join('')}
        </div>

        <div class="mt-auto pt-1 flex items-center justify-between gap-2 text-[11px]">
          <div class="flex flex-col">
            <span class="text-slate-500">ابتداءً من</span>
            <span class="font-bold text-slate-900">${formatPrice(product.basePrice)}</span>
          </div>
          <button class="text-[11px] text-amber-700 hover:text-amber-900 flex items-center gap-1" type="button">
            تفاصيل المنتج
            <span class="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>
      </div>
    `;

    const quickAddBtn = card.querySelector('.product-quick-add');
    quickAddBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product, product.sizes[0]);
    });

    const detailBtn = card.querySelector('button.text-[11px]');
    detailBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openProductDrawer(product);
    });

    card.addEventListener('click', () => openProductDrawer(product));

    fragment.appendChild(card);
  });

  productsGrid.appendChild(fragment);
}

// Product drawer
function openProductDrawer(product) {
  state.activeProduct = product;
  if (!productDetailContentEl) return;

  const defaultSize = product.sizes[0];
  const defaultPrice = priceForSize(product, defaultSize.value);

  productDetailContentEl.innerHTML = `
    <nav class="breadcrumb mb-3">
      <button type="button" data-breadcrumb="home">الرئيسية</button>
      <span class="material-symbols-outlined text-[14px] text-slate-400">chevron_left</span>
      <button type="button" data-breadcrumb="shop">المتجر</button>
      <span class="material-symbols-outlined text-[14px] text-slate-400">chevron_left</span>
      <span>${product.category === 'perfume' ? 'العطور' : product.category === 'makeup' ? 'المكياج' : 'العناية بالبشرة'}</span>
    </nav>
    <div class="space-y-4">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-6">
          <div class="relative rounded-2xl overflow-hidden border border-slate-200">
            <img src="${product.gallery?.[0] || product.image}" alt="${product.name}" class="w-full h-52 object-cover cursor-zoom-in" />
          </div>
          <div class="mt-2 flex gap-1">
            ${(product.gallery || [product.image])
              .slice(0, 4)
              .map(
                (img) => `
                  <button type="button" class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <img src="${img}" alt="${product.name}" class="w-full h-full object-cover" />
                  </button>
                `
              )
              .join('')}
          </div>
        </div>
        <div class="col-span-6 flex flex-col gap-3">
          <header>
            <h1 class="text-sm font-bold text-slate-900 mb-1">${product.name}</h1>
            <div class="flex items-center gap-2 text-[10px] text-slate-500">
              <span class="inline-flex items-center gap-0.5 text-amber-600">
                <span class="material-symbols-outlined text-[16px]">star</span>
                <span class="font-semibold">${product.rating.toFixed(1)}</span>
              </span>
              <span>•</span>
              <span>${product.reviewsCount.toLocaleString('ar-EG')} مراجعة</span>
            </div>
          </header>

          <p class="text-[11px] text-slate-600 leading-relaxed">${product.description}</p>

          <div class="flex flex-wrap gap-1">
            ${(product.tags || [])
              .map((t) => `<span class="badge badge-tag">${t}</span>`)
              .join('')}
          </div>

          <div class="border border-slate-200 rounded-2xl p-3 text-[11px] space-y-2 bg-slate-50/50">
            <div class="flex items-center justify-between">
              <span class="text-slate-600">السعر الحالي</span>
              <span id="productPrice" class="text-base font-extrabold text-slate-900">${formatPrice(defaultPrice)}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-500">
              <span>نطاق الأسعار</span>
              <span>${product.priceRangeLabel}</span>
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-[11px] text-slate-600">اختاري الحجم المناسب:</p>
            <div class="flex flex-wrap gap-2" id="sizeOptions">
              ${product.sizes
                .map(
                  (s, index) => `
                  <button type="button" data-size-value="${s.value}" class="size-pill ${
                    index === 0 ? 'is-active' : ''
                  }">${s.label}</button>
                `
                )
                .join('')}
            </div>
          </div>

          <div class="mt-auto">
            <button id="addToCartDetail" class="primary-btn w-full justify-center text-sm">
              إضافة إلى السلة
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-200 pt-3 text-[11px] text-slate-500">
        <p>مع كل طلب للحجم الكامل، يمكنك طلب حجم عينة مصاحب بسعر مخفض للتجربة أو للمشاركة مع من تحبين.</p>
      </div>
    </div>
  `;

  // size pills logic
  productDetailContentEl.querySelectorAll('.size-pill').forEach((pill) => {
    pill.classList.add(
      'px-3',
      'py-1.5',
      'rounded-full',
      'border',
      'text-[11px]',
      'transition',
      'bg-white',
      'border-slate-200',
      'text-slate-600'
    );
    if (pill.classList.contains('is-active')) {
      pill.classList.replace('border-slate-200', 'border-amber-400');
      pill.classList.replace('text-slate-600', 'text-amber-800');
      pill.classList.add('bg-amber-50');
    }

    pill.addEventListener('click', () => {
      productDetailContentEl.querySelectorAll('.size-pill').forEach((p) => {
        p.classList.remove('is-active', 'bg-amber-50', 'border-amber-400', 'text-amber-800');
        p.classList.add('border-slate-200', 'text-slate-600', 'bg-white');
      });
      pill.classList.add('is-active', 'bg-amber-50', 'border-amber-400', 'text-amber-800');
      const sizeValue = Number(pill.getAttribute('data-size-value'));
      const price = priceForSize(product, sizeValue);
      const priceEl = document.getElementById('productPrice');
      if (priceEl) priceEl.textContent = formatPrice(price);
    });
  });

  // breadcrumbs inside drawer
  productDetailContentEl.querySelectorAll('[data-breadcrumb]').forEach((b) => {
    b.addEventListener('click', () => {
      const key = b.getAttribute('data-breadcrumb');
      if (key === 'home' || key === 'shop') scrollToSection(key);
      closeProductDrawer();
    });
  });

  const addBtn = document.getElementById('addToCartDetail');
  addBtn?.addEventListener('click', () => {
    const activePill = productDetailContentEl.querySelector('.size-pill.is-active');
    const sizeValue = activePill ? Number(activePill.getAttribute('data-size-value')) : product.sizes[0].value;
    const size = product.sizes.find((s) => s.value === sizeValue) || product.sizes[0];
    addToCart(product, size);
  });

  openDrawer(productDrawerEl, 'left');
}

function closeProductDrawer() {
  closeDrawer(productDrawerEl, 'left');
}

productDrawerBackEl?.addEventListener('click', closeProductDrawer);
productDrawerCloseEl?.addEventListener('click', closeProductDrawer);

// Drawer helpers
function openDrawer(el, side) {
  if (!el) return;
  if (side === 'left') {
    el.style.transform = 'translateX(0)';
  } else {
    el.style.transform = 'translateX(0)';
  }
  backdropEl?.classList.add('is-visible');
}

function closeDrawer(el, side) {
  if (!el) return;
  if (side === 'left') {
    el.style.transform = 'translateX(-100%)';
  } else {
    el.style.transform = 'translateX(100%)';
  }
  if (!cartSidebarEl || cartSidebarEl.style.transform === 'translateX(100%)') {
    backdropEl?.classList.remove('is-visible');
  }
}

backdropEl?.addEventListener('click', () => {
  closeProductDrawer();
  closeDrawer(cartSidebarEl, 'right');
});

// Cart
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('elite_cart');
    if (saved) state.cart = JSON.parse(saved) || [];
  } catch (e) {
    state.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('elite_cart', JSON.stringify(state.cart));
  } catch (e) {
    // ignore
  }
}

function addToCart(product, size) {
  const itemKey = `${product.id}-${size.value}`;
  const existing = state.cart.find((i) => i.key === itemKey);
  const unitPrice = priceForSize(product, size.value);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      key: itemKey,
      productId: product.id,
      name: product.name,
      category: product.category,
      sizeLabel: size.label,
      sizeValue: size.value,
      unitPrice,
      image: product.image,
      quantity: 1,
    });
  }

  saveCartToStorage();
  renderCart();
  openCartSidebar();
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  saveCartToStorage();
  renderCart();
}

function updateCartQuantity(key, delta) {
  const item = state.cart.find((i) => i.key === key);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(key);
  } else {
    saveCartToStorage();
    renderCart();
  }
}

function renderCart() {
  if (!cartItemsContainerEl) return;

  cartItemsContainerEl.innerHTML = '';

  if (!state.cart.length) {
    cartItemsContainerEl.innerHTML = `
      <div class="p-6 text-center text-xs text-slate-500">
        سلة التسوق فارغة حاليًا. ابدئي بإضافة منتجاتك المفضلة من المتجر.
      </div>
    `;
    cartCountEl && (cartCountEl.textContent = '0');
    cartSubtotalEl && (cartSubtotalEl.textContent = '٠ جنيه');
    cartSidebarSubtitleEl && (cartSidebarSubtitleEl.textContent = 'سلتك فارغة حاليًا');
    return;
  }

  const fragment = document.createDocumentFragment();
  let subtotal = 0;
  let totalItems = 0;

  state.cart.forEach((item) => {
    subtotal += item.unitPrice * item.quantity;
    totalItems += item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="flex flex-col gap-1 text-[11px]">
        <div class="flex items-center justify-between gap-2">
          <div class="font-semibold text-slate-800 line-clamp-2">${item.name}</div>
          <button class="text-slate-400 hover:text-rose-500" aria-label="حذف المنتج">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
        <div class="text-[10px] text-slate-500 flex items-center gap-2">
          <span>${item.category === 'perfume' ? 'عطر' : item.category === 'makeup' ? 'مكياج' : 'عناية بالبشرة'}</span>
          <span>•</span>
          <span>الحجم: ${item.sizeLabel}</span>
        </div>
        <div class="flex items-center justify-between mt-1">
          <div class="cart-item-actions flex items-center gap-1">
            <button data-action="dec" aria-label="تقليل الكمية">-</button>
            <span class="min-w-[1.5rem] text-center text-[10px]">${item.quantity.toLocaleString('ar-EG')}</span>
            <button data-action="inc" aria-label="زيادة الكمية">+</button>
          </div>
          <div class="text-[11px] font-semibold text-slate-900">${formatPrice(item.unitPrice * item.quantity)}</div>
        </div>
      </div>
    `;

    const deleteBtn = div.querySelector('button.text-slate-400');
    deleteBtn?.addEventListener('click', () => removeFromCart(item.key));

    const decBtn = div.querySelector('button[data-action="dec"]');
    const incBtn = div.querySelector('button[data-action="inc"]');
    decBtn?.addEventListener('click', () => updateCartQuantity(item.key, -1));
    incBtn?.addEventListener('click', () => updateCartQuantity(item.key, 1));

    fragment.appendChild(div);
  });

  cartItemsContainerEl.appendChild(fragment);
  cartSubtotalEl && (cartSubtotalEl.textContent = formatPrice(subtotal));
  cartCountEl && (cartCountEl.textContent = totalItems.toLocaleString('ar-EG'));
  cartSidebarSubtitleEl &&
    (cartSidebarSubtitleEl.textContent = `${totalItems.toLocaleString('ar-EG')} منتج في السلة`);
}

function openCartSidebar() {
  cartSidebarEl.style.transform = 'translateX(0)';
  backdropEl?.classList.add('is-visible');
}

function closeCartSidebar() {
  closeDrawer(cartSidebarEl, 'right');
}

cartToggleEl?.addEventListener('click', openCartSidebar);
cartSidebarCloseEl?.addEventListener('click', closeCartSidebar);

checkoutButtonEl?.addEventListener('click', () => {
  if (!state.cart.length) return;
  alert(
    'تم تسجيل رغبتك في إتمام الطلب. سيتواصل معك فريق خدمة العملاء قريبًا لتأكيد البيانات وطرق الدفع.'
  );
});

// Category chips in hero section already wired above

// Current year in footer
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear().toString();
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderCart();
  setActiveShopTab('perfume');
  filterAndRenderProducts();
});

/* ===== إعدادات التطبيق وبيانات المنتجات — عدّل هذا الملف فقط لتغيير المحتوى ===== */
window.APP_CONFIG = {
  name: 'لايف للتعدين',
  nameEn: 'LIFE MINING',
  whatsapp: '249910578325',      // رقم واتساب للطلبات بصيغة دولية بدون + أو 00
  phoneIntl: '+249910578325',
  phoneLocal: '0910578325',
  showPrices: true,               // تظهر الأسعار فقط للمنتجات التي لها سعر في الجدول؛ الخلية الفارغة = «السعر عند الطلب»
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1jxa6kWSPRiooVMS_K679b5YxStEVSmR2TvjkK9GCsiQ/edit',                   // رابط Google Sheet العادي (مشاركة: أي شخص لديه الرابط — عارض)
  sheetName: '',                  // اسم الورقة (اتركه فارغاً لأول ورقة)
  sheetCsvUrl: '',                // بديل: رابط CSV منشور على الويب                // رابط Google Sheet المنشور كـ CSV (انظر README) — الأسعار والتوفر تُحدَّث منه تلقائياً
  currency: 'ج.س',
  currency_en: 'SDG',
  // رابط تطبيق الويب من Google Apps Script (ينتهي بـ /exec) — لحفظ العملاء والطلبات في شيت «طلبات وعملاء لايف للتعدين»
  // إذا تُرك فارغاً يعمل التطبيق كالسابق: يرسل الطلب على واتساب فقط بدون رقم طلب ولا حفظ في الشيت
  ordersApiUrl: 'https://script.google.com/macros/s/AKfycbyLtcsG0n0sHZqSkhonnYM_bWQuSIrbWzAL_aHTrMi_7PO6qFZPib6Xj5DwnY1xgILMMQ/exec',
  paymentMethods: ['نقداً عند الاستلام', 'تحويل بنكك', 'تحويل بنكي آخر'],
  deliveryMethods: ['توصيل', 'استلام من موقع الشركة'],
  // نفس الترتيب بالإنجليزي (تظهر للعميل عند اختيار English، وتُحفظ في الشيت بالعربي)
  paymentMethods_en: ['Cash on delivery', 'Bankak transfer', 'Other bank transfer'],
  deliveryMethods_en: ['Delivery', 'Pickup from company site']
};
/* name_en / note_en: الاسم بالإنجليزي (يظهر عند اختيار English) — cat: التصنيف — unit: وحدة البيع (اختياري) — price: السعر بالجنيه السوداني (يظهر فقط إذا showPrices = true) */
window.CATEGORIES = [
  { id: 'devices', name: 'الأجهزة والمنظومات', name_en: 'Equipment & Systems' },
  { id: 'ballmill', name: 'مستلزمات البول ميل', name_en: 'Ball Mill Supplies' },
  { id: 'mesh', name: 'الشيش', name_en: 'Screen Mesh' },
  { id: 'coal', name: 'الفحم', name_en: 'Activated Carbon' },
  { id: 'electric', name: 'كهرباء ومحركات', name_en: 'Electrical & Motors' },
  { id: 'parts', name: 'قطع غيار وبلي', name_en: 'Spare Parts & Bearings' }
];
window.PRODUCTS = [
  { id: 'g500', cat: 'devices', name: "جهاز كشف الذهب AURIX G500", name_en: "AURIX G500 Gold Detector", unit: "جهاز", note: "علامة الشركة — اطلب التفاصيل وعرض السعر", note_en: "Our own brand — ask for details and a quote", price: null },
  { id: 'n01', cat: 'ballmill', name: "بطانة بول ميل 1 مسمار", name_en: "Ball Mill Liner (1 bolt)", unit: "قطعة", price: 950000 },
  { id: 'n02', cat: 'parts', name: "بلي عجل 6211", name_en: "Wheel Bearing 6211", unit: "قطعة", price: 65000 },
  { id: 'n03', cat: 'parts', name: "بلي عجل 6313", name_en: "Wheel Bearing 6313", unit: "قطعة", price: 190000 },
  { id: 'n04', cat: 'parts', name: "بلي عجل 6314", name_en: "Wheel Bearing 6314", unit: "قطعة", price: 235000 },
  { id: 'n05', cat: 'devices', name: "بول ميل 10 مسمار", name_en: "Ball Mill (10 bolts)", unit: "وحدة", price: 600000000 },
  { id: 'n06', cat: 'electric', name: "جربوكس 2.2 كيلووات Y2-112M", name_en: "Gearbox 2.2 kW Y2-112M", unit: "قطعة", price: 3450000 },
  { id: 'n07', cat: 'electric', name: "سيركت بريكر 2.2 كيلووات", name_en: "Circuit Breaker 2.2 kW", unit: "قطعة", price: 245000 },
  { id: 'n08', cat: 'devices', name: "غسالة جربوكس موتور 3 حصان", name_en: "Gearbox Washer with 3 HP Motor", unit: "وحدة", price: 14000000 },
  { id: 'n09', cat: 'devices', name: "فلتر مياه سعة 100 جالون", name_en: "Water Filter 100 Gallon", unit: "وحدة", price: 2000000 },
  { id: 'p3', cat: 'mesh', name: "قطعة شيش بول ميل مقاس 30", name_en: "Ball Mill Mesh Piece, Size 30", unit: "قطعة", price: 630000 },
  { id: 'p2', cat: 'mesh', name: "قطعة شيش حريق مقاس 40", name_en: "Fire Mesh Piece, Size 40", unit: "قطعة", price: 150000 },
  { id: 'p26', cat: 'ballmill', name: "كرات حديدية", name_en: "Steel Balls", unit: "", price: 32000 },
  { id: 'n13', cat: 'mesh', name: "لفة شيش أخضر", name_en: "Green Mesh Roll", unit: "لفة", price: 1250000 },
  { id: 'p1', cat: 'mesh', name: "لفة شيش حريق مقاس 40", name_en: "Fire Mesh Roll, Size 40", unit: "لفة", price: 13800000 },
  { id: 'p8', cat: 'mesh', name: "لفة شيش حليب مقاس 18", name_en: "Milk Mesh Roll, Size 18", unit: "لفة", price: 1500000 },
  { id: 'n16', cat: 'electric', name: "لوحة توزيع كهربائية KW22", name_en: "Distribution Panel KW22", unit: "قطعة", price: 6200000 },
  { id: 'n17', cat: 'electric', name: "لوحة توزيع كهربائية KW3", name_en: "Distribution Panel KW3", unit: "قطعة", price: 1200000 },
  { id: 'n18', cat: 'electric', name: "لوحة توزيع كهربائية KW5.5", name_en: "Distribution Panel KW5.5", unit: "قطعة", price: 2350000 },
  { id: 'n19', cat: 'electric', name: "لوحة توزيع كهربائية KW7.5", name_en: "Distribution Panel KW7.5", unit: "قطعة", price: 2580000 },
  { id: 'n20', cat: 'electric', name: "موتور 3 حصان 2.2 كيلووات Y2-112M", name_en: "Motor 3 HP 2.2 kW Y2-112M", unit: "قطعة", price: 2700000 },
  { id: 'n21', cat: 'electric', name: "موتور جربوكس 3 حصان 2.2 كيلووات Y2-100L", name_en: "Gear Motor 3 HP 2.2 kW Y2-100L", unit: "قطعة", price: 4600000 },
  { id: 'n22', cat: 'electric', name: "موتور جربوكس 4 حصان R77-100L-B3", name_en: "Gear Motor 4 HP R77-100L-B3", unit: "قطعة", price: 6900000 },
  { id: 'n23', cat: 'parts', name: "جلبة كوبلن مرنة 40-45", name_en: "Flexible Coupling Sleeve 40-45", unit: "قطعة", price: 350000 },
  { id: 'n24', cat: 'parts', name: "جلبة كوبلن مرنة 40-55", name_en: "Flexible Coupling Sleeve 40-55", unit: "قطعة", price: 350000 },
  { id: 'n25', cat: 'devices', name: "خلية كهربائية", name_en: "Electrowinning Cell", unit: "وحدة", price: 368000000 },
  { id: 'n26', cat: 'parts', name: "عمود خلاطة جربوكس مقاس 45", name_en: "Gearbox Mixer Shaft, Size 45", unit: "قطعة", price: 1100000 },
  { id: 'n27', cat: 'parts', name: "عمود خلاطة طارات مقاس 38", name_en: "Pulley Mixer Shaft, Size 38", unit: "قطعة", price: 1100000 },
  { id: 'p18', cat: 'mesh', name: "قطعة شيش بول ميل مقاس 26", name_en: "Ball Mill Mesh Piece, Size 26", unit: "قطعة", price: 590000 },
  { id: 'n29', cat: 'mesh', name: "قطعة شيش حريق مقاس 30", name_en: "Fire Mesh Piece, Size 30", unit: "قطعة", price: 125000 },
  { id: 'n30', cat: 'parts', name: "كرسي بلي UCF209", name_en: "Bearing Housing UCF209", unit: "قطعة", price: 130000 },
  { id: 'n31', cat: 'parts', name: "كنة خلاطة طارات", name_en: "Pulley Mixer Hub", unit: "قطعة", price: 430000 },
  { id: 'p17', cat: 'mesh', name: "لفة شيش بول ميل مقاس 26", name_en: "Ball Mill Mesh Roll, Size 26", unit: "لفة", price: 8850000 },
  { id: 'n33', cat: 'mesh', name: "لفة شيش بول ميل مقاس 30", name_en: "Ball Mill Mesh Roll, Size 30", unit: "لفة", price: 11000000 },
  { id: 'p15', cat: 'mesh', name: "لفة شيش حريق مقاس 30", name_en: "Fire Mesh Roll, Size 30", unit: "لفة", price: 10400000 },
  { id: 'p19', cat: 'mesh', name: "لفة شيش حليب مقاس 20", name_en: "Milk Mesh Roll, Size 20", unit: "لفة", price: 1470000 },
  { id: 'n36', cat: 'mesh', name: "لفة شيش حليب مقاس 20 مجلفن", name_en: "Galvanized Milk Mesh Roll, Size 20", unit: "لفة", price: 390000 },
  { id: 'n37', cat: 'coal', name: "فحم كربوني صيني  - أبوهلال", name_en: "Chinese Activated Carbon - Abu Hilal", unit: "", price: 3200000 },
  { id: 'n38', cat: 'devices', name: "منظومة استخلاص الذهب عن طريق امتزاز الكربون", name_en: "Carbon Adsorption Gold Recovery System", unit: "وحدة", price: 185000000 }
];

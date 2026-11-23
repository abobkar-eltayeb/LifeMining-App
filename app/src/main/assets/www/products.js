/* ===== إعدادات التطبيق وبيانات المنتجات — عدّل هذا الملف فقط لتغيير المحتوى ===== */
window.APP_CONFIG = {
  name: 'لايف للتعدين',
  nameEn: 'LIFE MINING',
  whatsapp: '249910886698',      // رقم واتساب للطلبات بصيغة دولية بدون + أو 00
  phoneIntl: '+249910886698',
  phoneLocal: '0910886698',
  showPrices: true,               // تظهر الأسعار فقط للمنتجات التي لها سعر في الجدول؛ الخلية الفارغة = «السعر عند الطلب»
  sheetUrl: '',                   // رابط Google Sheet العادي (مشاركة: أي شخص لديه الرابط — عارض)
  sheetName: '',                  // اسم الورقة (اتركه فارغاً لأول ورقة)
  sheetCsvUrl: '',                // بديل: رابط CSV منشور على الويب                // رابط Google Sheet المنشور كـ CSV (انظر README) — الأسعار والتوفر تُحدَّث منه تلقائياً
  currency: 'ج.س'
};
/* cat: التصنيف — unit: وحدة البيع (اختياري) — price: السعر بالجنيه السوداني (يظهر فقط إذا showPrices = true) */
window.CATEGORIES = [
  { id: 'devices',  name: 'الأجهزة' },
  { id: 'ballmill', name: 'مستلزمات البول ميل' },
  { id: 'mesh',     name: 'الشيش' },
  { id: 'coal',     name: 'الفحم' },
  { id: 'electric', name: 'كهرباء' }
];
window.PRODUCTS = [
  { id: 'g500',  cat: 'devices',  name: 'جهاز كشف الذهب AURIX G500', unit: 'جهاز', note: 'علامة الشركة — اطلب التفاصيل وعرض السعر', price: null },
  { id: 'bm',    cat: 'devices',  name: 'بول ميل (تصنيع الشركة)',     unit: 'وحدة', note: 'اطلب عرض سعر حسب الحجم المطلوب', price: null },
  { id: 'p35',   cat: 'ballmill', name: 'بطانة بول ميل 1 مسمار',      unit: 'قطعة', price: null },
  { id: 'p26',   cat: 'ballmill', name: 'كرات حديدية',                unit: '',     price: null },
  { id: 'p17',   cat: 'mesh',     name: 'لفة شيش بول ميل مقاس 26',    unit: 'لفة',  price: null },
  { id: 'p18',   cat: 'mesh',     name: 'قطعة شيش بول ميل مقاس 26',   unit: 'قطعة', price: null },
  { id: 'p3',    cat: 'mesh',     name: 'قطعة شيش بول ميل مقاس 30',   unit: 'قطعة', price: null },
  { id: 'p1',    cat: 'mesh',     name: 'لفة شيش حريق مقاس 40',       unit: 'لفة',  price: null },
  { id: 'p15',   cat: 'mesh',     name: 'لفة شيش حريق مقاس 30',       unit: 'لفة',  price: null },
  { id: 'p2',    cat: 'mesh',     name: 'قطعة شيش حريق مقاس 40',      unit: 'قطعة', price: null },
  { id: 'p8',    cat: 'mesh',     name: 'لفة شيش حليب مقاس 18',       unit: 'لفة',  price: null },
  { id: 'p19',   cat: 'mesh',     name: 'لفة شيش حليب مقاس 20',       unit: 'لفة',  price: null },
  { id: 'p51',   cat: 'coal',     name: 'فحم كربوني صيني - أبوهلال',   unit: '',     price: null },
  { id: 'p31',   cat: 'electric', name: 'سيركت بريكر 2.2 كيلووات',     unit: 'قطعة', price: null }
];

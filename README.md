# تطبيق لايف للتعدين — أندرويد

تطبيق أندرويد لطلب منتجات لايف للتعدين عبر واتساب (249910886698). الصفحة مضمّنة داخل التطبيق في
`app/src/main/assets/www/` فتفتح فوراً حتى مع ضعف الإنترنت.

## الأسعار من Google Sheets
1. في Google Sheets ارفع `app/src/main/assets/www/prices-template.csv` (ملف ← استيراد). الأعمدة: id | name | price | available.
2. عدّل `price` (أرقام بالجنيه) و`available` (نعم/لا). الخلية الفارغة = «السعر عند الطلب». لا تغيّر `id`.
3. شارك الجدول: أي شخص لديه الرابط — عارض.
4. ضع رابط الجدول في `sheetUrl` داخل `app/src/main/assets/www/products.js` (مرة واحدة) واعمل Commit.
بعدها كل تعديل في الجدول يظهر عند فتح التطبيق بدون إعادة بناء. إذا لم يتوفر الإنترنت يعرض آخر أسعار محفوظة.

## بناء APK عبر GitHub
1. أنشئ مستودعاً جديداً (Private) باسم LifeMining-App.
2. ارفع كل محتويات هذا المجلد (Add file ← Upload files) واضغط Commit.
3. افتح تبويب Actions — يبدأ البناء تلقائياً (5–8 دقائق).
4. من تبويب Releases (النسخة latest) حمّل `lifemining.apk` على الجوال وثبّته (فعّل التثبيت من مصادر غير معروفة).

## تغيير الرقم أو المنتجات
عدّل `products.js` (رقم الواتساب، المنتجات، الأقسام) ثم Commit؛ يُبنى APK جديد تلقائياً.

## النشر في Google Play (اختياري)
مثل مشروع سلة خضرواتي: حساب مطوّر + مفتاح توقيع في Secrets (`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`).
اسم الحزمة `com.lifemining.app` لا يتغير بعد النشر.

## آيفون
ملف APK لأندرويد فقط. على الآيفون: انشر مجلد `app/src/main/assets/www` على GitHub Pages أو استضافة HTTPS، ثم Safari ← مشاركة ← إضافة إلى الشاشة الرئيسية.

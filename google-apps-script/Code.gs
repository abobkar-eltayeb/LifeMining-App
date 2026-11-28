/**
 * لايف للتعدين — استقبال الطلبات وتسجيل العملاء من التطبيق
 * يُلصق هذا الكود في: Google Sheet «طلبات وعملاء لايف للتعدين» ← الإضافات ← Apps Script
 * ثم: نشر ← نشر جديد ← تطبيق ويب ← التنفيذ باسم: أنا ← من لديه حق الوصول: أي شخص
 * وانسخ رابط تطبيق الويب (ينتهي بـ /exec) وضعه في ordersApiUrl داخل products.js
 */

var SHEET_CUSTOMERS = 'العملاء';
var SHEET_ORDERS = 'الطلبات';
var ORDER_PREFIX = 'LM-';

var CUSTOMER_HEADERS = ['رقم الواتساب', 'الاسم', 'المدينة / المنطقة', 'موافق على العروض',
  'تاريخ التسجيل', 'آخر طلب', 'عدد الطلبات', 'إجمالي المشتريات (ج.س)'];

var ORDER_HEADERS = ['رقم الطلب', 'التاريخ', 'الاسم', 'رقم الواتساب', 'المدينة / المنطقة',
  'الأصناف', 'عدد القطع', 'الإجمالي (ج.س)', 'أصناف سعرها عند الطلب', 'طريقة الدفع',
  'طريقة الاستلام', 'عنوان التوصيل', 'ملاحظات', 'الحالة', 'مرجع داخلي'];

/** شغّل هذه الدالة مرة واحدة من المحرر (زر Run) لإعطاء الصلاحيات وتجهيز الأوراق */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  getSheet_(ss, SHEET_CUSTOMERS, CUSTOMER_HEADERS);
  getSheet_(ss, SHEET_ORDERS, ORDER_HEADERS);
}

/** فتح رابط تطبيق الويب في المتصفح يعرض هذه الرسالة — للتأكد أن الربط يعمل */
function doGet() {
  return json_({ ok: true, message: 'نظام طلبات لايف للتعدين يعمل' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var phone = String(d.phone || '').replace(/\D/g, '').slice(0, 15);
    var name = clip_(d.name, 80);
    if (!phone || phone.length < 9 || !name) return json_({ ok: false, error: 'بيانات ناقصة' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var orders = getSheet_(ss, SHEET_ORDERS, ORDER_HEADERS);
    var customers = getSheet_(ss, SHEET_CUSTOMERS, CUSTOMER_HEADERS);
    var ref = clip_(d.ref, 40);

    // نفس الطلب أُرسل من قبل (إعادة محاولة) — نرجع نفس الرقم ولا نكرره
    var refCol = ORDER_HEADERS.length;
    if (ref && orders.getLastRow() > 1) {
      var refs = orders.getRange(2, refCol, orders.getLastRow() - 1, 1).getValues();
      for (var i = 0; i < refs.length; i++) {
        if (String(refs[i][0]) === ref) {
          return json_({ ok: true, orderId: String(orders.getRange(i + 2, 1).getValue()), duplicate: true });
        }
      }
    }

    var orderId = /^LM-[0-9A-Z-]{4,20}$/.test(String(d.orderId || '')) ? String(d.orderId) : nextOrderId_(orders);
    var now = new Date();
    var total = Number(d.total) || 0;
    var items = (d.items || []).slice(0, 100).map(function (it) {
      var line = clip_(it.name, 120) + ' × ' + (Number(it.qty) || 0) + (it.unit ? ' ' + clip_(it.unit, 20) : '');
      if (Number(it.price) > 0) line += ' @ ' + Number(it.price).toLocaleString('en-US');
      return line;
    }).join('\n');
    var pieces = (d.items || []).reduce(function (s, it) { return s + (Number(it.qty) || 0); }, 0);

    var oRow = orders.getLastRow() + 1;
    orders.getRange(oRow, 4).setNumberFormat('@');   // رقم الواتساب كنص
    orders.getRange(oRow, 1, 1, ORDER_HEADERS.length).setValues([[
      orderId, now, name, phone, clip_(d.city, 80),
      items, pieces, total, Number(d.unpriced) || 0, clip_(d.payment, 40),
      clip_(d.delivery, 40), clip_(d.address, 200), clip_(d.note, 500), 'جديد', ref
    ]]);

    // العميل: تحديث إن كان موجوداً (حسب رقم الواتساب) أو إضافته
    var last = customers.getLastRow(), row = 0;
    if (last > 1) {
      var phones = customers.getRange(2, 1, last - 1, 1).getDisplayValues();
      for (var j = 0; j < phones.length; j++) if (String(phones[j][0]).replace(/\D/g, '') === phone) { row = j + 2; break; }
    }
    var offers = d.offers ? 'نعم' : 'لا';
    if (row) {
      var cur = customers.getRange(row, 1, 1, CUSTOMER_HEADERS.length).getValues()[0];
      customers.getRange(row, 2, 1, 7).setValues([[name, clip_(d.city, 80), offers, cur[4] || now, now,
        (Number(cur[6]) || 0) + 1, (Number(cur[7]) || 0) + total]]);
    } else {
      customers.getRange(last + 1, 1).setNumberFormat('@');
      customers.getRange(last + 1, 1, 1, CUSTOMER_HEADERS.length).setValues([[
        phone, name, clip_(d.city, 80), offers, now, now, 1, total]]);
    }
    return json_({ ok: true, orderId: orderId });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function nextOrderId_(orders) {
  var props = PropertiesService.getScriptProperties();
  var n = Number(props.getProperty('lastOrderSeq')) || 0;
  if (!n && orders.getLastRow() > 1) {   // أول مرة: نكمل من آخر رقم موجود في الورقة
    orders.getRange(2, 1, orders.getLastRow() - 1, 1).getValues().forEach(function (r) {
      var m = String(r[0]).match(/^LM-(\d+)$/);
      if (m) n = Math.max(n, Number(m[1]));
    });
  }
  n++;
  props.setProperty('lastOrderSeq', String(n));
  return ORDER_PREFIX + ('000' + n).slice(-Math.max(4, String(n).length));
}

function getSheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
  }
  return sh;
}

/** نص آمن: يقص الطول ويمنع تحويل النص إلى معادلة */
function clip_(v, max) {
  var s = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

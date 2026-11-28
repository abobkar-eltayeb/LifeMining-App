package com.lifemining.app

import android.content.ActivityNotFoundException
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    // الموقع مضمّن داخل التطبيق ويُفتح من هذا العنوان المحلي الآمن
    private val startUrl = "https://appassets.androidplatform.net/assets/www/index.html"

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        setContentView(R.layout.activity_main)

        val root = findViewById<View>(R.id.root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { v, insets ->
            val bars = insets.getInsets(
                WindowInsetsCompat.Type.systemBars() or
                    WindowInsetsCompat.Type.displayCutout() or
                    WindowInsetsCompat.Type.ime()
            )
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView = findViewById(R.id.webview)
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            textZoom = 100
        }
        webView.addJavascriptInterface(AppBridge(this, webView), "AndroidBridge")
        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                val url = request.url
                if (url.host == "appassets.androidplatform.net") return false
                openExternal(url)   // واتساب، خرائط جوجل، الاتصال
                return true
            }
        }

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(startUrl)
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    private fun openExternal(uri: Uri) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, uri))
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(this, getString(R.string.no_app), Toast.LENGTH_SHORT).show()
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    /** جسر بين صفحة الموقع والتطبيق: نسخ نص الطلب، وجلب الأسعار من Google Sheets */
    class AppBridge(private val context: Context, private val webView: WebView) {
        private val main = Handler(Looper.getMainLooper())

        @JavascriptInterface
        fun copy(text: String) {
            main.post {
                val cm = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                cm.setPrimaryClip(ClipData.newPlainText("lifemining-order", text))
            }
        }

        @JavascriptInterface
        fun fetchText(url: String, callbackId: String) {
            Thread {
                var result: String? = null
                try {
                    val u = URL(url)
                    // يُسمح فقط بجداول Google
                    if (u.protocol == "https" && u.host == "docs.google.com") {
                        val c = u.openConnection() as HttpURLConnection
                        c.connectTimeout = 10000
                        c.readTimeout = 15000
                        c.instanceFollowRedirects = true
                        c.setRequestProperty("Cache-Control", "no-cache")
                        if (c.responseCode in 200..299) {
                            result = c.inputStream.bufferedReader(Charsets.UTF_8).use { it.readText() }
                        }
                        c.disconnect()
                    }
                } catch (e: Exception) {
                    result = null
                }
                done(callbackId, result)
            }.start()
        }

        /** إرسال الطلب وبيانات العميل إلى Google Apps Script (شيت الطلبات والعملاء) */
        @JavascriptInterface
        fun postJson(url: String, body: String, callbackId: String) {
            Thread {
                var result: String? = null
                try {
                    var u = URL(url)
                    if (u.protocol == "https" && u.host == "script.google.com") {
                        var c = u.openConnection() as HttpURLConnection
                        c.connectTimeout = 10000
                        c.readTimeout = 15000
                        c.instanceFollowRedirects = false
                        c.requestMethod = "POST"
                        c.doOutput = true
                        c.setRequestProperty("Content-Type", "text/plain;charset=utf-8")
                        c.outputStream.use { it.write(body.toByteArray(Charsets.UTF_8)) }
                        var code = c.responseCode
                        var hops = 0
                        // Apps Script يرد بتحويلة إلى script.googleusercontent.com تُقرأ بطلب GET
                        while (code in 300..399 && hops < 5) {
                            val loc = c.getHeaderField("Location") ?: break
                            c.disconnect()
                            u = URL(u, loc)
                            if (u.protocol != "https" ||
                                !(u.host == "script.google.com" || u.host.endsWith(".googleusercontent.com"))
                            ) break
                            c = u.openConnection() as HttpURLConnection
                            c.connectTimeout = 10000
                            c.readTimeout = 15000
                            c.instanceFollowRedirects = false
                            code = c.responseCode
                            hops++
                        }
                        if (code in 200..299) {
                            result = c.inputStream.bufferedReader(Charsets.UTF_8).use { it.readText() }
                        }
                        c.disconnect()
                    }
                } catch (e: Exception) {
                    result = null
                }
                done(callbackId, result)
            }.start()
        }

        private fun done(callbackId: String, result: String?) {
            val js = "window.__nativeFetchDone(" + JSONObject.quote(callbackId) + "," +
                (if (result == null) "null" else JSONObject.quote(result)) + ")"
            main.post { webView.evaluateJavascript(js, null) }
        }
    }
}

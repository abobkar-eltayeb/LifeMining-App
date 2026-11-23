plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// توقيع نسخة المتجر: يُقرأ من متغيرات البيئة (أسرار GitHub) إن وُجدت
val keystorePath: String? = System.getenv("LM_KEYSTORE")

android {
    namespace = "com.lifemining.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.lifemining.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    signingConfigs {
        if (keystorePath != null) {
            create("release") {
                storeFile = file(keystorePath)
                storePassword = System.getenv("LM_KEYSTORE_PASSWORD")
                keyAlias = System.getenv("LM_KEY_ALIAS")
                keyPassword = System.getenv("LM_KEY_PASSWORD")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            if (keystorePath != null) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.webkit:webkit:1.12.1")
    implementation("androidx.core:core-splashscreen:1.0.1")
}

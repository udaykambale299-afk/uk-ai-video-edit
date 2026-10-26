# UK AI Video Edit — Android APK starter

## ಏನು ಕೆಲಸ ಮಾಡುತ್ತದೆ?
- ಫೋಟೋ ಆಯ್ಕೆ ಮತ್ತು ಪ್ರಿವ್ಯೂ
- Love Story / Cinematic / Mass / Birthday ಶೈಲಿ
- ಐಚ್ಛಿಕವಾಗಿ ಸ್ಥಳೀಯ ಆಡಿಯೋ ಫೈಲ್ ಆಯ್ಕೆ
- 30 ಸೆಕೆಂಡ್ 720×1280 (vertical) WebM ವಿಡಿಯೋ ರಚನೆ ಮತ್ತು ಡೌನ್‌ಲೋಡ್

## ಗಮನಿಸಿ
- ಇದು ಆರಂಭಿಕ ಪ್ರೋಟೋಟೈಪ್; ನಿಜವಾದ AI ಮುಖದ ಅನಿಮೇಷನ್ ಇಲ್ಲ.
- ಈ ಆವೃತ್ತಿ WebM output ಕೊಡುತ್ತದೆ; MP4 ಅಲ್ಲ.
- ಪ್ರಸ್ತುತ canvas 720×1280 ಆಗಿದೆ; 1080p export ಇನ್ನೂ ಮಾಡಬೇಕಿದೆ.
- Android Studio/Android SDK ಹೊಂದಿರುವ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ APK build ಮಾಡಬೇಕು. ಈ ZIP ಸ್ವತಃ APK ಅಲ್ಲ.

## ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ APK build ಮಾಡುವ ಹಂತಗಳು
1. Node.js LTS ಮತ್ತು Android Studio ಸ್ಥಾಪಿಸಿ.
2. ಈ ZIP extract ಮಾಡಿ, ಆ ಫೋಲ್ಡರ್‌ನಲ್ಲಿ Terminal/Command Prompt ತೆರೆಯಿರಿ.
3. `npm install` ಚಲಾಯಿಸಿ.
4. `npm run build` ಚಲಾಯಿಸಿ.
5. `npx cap add android` ಚಲಾಯಿಸಿ.
6. `npx cap sync android` ಚಲಾಯಿಸಿ.
7. `npx cap open android` ಚಲಾಯಿಸಿ; Android Studio ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.
8. Android Studioಗೆ ಅಗತ್ಯ Android SDK/Gradle components ಸ್ಥಾಪಿಸಲು ಅವಕಾಶ ನೀಡಿ.
9. ಪರೀಕ್ಷೆಗೆ: Run ▶ ಒತ್ತಿ ಮತ್ತು Android device ಅಥವಾ emulator ಆಯ್ಕೆ ಮಾಡಿ.
10. APK ಮಾಡಲು: **Build > Build Bundle(s) / APK(s) > Build APK(s)** ಆಯ್ಕೆ ಮಾಡಿ.
11. Build ಮುಗಿದ ಮೇಲೆ Android Studio ತೋರಿಸುವ `app-debug.apk` ಸ್ಥಳದಿಂದ APK ಪಡೆಯಿರಿ.

## ಮುಂದಿನ ಬಾರಿ ಕೋಡ್ ಬದಲಿಸಿದರೆ
`npm run build` ನಂತರ `npx cap sync android` ಮತ್ತೆ ಚಲಾಯಿಸಿ, ನಂತರ Android Studioಯಲ್ಲಿ ಮರು-build ಮಾಡಿ.

## ಫೋನ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್
APK ಅನ್ನು ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಕಳುಹಿಸಿ, ಫೈಲ್ ತೆರೆಯಿರಿ. ಅಗತ್ಯವಿದ್ದರೆ ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಆ ಮೂಲಕ್ಕೆ “Install unknown apps” ಅನುಮತಿ ನೀಡಿ. ನಿಮಗೆ ಪರಿಚಿತವಿರುವ ನಿಮ್ಮದೇ build ಅನ್ನು ಮಾತ್ರ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.

## Package ID
`com.ukeditingbijapur.ukaivideoedit`

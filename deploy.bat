@ECHO OFF

echo Cleaning apk
del sharebook-release-prod-signed.apk >NUL

echo Signing apk...
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sharebook.keystore -storepass MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAriIiIHicLsi4kG13/cAknZn7sM2ZMYHiXjNZtlHJgtsVIZ699bMuyRwk76RQmQ4yeeIu1sBzkc+Go+cS13MGhOKrh8OScL//42gj+HtVIRE01/mrC2N3mlMD/dKhTVJqXPaXxO/Cr6rpGnMmW/dD6Mx/d8jYjgOZM1ICAzCgC7EFf90zrbgcIYRY3ffkj9fqjfUbVGffdYHozFHOOqPLxUYJ2qfFHPLPWRWw4Ave2YCQvSMMET6PxB25ntxhOxDlWKaRClMbPQPyL94OBl5Za+T5qUF1O3vK89P9xHeGAQPIZcTt47mPDp/i+xgtWhTB25zPsScbEhOMT4QCtC7oswIDAQAB platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk sharebook >NUL

echo Ziping apk...
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk sharebook-release-prod-signed.apk >NUL
pause

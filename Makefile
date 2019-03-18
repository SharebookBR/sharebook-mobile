build:
	@echo BUILDING PROD ENVIRONTMENT
	@echo "import {environment} from './environment.prod'; \nexport let config = environment;" > ./environments/environment.ts
	ionic cordova build android --prod --release
	git checkout environments/environment.ts

deploy:
	rm sharebook-release-prod-signed.apk
	/usr/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sharebook.keystore -storepass MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAriIiIHicLsi4kG13/cAknZn7sM2ZMYHiXjNZtlHJgtsVIZ699bMuyRwk76RQmQ4yeeIu1sBzkc+Go+cS13MGhOKrh8OScL//42gj+HtVIRE01/mrC2N3mlMD/dKhTVJqXPaXxO/Cr6rpGnMmW/dD6Mx/d8jYjgOZM1ICAzCgC7EFf90zrbgcIYRY3ffkj9fqjfUbVGffdYHozFHOOqPLxUYJ2qfFHPLPWRWw4Ave2YCQvSMMET6PxB25ntxhOxDlWKaRClMbPQPyL94OBl5Za+T5qUF1O3vK89P9xHeGAQPIZcTt47mPDp/i+xgtWhTB25zPsScbEhOMT4QCtC7oswIDAQAB ./platforms/android/build/outputs/apk/release/android-release-unsigned.apk sharebook
	./zipalign -v 4 ./platforms/android/build/outputs/apk/release/android-release-unsigned.apk ./sharebook-release-prod-signed.apk

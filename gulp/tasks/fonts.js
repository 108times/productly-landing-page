import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () =>
  // Поиск файлов шрифтов .otf
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: 'FONTS:TTF',
          message: `Error: ${error.message}`,
        })),
      ),
    )
    // Конвертация в .ttf
    .pipe(
      fonter({
        formats: ['ttf'],
      }),
    )
    .pipe(app.gulp.dest(app.path.build.fonts));

export const ttfToWoff = () =>
  // Поиск файлов шрифтов .ttf
  app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: 'FONTS:WOFF',
          message: `Error: ${error.message}`,
        })),
      ),
    )
    // Конвертация в .woff
    .pipe(app.plugins.newer(app.path.build.fonts))
    .pipe(
      fonter({
        formats: ['woff'],
      }),
    )
    .pipe(app.gulp.dest(app.path.build.fonts))

    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(app.plugins.newer(app.path.build.fonts))
    // Конвертация в .woff2
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));

export const fontsStyles = () => {
  // Файл стилей подключения шрифтов
  const fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);

        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly != fontFileName) {
            const fontName = fontFileName.split('-')[0] ?? fontFileName;
            let fontWeight = fontFileName.split('-')[1] ?? fontFileName;

            const fontWeightValue = (() => {
              fontWeight = fontWeight.toLowerCase();
              switch (fontWeight) {
                case 'thin':
                  return 100;

                case 'extralight':
                  return 200;

                case 'light':
                  return 300;

                case 'medium':
                  return 500;

                case 'semibold':
                  return 600;

                case 'bold':
                  return 700;

                case 'extrabold' || 'heavy':
                  return 800;

                case 'black':
                  return 900;

                default:
                  return 400;
              }
            })();

            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeightValue};\n\tfont-style: normal;\n\t}\r\n`,
              cb,
            );
          }
          newFileOnly = fontFileName;
        }
      }
    } else {
      console.log('Файл scss/font.scss уже существует. Для обновления файл нужно удалить');
    }
  });
  function cb() {}

  return app.gulp.src(`${app.path.srcFolder}`);
};

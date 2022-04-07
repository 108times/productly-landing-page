import fileInclude from 'gulp-file-include';

import webpHtmlNoSvg from 'gulp-webp-html-nosvg';

import versionNumber from 'gulp-version-number';

import pug from 'gulp-pug';

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError((error) => ({
            title: 'HTML',
            message: `Error: ${error.message}`,
          })),
        ),
      )
      .pipe(
        pug({
          verbose: true,
          pretty: true,
          data: {
            test: 'Hello',
          },
        }),
      )
      // .pipe(fileInclude()) // for html
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(app.plugins.if(app.development, webpHtmlNoSvg()))
      .pipe(
        app.plugins.if(
          app.development,
          versionNumber({
            value: '%DT%',
            append: {
              key: '_v',
              cover: 0,
              to: ['css', 'js'],
            },
            output: {
              file: 'gulp/version.json',
            },
          }),
        ),
      )

      .pipe(app.gulp.dest(app.path.build.html))
  );
};

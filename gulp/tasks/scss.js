import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';

const sass = gulpSass(dartSass);

export const scss = () => {
  const devTasks = app.plugins
    .lazypipe()
    .pipe(groupCssMediaQueries)
    .pipe(webpcss, {
      webpClass: '.webp',
      noWebpClass: '.no-webp',
    })
    .pipe(autoprefixer, {
      grid: true,
      overrideBrowserslist: ['last 3 versions'],
      cascade: true,
    });

  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: !app.development })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError((error) => ({
            title: 'SCSS',
            message: `Error: ${error.message}`,
          })),
        ),
      )
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(
        sass({
          outputStyle: 'expanded',
        }),
      )
      // if in deveopment
      .pipe(app.plugins.if(app.development, devTasks()))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename((path) => {
          path.basename = 'style';
          path.extname = `.min.css`;
        }),
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};

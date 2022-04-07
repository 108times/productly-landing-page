import webpack from 'webpack-stream';

export const js = () =>
  app.gulp
    .src(app.path.src.js, { sourcemaps: true }) //!app.development
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: 'JS',
          message: `Error: ${error.message}`,
        })),
      ),
    )
    .pipe(
      webpack({
        mode: app.development ? 'development' : 'production',
        output: {
          filename: 'app.min.js',
        },
      }),
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());

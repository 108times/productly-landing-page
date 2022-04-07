import gulpSvgSprite from 'gulp-svg-sprite';

export const svgSprite = function () {
  return app.gulp
    .src(app.path.src.svgIcons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: 'SVG',
          message: `Error: ${error.message}`,
        })),
      ),
    )
    .pipe(
      gulpSvgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            example: true,
          },
        },
      }),
    )
    .pipe(app.gulp.src(`${app.path.build.images}`));
};

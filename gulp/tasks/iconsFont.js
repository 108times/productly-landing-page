import iconfont from 'gulp-iconfont'
const runTimestamp = Math.round(Date.now()/1000);

export function iconsFont(){
  return app.gulp.src([app.path.src.svgIcons])
  .pipe(iconfont({
    fontName: 'myfont', // required
    prependUnicode: true, // recommended option
    formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
    timestamp: runTimestamp, // recommended to get consistent builds when watching files
  }))
  .on('glyphs', function(glyphs, options) {
    // CSS templating, e.g.
    console.log(glyphs, options);
  })
  .pipe(app.gulp.dest(`${app.path.build.images}/iconfont/`));
}
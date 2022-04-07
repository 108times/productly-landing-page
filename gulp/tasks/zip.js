import del from 'del';
import zipPlguin from 'gulp-zip';
export const zip = () => {
  const zipName = `${app.path.rootFolder}.zip`;

  del(zipName);
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`)

    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: 'ZIP',
          message: `Error: ${error.message}`,
        })),
      ),
    )
    .pipe(zipPlguin(zipName))
    .pipe(app.gulp.dest('./'));
};

import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';
import lazypipe from 'lazypipe';

export const plugins = {
  replace,
  notify,
  browserSync,
  plumber,
  newer,
  if: gulpIf,
  lazypipe,
};

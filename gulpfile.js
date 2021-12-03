const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

const babel = require('gulp-babel')

function buildStyles() {
  return (
    src('sass/**/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      /*     .pipe(purgecss({ content: ['*.html'] })) */
      .pipe(dest('dist'))
  )
}

function buildJavaScript() {
  return src('js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(dest('dist'))
}

function watchTask() {
  watch(['sass/**/*.scss', '*.html', 'js/**/*.js'], series(buildStyles, buildJavaScript))
}

exports.default = series(buildStyles, buildJavaScript, watchTask)

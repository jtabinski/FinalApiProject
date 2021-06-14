const {src, dest, series, parallel} = require('gulp');

function scriptAdd() {
  return src('src/*.js')
    .pipe(dest('dist/scripts'));
};

function htmlAdd() {
  return src('src/*.html').pipe(dest('dist/html'));
}

function styleAdd() {
  return src('src/*.css').pipe(dest('dist/styles'));
}
exports.default = parallel(scriptAdd, htmlAdd, styleAdd);

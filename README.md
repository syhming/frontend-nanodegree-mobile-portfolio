## Run instructions
[The optimized webpage can be accessed here.](https://syhming.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html)

[The PageSpeed Insights page is here.](https://developers.google.com/speed/pagespeed/insights/)

[The dejanked webpage can be accessed here.](https://syhming.github.io/frontend-nanodegree-mobile-portfolio/dist/views/pizza.html)
## Optimizations

### Portfolio Site Load Optimizations
At least 90/90 for mobile/desktop PageSpeed score is required for a passing a mark on this project.
I got a 93 for mobile and a 95 for desktop.

I used Gulp as a build/automation tool to make production code from my source code:
- Copy HTML from source directory to distribution directory
- CSS
  - auto-prefix a few attributes for different browsers
  - compile CSS from SASS
  - inline critical CSS
- Minify Images
- Javascript
  - linting
  - uglifying
  - source map building to be searchable after uglification during testing
  - babel transpiling to make ES6 code usable with current browsers

I used these Gulp plugins:
- gulp
- gulp-sass
- gulp-autoprefixer
- gulp-uglify
- gulp-eslint
- gulp-babel
- gulp-sourcemaps
- gulp-imagemin
- critical

Google's Web Fonts Loader was used to asynchronously load the specific font.

### Dejanking Pizza Generator Site to Achieve 60fps Performance
There were two objectives for this project.  The pizza size slider needed to resize pizzas under 5ms and the sliding pizzas in the background need to render at 60fps.

Moved the sizeSwitcher function into the changePizzaSizes and got rid of determineDx.  Took the values straight from sizeSwitcher to change the width of the pizzas with the slider.

```
function changePizzaSizes(size) {
  var bigPizzaBox = document.getElementsByClassName("randomPizzaContainer");
  var pizzaSlices = bigPizzaBox.length;
  //moved the sizeSwitcher inside the changePizzaSizes function and changed the decimal multipliers to percentages
  function sizeSwitcher (size) {
    switch(size) {
      case "1":
        return '25%';
      case "2":
        return '33.33%';
      case "3":
        return '50%';
      default:
        console.log("bug in sizeSwitcher");
    }
  }

  var newwidth = sizeSwitcher(size);

  for (var i = 0; i < pizzaSlices; i++) {
    bigPizzaBox[i].style.width = newwidth;
  }
}

```

The pizza generation function and pizza sliding function were modified to reduce Forced Synchronous Layouts.
This function controls the scrolling pizzas.

```
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame");
    //changed querySelectorAll to getElementsByClassName to make selection a little more efficient
    //took calculation of the scroll location out of the for loop so it's only done once
    var items = document.getElementsByClassName('mover');
    var scrollLocation = document.body.scrollTop / 1250;

    for (var i = 0; i < items.length; i++) {
        var phase = Math.sin(scrollLocation + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
    }
    ...
```

This function generates the pizzas once everything has been loaded.

```
document.addEventListener('DOMContentLoaded', function() {
    //calculated rows by getting the height of the window then dividing by s
    //multiplied rows by cols to get how many pizzas will fit on the screen instead of making 200 pizzas
    var s = 256;
    var cols = 8;
    var viewHeight = window.outerHeight;
    var rows = Math.floor(viewHeight / s);
    var pizzaNumber = cols * rows;

    for (var i = 0; i < pizzaNumber; i++) {
        var elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        document.querySelector("#movingPizzas1").appendChild(elem);
    }
```

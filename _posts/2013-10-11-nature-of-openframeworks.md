---
layout: post
title: Nature of openFrameworks (part 1)
feed: true
category: creative-coding
tags: c++ openFrameworks
---
The excellent, self-published, book <a href="http://natureofcode.com/">
The Nature of Code</a> by Daniel Shiffman gives a solid foundation for
understanding the mathematical principles behind our physical world. There
are loads of great examples that show programming techniques for simulating
the natural world in code.

<!--break-->
The book is written to target Processing, a popular Java based creative
coding framework. Because I prefer C++, and in order to familarise myself
more with openFrameworks, I've been converting some of the examples to work
in openFrameworks. Here are some of the early examples, I may post more,
but I've started looking at Cinder too, so in future I may convert some examples to
Cinder instead.

Click each title to access the code on Gist:

### <a href="https://gist.github.com/darrenmothersele/6934845">Random Walker</a>

This is the first example from the introduction. It just moves a point around
the screen randomly. There is no `point()` method in openFrameworks so to draw
a single pixel we just draw a 1x1 rectangle.

The App class just needs a variable to store an instance of the Walker:

The `step()` and `display()` methods are both called from within Processing's
draw loop, but in openFrameworks we use the `update()` method to update state
separately from the draw loop.

Finally, the main file to launch the openFrameworks app.


### <a href="https://gist.github.com/darrenmothersele/7875888">Random number distribution</a>

This example shows how random numbers are evenly distributed.

There's no method for finding the array length in C++ so we hard code the
length of the array used to store the count of the generated random numbers.
You can find the length of a simple array (not an array of pointers) using
the `sizeof()` function, by dividing the size of the array by the size of
each element, like this: `(sizeof(a)/sizeof(*a))` or preferably use a container
class like std::vector which will be covered later.


### <a href="https://gist.github.com/darrenmothersele/7875908">Gaussian distribution</a>

In Processing you have to clear the screen each time in the draw loop, but
openFrameworks does this for you by default. To disable this you add a call
to `ofSetBackgroundAuto(false)` in setup. To create the alpha background
effect I draw a rectangle over the whole screen area. Here's a version that
uses a complete random distribution:

And here is a version using a Gaussian distribution. openFrameworks doesn't have
the Gaussian function is in the Random utility class in Processing, so we have
to specify a function to calculate the next Gaussian number:


###  <a href="https://gist.github.com/darrenmothersele/7875928">Custom distribution (Monte Carlo)</a>

Here's an example that demonstrates a custom distribution.

### <a href="https://gist.github.com/darrenmothersele/7875942">Perlin Noise</a>

`ofNoise` is the openFrameworks equivalent of processing's `noise()` function.
It returns a float between 0 and 1. openFrameworks also has an equivalent of
map function (`ofMap`) that maps the noise value (which is 0 - 1) to the
range 0 - height.





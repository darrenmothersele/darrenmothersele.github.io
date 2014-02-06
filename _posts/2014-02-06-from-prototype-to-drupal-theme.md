---
layout: post
title: From Prototype to Drupal (part 1)
feed: true
category: web-dev
tags: drupal drupal-planet featured
---

The wrong way to build a Drupal site is to jump straight into Drupal and
start building out content types. I've heard a lot of people praise Drupal
for it's usefulness in prototyping, and I've been guilty of doing this myself in
the past, but this is not a good idea for many reasons.

In this first post of the series I explain why I prototype and then introduce some
tools to help with prototyping.
In future parts will look at the process of building a prototype in a way
that supports effortless translation into a Drupal website.

<!--break-->

##Why prototype?

I think the biggest danger of jumping straight into Drupal without a prototype
is that you get locked into Drupal ways of doing
things too early in the process and you'll be naturally thinking in Drupal terms, and end up
with a 'drupaly' solution. You miss out on other cool ideas or possible solutions
that might be a bit harder to implement, but result in a much better product.

Also, if you start prototyping in Drupal, or building in Drupal straight away,
then you end up bringing across elements from prototypes into your final site build.
This big ball of mud grows and can become a maintenance nightmare. What you
really want at the prototype stage is the freedom to throw things away.
You shouldn't feel tied to any idea, design, or solution, which will happen if
you've invested time and effort in building it. Prototypes should be good to throw
away at any point and start again.

The best way to prototype web sites is to simply build out
some HTML and CSS. You can quickly mock up ideas, test it out on users,
and iterate towards a final design. Lots of other
[developers](http://deeson-online.co.uk/blog/capturing-feedback-prototypes-drupal) and
[UX experts](http://frontendunited.org/session-info/prototyping-your-way-ux-success)
agree with me on this one.


##Prototyping tools

There are short-cuts to building out flat HTML and CSS that, while
not necessarily intended for prototyping, certainly speed up the process.


###Front-end frameworks

The benefits of using a framework like [Twitter Bootstrap](http://getbootstrap.com/),
[Zurb Foundation](http://foundation.zurb.com/), or Yahoo's
[Pure CSS](http://purecss.io/) is that they give you building blocks you can use
to quickly piece together a responsive website. Each of them have their own
way of doing things, so you must be careful not to limit your thinking so you
don't end up implementing things a certain way just because that's how the
front-end framework does things.

Pure CSS offers a very minimal starting point so you have to do more of the work,
but this will lead to more varied solutions. Twitter Bootstap is much more
comprehensive, but without a lot of customisation you're likely to end up with
something that looks like it was built using Twitter Bootstrap.

I find that Zurb Foundation offers a good compromise, being a fully-featured
front-end framework, but having lots of scope for customisation using SASS.
There are settings variables to control lots of the default behaviour, and
by using the SASS mixins you can easily use the features of Foundation with
your own markup.

In the early prototype stages I tend to make more use of the pre-defined classes
and styles from Zurb, replacing them with custom classes using the mixins as the
prototype evolves.



###HTML Preprocessor

When creating a prototype site in HTML you will end up repeating yourself and
writing the same HTML code multiple times. Using a HTML preprocessor helps with
this as you can include special tags in your HTML code which the preprocessor
replaces with other HTML. This cuts down on the time taken to write the HTML in
the first place, and speeds up the process of making changes to your prototype.
For example, if you have a navigation bar that is common to all pages of your prototype
you define it once and then just include it in every page. Your prototype is
then built out of various components, which makes it easier to manage and
quicker to iterate.

I've talked about a HTML preprocessor
[Middleman](http://middlemanapp.com/) in a previous
[blog post](/blog/2013/08/02/cms-is-dead-long-live-cms/)
where I discussed using one as a static site builder. Back then I came out in
favour of Middleman, but since then I got turned on to [Jekyll](http://jekyllrb.com/)
when I migrated my site to GitHub pages,
and I've been in love ever since.


###CSS Preprocessor

Just like a HTML preprocessor speeds up the creation of HTML for your prototype, a
CSS preprocessor speeds up the creation of CSS.

I've been using [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/)
for a while, as it fits well with my workflow but there
are other options, such as [LESS](http://lesscss.org/).

There's an excellent starting theme for Drupal called
[Aurora](https://drupal.org/project/aurora) that provides a
mechanism for incorporating SASS and Compass into a Drupal development workflow.
But, we avoiding jumping straight into Drupal site building. From a prototyping point
of view, the main reason I'm using SASS/Compass is
so that I can make use of Zurb Foundation mixins.


##Next time...

In the next post of this series I'm going to show you how to create an all-in-one
prototyping tool that will work for all stages of prototyping, from
the throwaway early drafts, through later refinement stages, up to the
final stages of prototype conversion to Drupal.









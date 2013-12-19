---
layout: post
title: Drupal Site Audit (Common Mistakes)
feed: true
category: web-dev
tags: drupal drupal-planet featured
---

Over the past few months I've had the privilege of being asked to audit
several Drupal websites, both large, small, and very large. This is a
collection of common mistakes I've spotted. This is by no means an
extensive check list, and you may disagree with some of my conclusions,
but I'm posting this here in the hope that it is of help to the community.

<!--break-->

Every developer loves code review right? I know I do, as it's always
interesting to get someone else's point of view, and always leads to better
code. It's impossible for a single developer to produce quality code.
That's an immutable law of software engineering. In an ideal world
we'd all have an infinite supply of inspiration, attention span, time,
and client patience. But, in the real world we make compromises, because
either budgets are tight, time is short, or scope is just too wide ranging.

These are some observations I've made over the past few months while performing
code review, site audits, or security checks.

### Configuration Management

One of the main issues with Drupal (which is being addressed in Drupal 8) is the lack of separation between content and configuration. It is important to distinguish between the two in order to manage configuration separately to content.
Ideally it should be possible to construct a bare version of the site without content using just the codebase as all configuration should be captured in code.
There are several approaches to this in Drupal including
the popular <a href="http://drupal.org/project/features">Features</a> module.


### Unnecessary module use

Adding extra modules to a Drupal site adds overhead. The extra source code has to be parsed by PHP and modules add hooks which can expand the call graph for every page request.
With each extra module you're adding another dependency to keep updated and maintained.
Some modules add 100s of kilobytes of source code for a bit of functionality that
could have been added with a few lines of code.

Sometimes modules are left hanging around from earlier in development. You may
have installed a module to evaluate it but decided not to use it. Make sure it's
uninstalled (remove database tables) and deleted from the codebase.

Also, remember to disable any developer modules on the production site. You don't
often need the Views UI, devel and many other administration modules on a production
site.


### Views issues

Views causes loads of issues. Out of all the sites I've looked at recently, none
of them had adequate configuration of the Views module. It's all to easy for
site builders to create lots of extra Views, but many neglect to enable caching.
You should at least enable a short query cache time. You can set a long rendered
output cache, because it gets invalidated every time the query reruns anyway.

More often than not, anything but the most basic View does not have adequate
indexing defined in the database. I think you'd be surprised when you look into
the MySQL slow query log and see how many times the database has been forced
to filesort. This is a performance killer and it means that MySQL didn't have
appropriate indexes for the query, and had to result to writing out to disk to
sort the results.

Consider replacing some views with blocks and a direct database query. This has
it's advantages at times.


### Diff analysis

If you've got access to Drush you can generate a make file from a working Drupal
site, then run Drush Make to recreate a clean copy of the codebase.

Then use the diff tool to see differences between the two code bases. This will
highlight if any of the Drupal core or contrib module files have been hacked.


### Full HTML input filter

A very popular mistake is giving away permission to post HTML code to your site.
This is really dangerous. Only the most trusted users should be given permission to
post HTML, and even then it should be filtered to just the set of tags they
actually need. Even an image (img) tag in the wrong hands is a security
nightmare and will lead to XSS and other issues.


### Output of unsanitised user input

Remember that Drupal's approach is to store raw user input and sanitise it on
display. Never output any user generated text without first running it through
one of Drupal's sanitisation functions.
Double check any custom code and template files for `echo` or `print`ing of
fields without sanitisation.


### PHP Errors

I often see lots of PHP errors building up in the watchdog table. This is bad, not
only because it indicates there is some coding error on the site, but it's bad
even if the error isn't manifesting itself in any visible effect on the site,
because it locks the watchdog table every time it logs an error. This is a
performance killer, so clear up those PHP errors!

You probably don't want to use database logging on a production site anyway.
I'd recommend logging to syslog and then moving logs out to an central place,
like elasticsearch or similar.

### Conclusion

These are just a few of the issues that I commonly see on sites, and specifically
related to Drupal issues. I'm sure there's more that's all that came to mind right
now.

You can always tweet at me if you disagree or have anything to add. Thanks.
















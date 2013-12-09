---
layout: post
title: Cool things coming in Drupal 7...
category: web-dev
tags: drupal
---
<p>Still porting everything to Drupal 6 at the moment, but might as well be looking forward to Drupal 7. Some of the cool features to look forward to, as taken from the guide to <a href="http://drupal.org/node/224333" rel="nofollow">converting modules from Drupal 6 to Drupal 7</a>:</p><!--break-->
<ul><li>Code registry that auto loads only the required code for the current page request.</li>
<li>Completely new database API with new builder functions that reduce the need to write SQL code - a common source of bugs and security holes</li>
<li>use of REQUEST_TIME rather than time(). I've been doing this for a while in my non-Drupal code - so good to see it coming to Drupal. It's just a simple change that improves code performance, simply read the REQUEST_TIME field from the $_REQUEST global rather than making a system call to find the current time() whenever you need to do something with time.</li>
</ul>

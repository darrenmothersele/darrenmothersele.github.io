---
layout: post
title: Drupal UI Improvements (Sexy Tag Entry Widget via jQuery Progressive Enhancement)
category: web-dev
tags: drupal
---
<p>Many things in Drupal are not obvious to non-techie (and even techie) users. One of the common sources of confusion can be the complex node content add and edit forms. One problem I've found in particular is using a tagging vocabulary and expecting users to format tags correctly and use commas to separate. Some users do and some don't which litters the site with long concatenated sets of tags. </p>
<p>Here's the first version of a module to make a nicer tag entry widget for Drupal vocabularies. This is somewhat inspired by Wordpress' tag entry system. This module is for <strong>Drupal 6</strong> and provides a new option called "Active Tags" on the vocabulary edit page. If you select a vocabulary to be of the "Tag" type, and turn on Active Tags you will find a new widget for entering tags appears on the node edit page. Here's a before and after shot...</p>

<!--break-->
<p><img src="/img/2008-09-11-drupal-ui-improvements-sexy-tag-entry-widget-jquery-progressive-enhancement/active_tags_before.gif" /><br />
The image above shows a standard story node entry form with two standard tag entry fields. Below is the improved version with a jQuery input box that builds the comma separated list behind the scenes out of sight...<br /><img src="/img/2008-09-11-drupal-ui-improvements-sexy-tag-entry-widget-jquery-progressive-enhancement/active_tags_after.gif" /><br />
You can download the module below. If you get stuck or can offer any improvements then please let me know. This module is not fully tested yet, so try it out on a test/dev site first.</p>
<p><strong>Update:</strong> I've removed the download from this page as you can now download this from <a href="http://drupal.org/project/active_tags">the Drupal.org module page</a>.</p>
<p><strong>Update 2:</strong>There is a Drupal 7 version of the module thanks to new maintainer <a href="http://drupal.org/user/137882">dragonwize</a>.</p>

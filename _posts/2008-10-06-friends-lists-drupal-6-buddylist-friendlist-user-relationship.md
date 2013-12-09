---
layout: post
title: Friends lists for Drupal 6. Buddylist, Friendlist, User Relationship?
category: web-dev
tags: drupal
---
<p>There are lots of modules for adding friend list, or buddy list functionality to your Drupal site. Some good, some bad, and some just plain ugly. I started using the BuddyList2 Drupal 6 port because I was using that for Drupal 5... but now I'm starting to favour Friendlist... read on to find out why...</p>
<p>BuddyList was my preferred method for Drupal 5 sites, and the excellent BuddyList2 module provided a nice API and extra functionality.</p><!--break-->
<p>There's lots of ways to do this in development for Drupal 6 - so selecting a friend list module is not straightforward at the moment. I've been playing around with both BuddyList2 and FriendList - and I've had to patch both to get them to work with Views. Out of the two I have preferred working with Friendlist:</p>
<p><a href="http://drupal.org/project/friendlist" rel="nofollow">http://drupal.org/project/friendlist</a></p>
<p>One key requirement I have for a friend list module is the ability to produce lists of content based on a user's friend relationships, i.e. a "friend feed" kind of thing. This isn't available out of the box yet with Friendlist but you can use my patch, as submitted here, which currently let's you do this. There's also an example view, just follow the link here to the Friendlist issue queue on Drupal.org:</p>
<p><a href="http://drupal.org/node/317611#comment-1046616" rel="nofollow">http://drupal.org/node/317611#comment-1046616</a></p>
<p><strong>Update:</strong> I've considered using Flag. Plus points include the fact I'm already using flag module for favourites, so re-using it for friend lists reduces the total number of modules that are required. It only supports one-way "follow" style connections though doesn't it? So something like Friendlist is still needed to enable reciprocal relationships.</p>

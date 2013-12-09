---
layout: post
title: Node reference create for Drupal 6 CCK Node reference field
category: web-dev
tags: drupal
---
<p>I posted about this in relation to Drupal 5 <a href="/blog/2008/06/17/node-reference-autocomplete-with-auto-create-drupal-node-content-wikipedia/" rel="nofollow">here</a>. Now it's time to do this with Drupal 6...</p>
<!--break-->
<p>Let's recap: Node reference field allows you to add a link from one content item to another. You add the reference to another existing node when you create a node with a nodereference field. The node being referenced must exist in order for this to work.</p>
<p>This bit of code lets you reference a non-existent node. The referenced node is created when the validation fails to find an existing node. </p>
<p>Some very basic code is attached. To try this, put the two files in a folder in your site modules folder.  (see attached files). This code has been tested with Drupal 6 and CCK 2.</p>
<p><strong>Update:</strong> The download was removed from this page as someone else took the code I provided and create a <a href="http://drupal.org/project/noderefcreate" rel="nofollow">Drupal.org project</a> for it.</p>

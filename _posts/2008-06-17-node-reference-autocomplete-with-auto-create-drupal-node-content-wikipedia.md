---
layout: post
title: Node Reference Autocomplete with Auto-create Drupal node content from Wikipedia
category: web-dev
tags: drupal
---
<p>Here's a few bits of code from today's Drupal wranglings that solves a tricky UX problem with Drupal and CCK Node Reference fields. </p><!--break-->
<p>Ever wanted to deal with the case that a user might want to reference a node that doesn't exist yet? Well I've played around with a couple of modules (<a href="http://drupal.org/project/add_n_reference" rel="nofollow">Add n Reference</a> and <a href="http://drupal.org/project/addnode" rel="nofollow">Add Node</a>), but they didn't offer the clean user experience I needed. Here's an example use-case:</p>
<p>When creating a node of type gig, the user needs to enter artists that are playing. These artists are linked via node referrence fields in the data model. The select list widget is no good, because there will be thousands of possible artists. The autocomplete widget is better, but (a) requires that the artist node already exists, and (b) appends a string with the nid (node ID) to the end of the users input (which from user feedback they find confusing).</p>
<p>I've adapted the node reference widget to solve both of these issues:</p>
<p>(a) it allows the user to reference a node that doesn't exists. In this case it creates a new node with the body text taken from the first matching Wikipedia entry. The idea is that this is just seed content, and the user will eventually update the content for themselves. </p>
<p>(b) i removed the nid requirement from the autocomplete callback.</p>
<p>There are some major improvements to make soon, but this will work for the time being. Eventually I want to give the user options to "disambiguate" the response - for example: if multiple possible matches are found then show a drop down select, and use the MediaWiki API to pull content from Wikipedia, giving the user option to select from a few similar articles if the correct article is not obvious.</p>
<p>Check out the attached file for the basics of the module. This is just a preview, as there's some domain specific code still in there (e.g. I also import artist images from Wikipedia). This will be made more universal when I produce the final version of the module, but you may need to comment this out for now.</p>

---
layout: post
title: Image Resizing with CCK, Imagefields, Imagecache and PHPTemplate
category: web-dev
tags: drupal
---
<p>If you have a CCK content type with an image field you get display options that allow you to change the image size on teasers and full node views. First you set up your image presets using the imagecache settings. I usually let users upload at any size, and deal with the resizing as required. Here's how to ensure you get best results from imagecache, and how to embed imagefield images into your PHPtemplates using the theme functions provided by imagecache:</p><!--break-->
<p><strong>Update:</strong> I recommend upgrading to the latest version of Imagecache - The interface is much improved and "crop and resize" are now available as a combined option.</p>
<p>In the imagecache options set up presets for each size you are going to need. You get several options for resizing. You want to use <em>scale</em> so the images are not distorted, and use <em>outside</em> dimensions so that the image is at least as big as your required thumbnail. Then use clip to remove any image outside of your thumbnail area. This means that your thumbnails are always the same size. I prefer this to using <em>inside</em> for the scale options, as that causes the images to come out at various different sizes. I like thumbnails to all be the same size, and cropping is usually acceptable. </p>
<p>I use the scale <em>inside</em> option to reduce pictures for screen size display. This works well for images used in full node templates as I'm not as fussy about making them all the same size.</p>
<p>Now you've got a CCK content type with an image field, and you have imagecache setup to give you the images at the size you need. Now you need to display them in your template. </p>
<p>The CCK field display options gives you the opportunity to select a size for the image as displayed in either the teaser or node view, but in your template you might want more control than this. That's when you need to turn to the theme functions provided by imagecache. In this code snippit I render a thumbnail from a <em>$node</em> object with an imagefield called event_photo:</p>
<p>&lt;?php<br />
print theme('imagecache', 'thumbnail', $node-&gt;field_event_photo[0]['filename'])<br />
?&gt;</p>
<p>In your own template substitute <em>thumbnail</em> with the imagecache preset name as required, and <em>field_event_photo</em> with your CCK field name.</p>
<p>You might want to link the image to something. Here's how you do this and render the correct Drupal path (it may have been aliased by an administrator):</p>
<p>&lt;?php<br />
print drupal_get_path_alias('node/'.$node-&gt;nid)<br />
?&gt;</p>
<p>Put that in an &lt;a&gt; tag around your themed image display code from before.</p>

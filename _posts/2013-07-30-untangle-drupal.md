---
layout: post
title: Untangling Drupal
feed: true
category: web-dev
tags: drupal drupal-planet featured
---
I presented yesterday at the July edition of the "Untangle the Web" meetup
being held at the Google Campus in London.
When I was invited to speak, I was asked to give an introductory talk about
Drupal and what kind of things it's good for. To do this, I decided to talk
about how I was introduced to Drupal, how it's developed over the years,
metadata and future-friendly content, and a preview of what's coming in
the next version of Drupal.

<!--break-->

## Early History

Drupal started life as a message-board, and the source code was first released
to the world as open-source software in 2001. At this stage Drupal was a bit
like a "slashdot" clone.

My first introduction to Drupal was in 2003. I was building a community site
for an event/record label I was involved in. Thanks to the
<a href="http://archive.org/web/web.php">Wayback Machine</a> here's a grab
of this early Drupal v4.3 website:

<img src="/img/2013-07-30-untangle-drupal/ib-screenshot.png" alt="Screenshot of International Bastard Website" />

I found Drupal while comparing a few solutions and it seemed like a perfect
fit. I needed something between a blog and a forum, plus it had
modules like "event" which allowed me to quickly get an events calendar
up and running. None of the other systems I compared allowed me to do this
as easily, and Drupal also had some nice moderation features and user
management.

After this, I left Drupal alone for a few years as I went off to do other things.
I was co-founder of a startup providing digital services to record labels. It
was while doing this that I realised the importance of metadata.

<img src="/img/2013-07-30-untangle-drupal/i-heart-metadata.jpg" alt="I heart metadata badge" />

We built a fully bespoke CMS and digital asset management system, which
transcoded audio and delivered it to online music services. We were delivering
audio and metadata to all kinds of servies for various uses, and the quality
of our metadata was the key thing that allowed us to do this.

I had learnt the value of metadata, and also the folly of building a CMS
from scratch!

## Meanwhile...

I was away from Drupal for a few years, and during this time some
key developments had happened in the Drupal community.

> &ldquo;Drupal 4.7 ... changed the way that Drupal worked;
> not Drupal core, but Drupal the meta-project.&rdquo;
> <a href="http://www.palantir.net/blog/drupal-not-cms">Larry Garfield</a>

The change that Larry refers to here is the appearence of key modules like
CCK and Views. This is when Drupal started to abstract functionality and was
a turning point in Drupal's development.

Before this stage you would build up your site by adding on modules that
provided new node types, and some predefined functionality, then customise
the site to fit your exact needs. But with the introduction of the Form API,
CCK, and Views, you would now build up the exact functionality you needed
from component parts.

<img src="/img/2013-07-30-untangle-drupal/radar-design.jpg" alt="Early screenshot from Radar Music Videos" />

I went freelance towards the end of 2007, and the first interesting project that came along
was to build a prototype for a music video filmakers community. I remembered that
Drupal had some nice community features, so I went back to see how it had
developed.

The ease of creating different types of content, custom pages listing content,
and the array of extra functionality that was now available as contributed modules
really blew me away. I had a lot to learn, very quickly, so I started reading
every book, blog, and tutorial I could find. Attending the local Drupal user-group
events was also invaluable.

Almost everything I've done since then has been Drupal. Either developing for
Drupal, or working with the complimentary technologies in the Drupal stack.
Over the years I've been doing this I've come to realise that Drupal is
three things:

 * CMS
 * Framework
 * Community

Drupal is a CMS out-of-the-box, and with the various additional modules it can
be a powerful, enterprise level CMS. When viewed as a set of APIs, Drupal
provides a rapid-application development environment in which to build
websites (or apps). And, one of the differenciating factors, is the community.

There's a saying in Drupal that you "come for the code, stay for the
community". This is definitely true for me. One of the great things about
Drupal is that it's a really good place to have a problem. Having been involved
in developing a bespoke CMS, where you are pretty much on your own when you
encouter issues, this is not the case with Drupal. When you have an issue,
perhaps two modules don't work together quite as easily as you expected, there's
usually someone else trying the same thing, or you can turn to the issue
queues. The issue queues are full of great advice, useful patches, and
other developers willing to help when they can.

## Drupal 7

The current version of Drupal is v7. The biggest change in v7 was the move
to everything being an entity, and what was previously CCK moving into
the core of Drupal as "Fields in Core".

Users, taxonomy and content are now all based on the same API, and they're
all fieldable. So, with functionality in Drupal core, you can create different
types of content, add fields to them, but now also add fields to users,
taxonomy etc. Which gives a really flexible content model:

 * Define custom content types (entities)
 * Add attributes (fields in core)
 * Define relationships (references / relation)
 * Alternative display of content for different contexts (view modes)

## There's a module for that

<a href="http://blog.amazeelabs.com/en/periodic-table-drupal-modules-infographic">
<img src="/img/2013-07-30-untangle-drupal/drupal-periodic-table.png" alt="Periodic table of Drupal modules" />
<br /><small>Amazee Labs</small>
</a>

On top of a flexible content model, there's a huge array of modules to add
extra functionality. Two indispensable modules are Views and Panels.

Views gives the site builder power through the admin interface to define
custom lists of content. It's a visual query builder that lets you build up
custom queries against your content, and configure how it is displayed.

Panels is a layout builder. It allows you to override internal paths, and create
custom pages. Then, select a layout and assign what content appears in each region
of that layout. You can also create layout variants with selection rules to
decide which variant a user will see. For example, showing a different layout
or content for users on mobile devices, or having a different set of content
for logged in users.

## Flexibility comes at a price

All this flexibility comes at a price, which is why Drupal is not the best solution
to every problem, and may not be the right technology for some people.

The image gallery is a classic example. Other systems might provide a nice
image gallery, or have an add-on that provides all the functionality you need
to get up and running with an image gallery. Drupal moved away from these
fully featured modules, to more abstract components. Hence, the best you're going
to get when search for an image gallery is a 7 or 8 step tutorial that shows you
how to build it yourself out of component parts.

Distributions help bridge this gap. Drupal core itself doesn't come with very
much, and out-of-the-box doesn't really showcase the full potential of Drupal.
There's a wide variety of "distributions" available that pre-configure Drupal
for specific use cases. If you're just starting out with Drupal it's a good
idea to see if there's a distribution that meets your needs, or at least
provides some of the functionality you need. That way you will not have to
configure it all yourself.

## A custom Drupal CMS is not a proprietary CMS

A bespoke CMS is by definition a proprietary CMS. Even if you get the code,
there's still a degree of vendor lock-in because of the custom nature of the
code. Drupal allows you to build a custom CMS, but because it's built from
components that are in use of 1000s of other Drupal sites, you're not alone.
You can build a fully bespoke content model and workflow, and provided you
follow best practises, you can tap into the huge Drupal community when you
need help and support.

## Why custom CMS?

But why would you want a custom CMS when it's more work to put together than
using something like Wordpress that comes fully featured out-of-the-box?
The issue with one-size-fits-all CMSs is that you essentially get a web-page
editor.

So you edit your content like this:

<img src="/img/2013-07-30-untangle-drupal/content-here-2.png"
alt="Screenshot of wysiwyg editor" />

Which looks like this on your website:

<img src="/img/2013-07-30-untangle-drupal/content-here-3.png"
alt="Screenshot of website template" />

But you can't guarantee where your content will be viewed:

<img src="/img/2013-07-30-untangle-drupal/content-here-4.png"
alt="Screenshot of broken layout on mobile" />

This is covered in A List Apart 345, in an article called Future-Ready Content:

> we need to relinquish control of our content as well, setting it free from
> the boundaries of a traditional webpage to flow as needed through varied
> displays and contexts. <br />
> <a href="http://alistapart.com/article/future-ready-content">Sara Wachter-Boettcher (A List Apart)</a>

Or more directly:

> get your content ready to go anywhere because it’s going to go everywhere.
> <a href="http://bradfrostweb.com/blog/web/for-a-future-friendly-web/">Brad Frost</a>

<img src="/img/2013-07-30-untangle-drupal/i-heart-metadata.jpg" alt="I heart metadata badge" />

This brings me back to my earlier comments about metadata. When I was delivering
music assets to various services, the quality of the metadata we had about each
of the assets we were managing meant we could do more with it. This is true for
all organisation that want to make their content future-friendly. Having good
metadata, i.e. Structured content, is essential.

## COPE - Create Once Publish Everywhere

This idea comes from an initiative by NPR to create a system that allows them to
<a href="http://blog.programmableweb.com/2009/10/13/cope-create-once-publish-everywhere/">
  create content once and plan for reuse</a>.
Having well structured data, and good metadata opens up lots of possibilities:

 * Microdata, RDF, the SEO benefits of rich snippets, twitter cards and open graph tags.
 * RSS and podcasts
 * APIs
 * Mobile

But it's not just about what you can do now. It's getting your content ready
for whatever the future will bring:

> Technology will change. Standards will evolve. But the need for understanding
> our content — its purpose, meaning, structure, relationships, and value — will remain. <br />
> <a href="http://alistapart.com/article/future-ready-content">Sara Wachter-Boettcher (A List Apart)</a>

<img src="/img/2013-07-30-untangle-drupal/metadata-future.jpg"
alt="Metadata is a love note to the future" />

## Metadata

 * <strong>Descriptive</strong>: taxonomy, classification
 * <strong>Administrative</strong>: status, licensing, etc
 * <strong>Structural</strong>: content model, attributes, relationships...

Descriptive metadata allows you to catalogue and classify your content.
Administrative metadata is useful in the workflow, for example, publishing
status, flagging content for review prior to publising, or marking content
for translation. I've also encounted workflows that have needed licensing data
to control where content is allowed to be distributed.

## The Future...

Drupal 8 is the future. Here are some of the main improvements to look forward
to:

 * Content authoring improvements including in-place editing.
 * A better out of the box multi-lingual experience
 * Web services are now at the core of Drupal - export every entity as XML or JSON!
 * Views in core, plus frontpage and admin pages are now views
 * Configuration management - all config now stored in files to allow versioning and manage separately from database
 * Twig templating engine

## Conclusion

I hope that gave a good overview of Drupal, and why you might want to use it.
This was my first time at an "Untangle the Web" event. The other presentations
were really interesting, and I look forward to attending the next one.








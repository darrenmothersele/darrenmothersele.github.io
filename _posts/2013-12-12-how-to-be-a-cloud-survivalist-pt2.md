---
layout: post
title: How to Be a Cloud Survivalist (part 2)
feed: true
category: misc
tags: misc featured
---

This is the second in a series of posts where I document the process of
implementing your own suite of cloud services.

<!--break-->

Yesterday, in [How to Be a Cloud Survivalist (part 1)](/blog/2013/12/11/how-to-be-a-cloud-survivalist/), I discussed why you might want to do this. Just in case I didn't provide enough motivation in yesterday's article
here's a quote from Richard Stallman's <a href="http://stallman.org/stallman-computing.html">How I do my Computing</a>:

<blockquote>
People sometimes ask me to recommend an email service. The two ethical issues for an email service are (1) whether you can use it without running any non-free software,
and (2) whether it respects your privacy... I have no way to verify that any email service is satisfactory. Therefore, I have no recommendation to offer.
However, I can suggest that it may be wise to use an email service that is not connected with your search engine. That way you can be almost sure that your email contents don't influence your search results. You shouldn't identify yourself to your search engine in any case.
<br>&mdash; Richard Stallman
</blockquote>

As Stallman points out, there's no way to verify that any email service
truly respects your privacy, so let's build our own! We are dealing with more
than just email here, so today I put together a requirements list, and look at
some of the options.

### Get your own domain name

Like most people of my age, my first email address was linked with my
ISP. Perhaps it made sense at the time that the place I dialled into for an
internet connection was the place that collected my emails, but of course, it wasn't
long before I changed ISP and my email address changed. Then I went off to
university and was given a brand new academic email address.

While at university I realised that I could have my own online identity, so I
registered my own surname as a domain. I naively registered the domain for free with a company that offered a free domain registration in exchange for using their email and
ISP services. Maybe this should have taught me the real cost of free, because
of course, this company eventually went bankrupt, taking my lovely personalised
domain name with it. I wasn't lucky enough to grab the domain when it eventually
was released back into the registration pool, so I lost it forever.

I started my first company in 2005, and started using that as my main email address,
but then after the company was acquired I needed to change email address again.
At this point I'd learnt my lesson, I purchased darrenmothersele.com and I've been
here ever since, and I don't plan on leaving.

If you're reading this then I'd take a guess that email is a predominant
form of communication for you. I'd be interested to know what percentage of you
are using your own domain name as your email address. Are you? Or, are you using Gmail, Hotmail, your ISP, your work? When you can register a <em>.co.uk</em> for 3 years for about &pound;10, there's really no excuse.

The only thing more upsetting than seeing my friends and colleagues using a third
party email address is seeing Joe the Plumber with his BT Internet email address
printed on the side of his van.

Hopefully I've persuaded you to get your own domain name, but you're
going to need one anyway to run your own cloud services from, so how do you
pick a good one? On <a href="http://thenextweb.com/lifehacks/2013/07/03/why-you-should-own-a-truly-personal-domain-name-and-how-to-make-the-most-of-it/">The Next Web</a>, Boris suggests:

<blockquote>
Try to avoid using something funny. Look at it like this: you want this name to last you 50 years. Use your last name, or a combination of your last name and first name, and keep it simple.
</blockquote>

### SSL Certificate

You will need an SSL Certificate to go along with your domain. These typically
cost upwards of &pound;50 per year, with the price varying depending on much
verification they provide (how well they guarantee you are who you say you
are), how many (sub)domains they certify, and how much warranty they provide.

SSL gives you an encrypted tunnel from your computer to the server, and we'll
be using that for all communication, sending emails, syncing files, etc.
You can use a self-signed certificate if you don't mind the browser warnings,
or go for one of the cheaper &pound;9 per year SSL certificates that don't have
the same level of vetting as the more professional ones, but are enough to get rid of the browser warnings if you are planning on opening up your services to other users.

### Server

If you want to be a true cloud survivalist then you will want to host your
own server at home. You'll need a good, reliable internet connection for this,
with decent upstream bandwidth.
At this stage, you're more likely to want to use a hosting company for this.
You need to find a hosting company that you like and trust. This depends on
what your priorities are, personally I look for price, speed, reputation,
amount of effort put into providing developer documentation, API, privacy,
and use of renewable energy sources.

In the example configurations to follow in later parts of the series I'm using
a cloud server from <a href="https://www.digitalocean.com/">Digital Ocean</a> that
has 1GB of memory. This will cost you &#36;10 per month. We're starting with
just the one server, but in a future instalment I'll talk about the possibility
of adding a second backup server, and other alternative strategies for
dealing with failure and backup.

Digital Ocean have a data-centre in Amsterdam, which may be good news for those
of you with surveillance concerns as the Netherlands has strict privacy laws.
I couldn't find any mention renewable energy sources in their feature lists, but
they do have all SSD drives, which are faster, more efficient, and lower power
than regular hard-drives.


### Software

Before deciding exactly what software I need, or looking at the options, I'm
going to summarise my requirements:

 * Multi-user, and multi-domain: If I'm going to all this effort I should at
 least make it available to other friends and family if they want it. So I will
 need some way to manage users and add new domains. I'm using a Linux server so
 I could just use server accounts, but I'm probably going to want something more
 scalable than this, like LDAP.
 * Email: I need the ability to receive, store, and send email. I've mainly used
 Gmail's IMAP to access mail on my devices, but I do occasionally need to login
 via the web, so webmail access will be needed too.
 * Calendar and contacts: I like to synchronise my calendars and contacts across
 all my devices, so some implementation of Carddav, caldav or similar will be required.
 I also have calendars I share with other people, so some way to manage that would
 be good.
 * File storage: I need somewhere to store my files, and preferably have them
 synchronised across my devices. I've been using Dropbox for this, but would like
 to see this form part of my own cloud services.

In addition to those initial requirements, there's some other nice to have features:

 * Collaborative document editing: I do sometimes use Google Docs to work on
 documents with other people. I'll probably have to keep my Google account for
 this purpose, unless I can find a good alternative.
 * Notes: I've been using Evernote for jotting down ideas, documenting and writing while on the move so that it automatically syncs to my main computer.

And finally, for future consideration:

 * Social: The one thing I do miss from Facebook is the ability to easily create
 a group to communicate with friends. I'll look at some options for this including
 setting up private email discussions groups.
 * Analytics: I've been using Google Analytics on various sites I've worked on, but I've been meaning to try out some of the open-source alternatives.

There are some other cloud services that I may look at moving to my own cloud,
but for now these are the core bits of technology I need to replace.

### Coming up...

In the next post I'll take a more detailed look at Email, and actually start setting up the server.
We'll look at how to reliably send email that doesn't get caught in spam filters,
and look at simple way to set-up the full stack of email server software using
[iRedMail](http://www.iredmail.org/).

After that, we'll take a look at integrating [Drupal](http://drupal.org) and
[ownCloud](http://owncloud.org/) to provide some of the other cloud services
we're looking for.





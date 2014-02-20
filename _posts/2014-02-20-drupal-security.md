---
layout: post
title: Security, and Drupal
feed: true
category: web-dev
tags: drupal featured drupal-planet
---

Did you know I provide various infosec services, including security audits
of code and infrastructure, penetration testing, etc, for Drupal websites?
It's not something I've really blogged about before, but recently I
have done many site audits, including reviewing sites for security issues.

Security consultant Egor Homakov recently posted up details of
[how he hacked GitHub](http://homakov.blogspot.co.uk/2014/02/how-i-hacked-github-again.html)
and this got me thinking. Although I've touched on security issues in previous
posts (for example,
[common Drupal mistakes](http://darrenmothersele.com/blog/2013/12/19/drupal-common-mistakes/)),
I thought it was about time I posted something more comprehensive on the issue.

<!--break-->

##Don't ignore minor bugs

The most interesting thing about Egor's compromise of GitHub security was that
he used 5 issues, which independently would have been very minor, but through
clever combination of the 5 minor issues he crafted a high-severity
exploit that could theoretically grant him access to all private repositories
on GitHub.

Egor reported the vulnerabilities under [GitHub's bounty programme](https://bounty.github.com/),
and they were fixed before details were released. He was awarded a bounty of $4000 USD for his
work.

###The cost of (in)security

Many of the [comments on Hacker News](https://news.ycombinator.com/item?id=7197048)
argued that this reward was far too low considering the sensitive nature of the
compromise. Many large companies host important code-bases in private repositories
on GitHub.

In the past I've found security issues (both minor and severe) on Drupal sites,
and worked with third-party penetration testers to advise on recommendations
on how to implement their findings.

It's hard to measure the true cost of security issues should they
be found and exploited on your site, but it should be obvious that investment
in security review and penetration testing is a Good Thing.


###White-hats

Egor reported his findings to GitHub so they could be fixed before details
were released publicly. GitHub recently adopted a bounty program, which had already been
pioneered by other large internet companies, like
[Google](http://www.google.com/about/appsecurity/reward-program/) and
[Facebook](https://www.facebook.com/whitehat). These programmes aim to engage
with "independent security researchers" (also known as "white hats") to offer
rewards for finding and reporting bugs.

This reminds me of back in Oct 2008. I was using a service called "blip.fm"
that aimed to be a "Twitter for DJs" but I was having issues with the player
in my browser. I fired up some debugging tools and, with no effort,
uncovered a security issue that revealed private user data about any user.
I never actually managed to solve the player bug, but I did report the
information disclosure issue to the site, to which they responded:

<blockquote>"Funny, we took the time to make all that kind of stuff private in
  our upcoming api and here we were passing stuff around in the clear right now
  - thanks for the heads up, we'll get this fixed."
<cite>- Ryan (Blip.fm)</cite></blockquote>

I'm not a security researcher, "white hat", or any other type of hat. I don't
regularly do "security research", but I do know what mistakes to look for when
reviewing a Drupal site and it's supporting infrastructure.


##Security is hard

Further comments about Egor's post on Hacker News go on to talk about why
security is hard.

<blockquote>I'm wondering if someone of Github's caliber can be hacked so easily,
  what about the rest of the masses developing web apps. -
<cite> enscr (Hacker News)</cite></blockquote>

<blockquote>Infosec is hard, but it is just one example of a bigger truth:
Defense is hard.
This comes up time and time again in any defensive discipline.
 The one pecularity of InfoSec; you do not have any offensive capabilities. -
<cite>dfc (Hacker News)</cite></blockquote>


###Minor flaws combine to make serious exploits

The GitHub vulnerability was found in their implementation of the
[OAuth 2](http://en.wikipedia.org/wiki/OAuth) standard.
OAuth 2 is an authentication and authorisation protocol designed to
grant certain 3rd parties (eg mobile apps or
other web sites) controlled access to
resources in your account on a service.

It's a complex protocol and services often make mistakes in their implementation
of the standard.

What Egor's work shows is that even small, simple
mistakes can be disastrous for security as when they
combine they can lead to much bigger issues.

###No one gets it right every time

Everyone makes mistakes. No programmer has ever written perfect code, especially
when working under the time and budget pressures of commercial projects.

<blockquote>Given a reasonably competent development team, you can usually make a first pass and find quite a number of low-hanging fruit security issues. Everyone makes mistakes, especially when under pressure to get a product out. Once those are gone you can use fuzzing and/or static analysis type techniques to find another set, but after that you get to the point where the bugs start getting quite obscure and require a fairly deep knowledge of how the system works so you can start stringing multiple problems together to get to a real security issue. -
<cite>georgemcbay (Hacker News)</cite></blockquote>

You need to implement code review, and ideally hire third-parties to conduct audits.

##Drupal security

Drupal has it's own [Security Team](https://drupal.org/security-team)
and [processes for reporting security issues](https://drupal.org/node/101494).
The Drupal product itself has a good track record for security.

But this only really covers the core of Drupal, and contrib modules.
Almost all security issues I have
found on Drupal sites arise from miss-configuration, custom themes, and custom modules.
Which makes sense, if you think about it, because that code does not get the
same level of public scrutiny as the open-source code released on Drupal.org.

Here are some pointers, to help with Drupal security. But, I do recommend getting
someone else to look over your code before pushing it into production.


###Secure coding

According to the [Web Application Hacker's Handbook](http://mdsec.net/wahh/)
only a small percentage of website vulnerabilities today come from SQL injection.
This is easy to protect against in Drupal by making correct use of the
database abstraction layer. Check all custom code for calls to `db_query` to
ensure it correctly passes in parameters to queries using the provided mechanism
for escaping dangerous characters.

More common vulnerabilities today come from Cross-Site scripting (XSS) and
Cross-site Request Forgeries (CSRF).

####XSS

XSS is the result of failing to take proper care when dealing with user input.
Drupal provides many mechanisms for dealing with user-input, but you have to
remember that Drupal takes a "filter on output" approach and always stores the
original user input.

This means that you have to always filter anything you output. Most sites I've
reviewed have missed this somewhere in their custom code.

Drupal provides several mechanisms for doing this, but if they are missing from
your code then you are doing something wrong. The functions to look for are:

 * [`check_url`](https://api.drupal.org/api/drupal/includes!common.inc/function/check_url/7)
 * [`check_plain`](https://api.drupal.org/api/drupal/includes!bootstrap.inc/function/check_plain/7)
 * [`check_markup`](https://api.drupal.org/api/drupal/modules!filter!filter.module/function/check_markup/7)
 * [`filter_xss`](https://api.drupal.org/api/drupal/includes!common.inc/function/filter_xss/7)

Another essential requirement in protection against XSS is to ensure that you have
correctly configured input formats.

The [Better Formats](https://drupal.org/project/better_formats) module can be
useful to restrict input formats allowed in various places.

Any input filter, beyond the plain text filter, that you assign to a user should
be double checked to ensure it's configured securely. That means ensuring that
any HTML codes are filtered. You may want to allow a small set of safe tags
for basic formatting, but never allow image tags to any user you wouldn't trust
with full admin access to the server.

There is no difference if image tags are entered by the user, or via a WYSIWYG
editor, they are still a big security hole. If you absolutely must have
users posting images ensure they are always correctly filtered and always hosted
from your server. The [image resize filter](https://drupal.org/project/image_resize_filter)
can help with this.


####CSRF

CSRF exploits a user's logged in session by forging requests to the site that are
initiated without the user being aware. If you have a GET request that
causes some state change in your app or data, then you have the potential for
a CSRF exploit. GET requests are not supposed (by the HTTP standard) to allow
for this anyway, but, if you do need a state changing GET request you have a couple
of options:

 1. Use a tokenized URL, for example,
the flag links generated by Drupal's Flag module. Ensure that the links are
generated with a unique token so you can identify the resulting request and
confirm that it originated from a link that you generated. Luckily the Drupal
API (when properly used) can do this for you.

 2. Link to a confirm form, which uses a POST request to actually execute the
 change in the system. You see this all through Drupal core, for example when
 deleting a node. The Drupal API has functions to make simple confirmation pages.

CSRF is also possible in POST requests, but you are protected by the automatic
CSRF protection in the Drupal Form API. Make sure that all forms on your site
are generated and processed correctly. There's an old docs page
[here](https://drupal.org/node/178896) as a starting point.

####Access bypass

All custom code must use the proper mechanisms to ensure controlled access to
resources. The Drupal API provides various mechanisms to do this, including:

 * The Drupal menu system defines routes from URL paths to actual callbacks. It includes
 an access callback mechanism to check permissions before allowing access to the URL.
 * The `user_access` API function can be used to check the current user has a specified
 permission.
 * The node_access API should be used to correctly check access to content. This can
 be done in custom database queries by using `$query->addtag('node_access')`
 * Code that works defines custom entity types should also define their own access callbacks.

A common "bug" that I have seen in custom code is to accidentally assign to the
global user object. In one particular case a faulty `if` statement in a template
file was giving every user who accessed a specific node admin access. This is
possible the most dangerous typo I have ever seen in over 20 years of programming!


```
global $user;
if ($user->uid = 1) { echo 'hello admin'; }
```

That's not the actual code, but a similar example. Obviously the programmer had meant
to write `if ($user->uid == 1)`, which is a check for equality. There were many
other errors in the code which made this situation much worse. My recommendations were:

 * Move logic out of template files into a preprocess function.
 * Don't access the global `$user` object and instead pass an `$account` variable as a parameter to the template file.
 * Don't mess with the global `$user` object.
 * Oh, and don't mess with the global `$user` object.


###Passwords

You may have several different levels of user account (different roles) all
with different levels of authorisation. Enforcing strong passwords across all
accounts is essential. A compromised user account with hardly any permissions
combined with a privilege escalation vulnerability could combine to lead to
full pwning of your site and server.

There are modules available to help secure user accounts and sessions to
prevent unauthorised access, implement a password policy and restrict failed
login attempts:

 * [single_login](https://drupal.org/project/single_login) will detect and prevent duplicate logins on the same account.
 * [password_policy](https://drupal.org/project/password_policy) allows you to
 specify a set of constraints that all passwords must match.
 * [flood_control](https://drupal.org/project/flood_control) is built into Drupal 7
 but this module provides an admin UI for it.
 * [login_security](https://drupal.org/project/login_security) add various options
 to prevent the brute forcing of user accounts.

Improving UX can also help in security. Password requirements, failed logins,
failed registration attempts, etc all contribute to bad user experiences.
There are a few Drupal modules to help with this:

 * [password_tab](https://drupal.org/project/password_tab) moves the password forms
 out to a separate tab/page in the user account.
 * [prlp](https://drupal.org/project/password_tab) (or password reset landing page)
 fixes a common source of user support requests from lost passwords - this is how
 core password reset should really work!

###SSL

<strong>If you are not logging in to your site via HTTPS they you are handing out your
password to anyone on the same network as you.</strong> If any of your users access
via a public wifi this should be a concern. It's easy to pick up unencrypted network
traffic with applications like Wireshark or a WiFi Pineapple.

<strong>Probably the biggest issue I am seeing today is the lack of SSL in the Drupal
community.</strong> I don't understand why every site is not using either
[securelogin](https://drupal.org/project/securelogin),
[securepages](https://drupal.org/project/securepages) or some other method
to ensure that all logins and passwords are sent encrypted.

Ensure you have the server correctly configured to deliver over HTTPS
before enabling secure pages. Also be aware that serving over HTTPS is more
resource intensive than HTTP.

###Server issues

Securing your servers is a whole other story, and could take up several blogs
worth of information. Here's the basics:

 * Your production (live) site should run on a separate environment and the only
ports open on the machine should be 80 and 443, for HTTP and HTTPS traffic.
 * The rest of your environment should be strongly firewalled. This includes all the
backing services such as Databases, Redis cache, Solr search etc, management
applications like version control servers, and development and QA environments.
 * Avoid insecure protocols like FTP.
 * The server OS and all other software needs to be kept up-to-date.


###Information disclosure

This is a common issue that is picked up by penetration testers employed to
do testing on Drupal websites. There are many ways that a Drupal website
discloses more information that it needs to. Including:

 * HTTP headers revealing Drupal version, Apache/Nginx version, and PHP software
 versions.
 * robots.txt revealing admin URL locations
 * Metatags disclosing what software is being used
 * Drupal's default login error message confirms the existence of accounts.

Perhaps the most revealing information disclosure issue is with sites that
leave the `CHANGELOG.txt` file visible to the public. This file reveals the
exact version of Drupal that you are using, and from there it's easy to work out
what vulnerabilities your site could be open to.

I always recommend rewriting the location of `CHANGELOG.txt` and other
unnecessary files to a 404 error in the server config. This is better than
removing the files, as they could be accidentally restored during future
upgrades. The Apache config rules to do this are quoted in
[this file](https://github.com/darrenmothersele/aegir_secure_mods/blob/master/provision/securemods.drush.inc).

###And finally...

Turn off access for user 1. The super admin user who can do anything is never
required on a production site. Turn it off by setting status=0 in the database.

That is just a whirlwind tour of Drupal security, but it should be enough to
help you do a first-pass for obvious security issues.




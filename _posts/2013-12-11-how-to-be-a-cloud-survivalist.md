---
layout: post
title: How to Be a Cloud Survivalist (part 1)
feed: true
category: misc
tags: misc featured
---

This is the first in a series of posts where I document the process of
implementing your own suite of cloud services.

With a little bit of effort you can quite easily setup your own suite of
cloud services to rival the likes of Google. If you're concerned about
communication surveillance programs, selling of your personal data to
advertisers, security breaches, or maybe you just want to own and control your own data, there are some great options out there.


<!--break-->
A few months ago there was an article in Scientific American by Wendy Grossman
called <a href="http://www.scientificamerican.com/article.cfm?id=how-to-be-an-e-mail-survivalist">How to Be an E-Mail Survivalist</a>. In this article Wendy
discusses the pros and cons of running your own email service. I'm going to
ignore the fact that the article fails to mention any of the solid, robust,
open source mail server projects, in favour of recommending some weird proprietary
email server, as she makes a few interesting observations:

<blockquote>
In the early 2000s it was the height of geek fashion to run your own e-mail server—then along came Gmail with two gigabytes of free storage and excellent spam filtering. Now even most people with their own domain names use e-mail provided by Google, Microsoft or their Internet Service Provider (ISP).
<br>&mdash;<cite> Wendy Grossman</cite>
</blockquote>

I used to run my own mail server until Gmail came along. Prior to that I had
the headaches, the &quot;occasional day of pain&quot; as Wendy calls it,
when things stopped working for seemingly no reason. Back then I was stupidly
trying to run everything on one server. Not a good idea!

But, then Google came along and oftered their slick gmail interface and their
reliable email servers for use with your own domain. And, they gave it away
for free. All you had to do was give away ownership of your entire digital life
to them. A small price to pay for reliable email service?

### A small price to pay?

Maybe that seemed like a small price to pay at the time, but now I think
we're starting to realise the true costs. First up there's the issue
of government mass surveillance programmes. If you're wondering what all the fuss is about, then you need to read this excellent article from the EFF, <a href="https://www.eff.org/deeplinks/2013/11/busting-eight-common-excuses-nsa-surveillance">Busting Eight Common Excuses for NSA Mass Surveillance</a>.

Next there's the issue of T&amp;Cs. Have you ever read one of these documents?
What are you actually giving away when you
tick that box and agree to the terms and conditions? Giving away ownership of
data and the content you create? Agreeing that they're not responsible if
anything should happen to your data? Agreeing to sharing of your data with
third parties? Remember that even
<a href="http://news.cnet.com/8301-13739_3-9826608-46.html">anonymised data
can be de-anonymised</a>.

Then, there's the security issue. The news is full of high-profile security breaches, like customer data being stolen from Adobe, DropBox, Evernote and
posted publicly on the internet. I know there's nothing to say you will be
able to implement any better security than these guys, but at least you'll be
less of a target. More importantly though, it's under your control, so you
can be as militant or relaxed about security as you wish.

### Fashionable again

I've recently been rethinking that decision to move everything to Google,
and I've decided it's probably about
time it was fashionable to run your own email server again and take back
control. But, now I'm expecting a lot more from my own setup. It's not just a
reliable email service. I'm now looking for options to sync data (contacts,
calendars, files) across all my devices, access them from anywhere, and share them with friends.  Luckily in the self-hosted options have come along leaps and bounds in recent years so you can literally run the suite of entire cloud services that we've come to expect.

This will require some digging about in the technical details of how
all this stuff works. I've explained here the tech I'm using and how I've
glued it all together, but this is far from a complete solution. On the plus
side you don't have to compromise at all on functionality:

 * You'll be able to access your email, files, documents, music and photos from anywhere in the word, and have state of the art malware and spam protection.
 * You will own and control all your own data. It doesn't completely protect you
 from surveillance, as you could always have your internet connection tapped, but
 that wasn't a major concern for me. It certainly does make it harder though as your archive is under your control.
 * You'll not be subject to automated analysis of your data (unless for some
 crazy reason you want to, but that's the subject for future blog post!),
 no ad targeting, or selling on of your personal data.

<blockquote>There is something extraordinarily empowering about firing up e-mail software, connecting to your own server and retrieving your messages. Being in charge of a fundamental part of your communications life can restore your view of the Internet as a modern marvel. <br>&mdash;<cite> Wendy Grossman</cite></blockquote>

There are a few downsides, which we'll have to try and work around. One issue
is that because your email is not coming from one of the big mail companies, there's a higher chance that receiving servers will flag your email as spam. You also risk the chance of losing mails because of power outages or technical issues.
There's a few options to try and mitigate this which will be discussed in a
future installment when I look at backup and failure planning.

Tomorrow, in part 2, I'll be building up a list of requirements and looking at the various options that are available.












---
layout: post
title: Merging, moving and manipulating Git repositories
feed: true
category: web-dev
tags: git
---

I recently had the fun job of refactoring a large project that was spread across
several Git repositories. Luckily, Git has some really useful tools for moving
things around.

<!--break-->

First, as an aside, a link to a useful page for anyone getting into some
advanced Git work. Back when I started learning Git I found this
<a href="http://git-scm.com/2011/07/11/reset.html">explaination of Git Reset</a>
that totally expedited my understanding of Git.

Anyway, on with the post about moving Git branches around.

First merge into the master branch. We're not only moving things around to new
repos to improve the reuse across projects, we're moving toward a
<em>feature branch</em> strategy, rather than the
<em>stage/prod branching</em> we
had from <a href="http://nvie.com/posts/a-successful-git-branching-model/">this post</a>.

Because of this, our current version of the code was on staging branch, and
wanted to move over to the master branch. Merge into master branch, but avoid
losing the branching information by using the --no-ff flag.

    git merge --no-ff staging

You can delete remote branches, with

    git push origin :staging

This removes the staging branch from origin (it's ok the commit and branching
history was retained thanks to the --no-ff merge option).

Then, as mentioned in <a href="http://nuclearsquid.com/writings/subtree-merging-and-you/">
this article</a>, you add the original repo as a remote, adapt the command
to pull from github. The -f fetches the commits...

    git remote add -f other-project git@git...

Then prepare the sub-tree merge. Then actually read the sub tree over, applying
prefix (i.e. put it in a sub folder).

Commit merge and push back up to GitHub.

<em>As an aside:</em> if you accidentally push a merge you can undo it with:

    git revert -m 1 commit_hash

Now I want to move some stuff from one repo to another. But I don't want the
whole lot!. So, this time I clone a brand new copy - and remove everything
I don't want:

    git clone...
    git filter-branch --subdirectory-filter dir_to_save -- -- all

That removes everything except dir_to_save, resulting in a clean repo with only
files and history from dir_to_save.

Then I use the previous method to merge this remaining repo into the other repo.
I'll just repeat for good measure - don't push back this temp repo - stuff
has been removed and it only contains the stuff you don't want to keep!



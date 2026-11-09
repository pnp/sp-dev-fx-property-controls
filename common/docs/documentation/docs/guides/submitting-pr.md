# Submitting a PR

We appreciate your initiative and would love to integrate your work with the rest of the project! Here is how you can help us do it as quickly as possible.

- Check, that your feature branch is up-to-date. If it's not, there is a risk of merge conflicts or other issues that will complicate merging your changes into the main repository. Refer to these resources for more information on syncing your repo:
  - [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)
  - [AC: Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  - Looking for a quick cheat sheet? Look no further:

```bash
# assuming you are in the folder of your locally cloned fork....
git checkout v4-dev

# assuming you have a remote named `upstream` pointing to the official **sp-dev-fx-property-controls** repo
git fetch upstream

# update your local v4-dev branch to be a mirror of what's in the main repo
git pull --rebase upstream v4-dev

# switch to your branch where you are working, say "issue-xyz"
git checkout issue-xyz

# update your branch to update its fork point to the current tip of v4-dev & put your changes on top of it
git rebase v4-dev
```

- Submit v4 PRs to the **v4-dev** branch of the main repo.
- Let us know what's in the PR: is it a new command, bug fix or a minor update in the docs? The clearer the information you provide, the quicker your PR can be verified and merged
- Ideally 1 PR = 1 commit - this makes it easier to keep the log clear for everyone and track what's changed. If you're new to working with git, we'll squash your commits for you when merging your changes into the main repo
- Don't worry about changing the version or adding yourself to the list of contributors in `package.json`. We'll do that for you when merging your changes.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/SubmitPR)

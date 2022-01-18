module.exports = {
  git: {
    tagName: "v${version}",
    commitMessage: "release: v${version}",
    requireCleanWorkingDir: false,
    requireBranch: "main",
  },
  hooks: {
    "before:init": ["git pull origin main", "yarn test"],
  },
  npm: {
    publish: false,
  },
  prompt: {
    ghRelease: false,
    glRelease: false,
    publish: false,
  },
};

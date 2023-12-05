module.exports = {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        {
            name: 'staging',
            channel: 'beta',
            prerelease: 'beta',
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                assets: ['./*', 'CHANGELOG.md'],
                message: 'chore(release): ${nextRelease.version} [skip ci]',
            },
        ],

        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
    ],
};

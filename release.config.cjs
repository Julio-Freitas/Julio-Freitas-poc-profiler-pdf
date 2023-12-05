module.exports = {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        {
            name: 'staging',
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
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
    ],
    preset: 'angular',
};

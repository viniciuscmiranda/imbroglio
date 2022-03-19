#!/usr/bin/env sh

set -e

npm run build

cd dist

cp ../CNAME ./CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:viniciuscmiranda/imbroglio.git main:gh-pages

cd -
rm -rf dist/.git
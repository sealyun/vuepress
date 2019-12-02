vuepress build
git add .
git commit -m "update"
git push
cp -r .vuepress/dist/* ~/work/src/github.com/sealyun/sealyun.github.io
cd ~/work/src/github.com/sealyun/sealyun.github.io
git add .
git commit -m "update"
git push

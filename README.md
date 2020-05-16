# Serverless FrameworkでCRUDをマスターする　その１

# Serverless FrameworkでCRUDをマスターする　その２

# githubへのアップロード方法
githubで空プロジェクト（aws-nodejs-rest-api-with-dynamodb）を作成

https://github.com/nmatsuo63/aws-nodejs-rest-api-with-dynamodb

※README.mdはつくらない。

```
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/nmatsuo63/aws-nodejs-rest-api-with-dynamodb.git
git push -u origin master
```

※fatal: remote origin already exists.エラーへの対処法

https://qiita.com/hatorijobs/items/1cae1946656ece954c63

## ブランチを切る方法
ここでは他の開発者がcloneしてブランチを切ってpushしてmergeするまでをやってみる。
corsの設定を担当するので、cors-settingsというブランチとする。

```
mkdir cors-settings
git clone https://github.com/nmatsuo63/aws-nodejs-rest-api-with-dynamodb.git
cd aws-nodejs-rest-api-with-dynamodb/
git branch cors-settings
git branch
  cors-settings
* master
git branch -r
  origin/HEAD -> origin/master
  origin/master
git checkout cors-settings
git branch
* cors-settings
  master
```

ここで、README.mdを修正したとする。~~

```
git add .
git commit -m "add cors-settings to README.md"
[cors-settings 89f13f1] add cors-settings to README.md
 1 file changed, 29 insertions(+)
git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
git merge cors-settings
Updating 298d900..eb804cf
Fast-forward
 README.md | 29 +++++++++++++++++++++++++++++
 1 file changed, 29 insertions(+)
```


# リモートリポジトリへの反映
```
git push -u origin cors-settings
git push -u origin master
```

# 
```
git branch
  cors-settings
* master
git branch -r
  origin/HEAD -> origin/master
  origin/cors-settings
  origin/master
git checkout cors-settings
Switched to branch 'cors-settings'
Your branch is up to date with 'origin/cors-settings'.
git add .
git commit -m "add cors-settings to README.md 5"
[cors-settings 52f32ae] add cors-settings to README.md 5
 1 file changed, 1 insertion(+), 1 deletion(-)
git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 4 commits.
  (use "git push" to publish your local commits)
git merge cors-settings
Auto-merging README.md
Merge made by the 'recursive' strategy.
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
git push origin cors-settings
```

# VS codeで矩形選択
Shift+Option+Commandを押しながら矢印。ESCで解除
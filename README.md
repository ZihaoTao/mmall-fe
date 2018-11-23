#### 
mmall-fe: frontend project


##### installation
1. nodejs(6.14.1)
* Website:https://nodejs.org/en/download/releases/
```
> wget https://nodejs.org/download/release/v6.14.1/node-v6.14.1-linux-x64.tar.gz
```
* unzip to this directory
```
> tar -zxvf node-v6.14.1-linux-x64.tar.gz -C /usr/local/
```
* add environment variables
```
> vim /etc/profile
add:
export NODE_HOME=/usr/local/node-v6.14.1-linux-x64
export PATH=$NODE_HOME/bin:$PATH
```
* source file
```
> source /etc/profile
```
2. webpack(4.6)
* use npm to install
```
> npm install webpack -g
> npm install webpack-cli -g
```
3. node-sass
```
> npm install node-sass -g
> node-sass -v
```
4. hogan.js
```
> npm install hogan.js --save
```
##### Deployment
1. Initialization  
> cd mmall-fe   
> npm install
2. package    
> npm run dist   
3. create and rewrite files   
> mkdir /product/ftpfile/frontend   
> cd /product/ftpfile/frontend   
> mkdir mmall-fe   
> mkdir admin-fe   
> cp -R /developer/git-repository/mmall-fe/dist/ ./mmall-fe/   
> cd mmall-fe  



Room Draw
=========

A project by DevX (the Carleton Developers Exchange).

To develop on this project, install node.js and then run these commands:

install meteor.js:
```curl https://install.meteor.com/ | sh```

install meteorite:
```sudo -H npm install -g meteorite```

install packages:
```
mrt add iron-router
mrt add accounts-entry
mrt add iron-router-progress
```
(but in might install them all in one go)

and then use ```mrt``` instead of ```meteor``` to run the app.


Currently hosted at [roomdraw.meteor.com](http://roomdraw.meteor.com)

Deploying
---------

1. Comment-out lines 7-10 in /server/main.js (where it clears the dbs)
2. Run ```meteor deploy carldraw.com --delete```
3. Run ```meteor deploy --debug carldraw.com```
3. Create an admin account
4. For the big unveiling, post on FB as DevX with a link and say, “we’re live!”

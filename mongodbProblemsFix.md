Before starting Compass you need to have a running instance of MongoDB

Step 2: Start and enable the MongoDB service

By default, the MongoDB service is disabled upon installation. You can verify this by running the command:
1. sudo systemctl status mongod

To start the MongoDB service execute the command:
2. sudo systemctl start mongod

Once again, confirm if the service is running:

3. sudo systemctl status mongod

In case the service is still not running. There might be a problem with your
user permissions.
To temporary fix this problem run these commands:

1. sudo rm -rf /tmp/mongodb-27017.sock
2. sudo service mongod start

That shall be fault due to user permissions in .sock file, You may have to change the owner to monogdb user.
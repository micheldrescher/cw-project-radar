# Setting up a development environment

Setting up your development environment is fairly straight forward, and comprises the following steps.

However, the following prerequisites must be met:

1. [**Git:**](https://git-scm.com/downloads) Make sure it is available on the the command line.
1. [**Node.js:**](https://nodejs.org/en/) Version 14 or above must be installed globally, including npx.
1. [**MongoDB Community Server:**](https://www.mongodb.com/try/download/community) It is best to install it locally for ease of use and development experience. You can use a cloud based server (with authentication and all) but that requires more admin overhead.
1. [**OpenSSL:**](https://www.openssl.org/source/) Qhile strictly not necessary, the project uses it for convenience when creating self-signed certificates.

## Checking prerequisites

Open a terminal, and execute git, node, and mongod to show their respective version numbers:
```
user$ git --version
git version 2.20.1 (Apple Git-117)
user$ 
user$ 
user$ node --version
v14.15.3
user$ 
user$ 
user$ mongod --version
db version v4.2.2
git version: a0bbbff6ada159e19298d37946ac8dc4b497eadf
allocator: system
modules: enterprise 
build environment:
    distarch: x86_64
    target_arch: x86_64
user$ 
user$ 
user$ openssl version
LibreSSL 2.6.5
user$ 
```

## Setting up local repository

### 1. Clone the repository ###

In a terminal, change into the project's parent directory, and execute `git clone https://github.com/micheldrescher/cw-project-radar.git` This will create the project folder, download the entire codebase, and set up a local repository for you. 

```
user$ git clone https://github.com/micheldrescher/cw-project-radar.git
Cloning into 'cw-project-radar'...
remote: Enumerating objects: 639, done.
remote: Counting objects: 100% (639/639), done.
remote: Compressing objects: 100% (410/410), done.
remote: Total 3420 (delta 350), reused 450 (delta 210), pack-reused 2781
Receiving objects: 100% (3420/3420), 5.50 MiB | 3.03 MiB/s, done.
Resolving deltas: 100% (1948/1948), done.
user$
```

### 2. Install node modules ###

Next up, install the necessary Node.js modules: `cd cw-project-radar` and `npm install`

```
user$ cd cw-project-radar
user$ npm install

> cw-project-radar@0.7.4 preinstall [MASKED]/cw-project-radar
> npx npm-force-resolutions

npx: installed 5 in 1.712s

[INSTALLATION MESSAGES]

added 1631 packages from 816 contributors and audited 1620 packages in 60.143s

65 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

user$ 
```

### 3. Create self-signed certificate (optional)

If you decide to run the local dev env using HTTPS - it is equally possible to run it using HTTP - you need to create a self-signed certificate and corresponding private key like so:

```
user$ npm run selfsign

> cw-project-radar@0.7.4 selfsign [MASKED]]/cw-project-radar
> openssl genrsa -out key.pem && openssl req -new -key key.pem -out csr.peM && openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem && rm csr.pem

Generating RSA private key, 2048 bit long modulus
........................+++
.............................................+++
e is 65537 (0x10001)
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:UK
State or Province Name (full name) []:Oxfordshire
Locality Name (eg, city) []:Oxford
Organization Name (eg, company) []:University of Oxford
Organizational Unit Name (eg, section) []:OeRC
Common Name (eg, fully qualified host name) []:localhost
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:challenge
Signature ok
subject=/C=UK/ST=Oxfordshire/L=Oxford/O=University of Oxford/OU=OeRC/CN=localhost
Getting Private key
user$ 
```

This creates two files in the project directory; `cert.pem` and `key.pem`. These two files are important, comprising the certificate and the private key. Keep those out of reach of anyone else, and make sure they are NOT checked into the repository! The checked in file `'gitignore` makes sure of that, but it is your responsibility to not override that behaviour.

### 4. Server configuration

It is now time to configure some server settings. This project makes use of the `dotenv` module, meaning that all server configuration is expected to be found in file `.env` in the root directory of your project.

Since this configuration file will contain sensitive information (e.g. usernames, passwords, secret keys), it is not stored in the repository (thanks to `.gitignore`) - but it is your responsibility to keep access to this file safe and secure from prying eyes.

The template `.env.template` contains all information you need to know. For a production system, using the build scripts, you need to create a file `.env.dev` which is then copied to `.env` by the project scripts. Likewise, a `.env.prod` file will contain production grade settings. This way, you can maintain two different configuration sets without manually editing `.env` before each dev env run.

Copy `.env.template` to `.env.dev` and open it in your favourite text editor. The following variables **MUST** be configured - all other is optional with default values, or must be left alone (i.e. section 'domain configuration'):
1. `DB_URL` - this is the URL to connect to your MongoDB server. If you run the server on localhost, it most likely will be `mongodb://localhost:27017/cw-project-radar?ssl=false`
2. `JWT_SECRET` - this is the secret passphrase with which JSON Web Tokens (JWT) are encrypted and signed. 
3. `JWT_EXPIRES_IN` - the expiry date of the JWT in hours. THe project enforces a maximum of 24 hours for JWTs for security purposes.

### 5. Priming the database

The repository comes with a number of scripts required to prime the database with 

1. The minimal information necessary to start from scratch, OR
2. Prime the database with the reference data set created and collected by the Cyberwatching.eu project up to and including 31 December 2020.

### 5.1 Priming the database

The scripts provided in the repository REQUIRE that MongoDB runs locally on the dev env computer. Otherwise you are required to adapt the scripts to suit your local needs prior.

This steps comprises of executing one shell script (Linux, Mac OS X). This script will execute two Javascript scripts directly on MongoDB to:
1. Drop any existing database with the name `cw-project-radar`
1. Create all necessary document collections, including search indexes
1. Create a unique proejct id sequence
1. Create the default administrator user account (see below)

Open a terminal and change into the project directory. Then invoke the priming shell script like so:

```
user$ cd [MASKED]/cw-project-radar
user$
user$ ./scripts/mongo/init.sh
*************************
* INITIALISING DATABASE *
*************************
MongoDB shell version v4.2.2
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("81319775-70c4-4254-ae6f-309cd892425b") }
MongoDB server version: 4.2.2
MongoDB shell version v4.2.2
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4762d318-c9cb-458d-ac34-69c580bba337") }
MongoDB server version: 4.2.2
user$
user$
```

Setting up the dev env is now complete. You may continue to [URL TO NEXT DOC] or, optionally, import the baseline data set as described below.

### 5.2 Import the reference dataset

**Important:** You MUST prime the database first before you import the dataset.

Open a terminal and change into the project directory. Then execute the data import script like so:

```
user$ cd [MASKED]/cw-project-radar
user$
user$ ./scripts/mongo/import.sh
*******************
POPULATING DATABASE
*******************
MongoDB shell version v4.2.2
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("1518b740-6712-449a-b235-e872609a02e5") }
MongoDB server version: 4.2.2
2021-01-05T18:00:58.125+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.135+0000	1 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.176+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.204+0000	260 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.244+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.256+0000	228 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.296+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.302+0000	113 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.363+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.368+0000	5 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.408+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.438+0000	5 document(s) imported successfully. 0 document(s) failed to import.
2021-01-05T18:00:58.498+0000	connected to: mongodb://localhost/
2021-01-05T18:00:58.500+0000	1 document(s) imported successfully. 0 document(s) failed to import.
user$
user$
```

Pay attention to the response messages from MongoDB - all documents must be successfully imported.

This concludes setting up the dev env. Continue with the [NEXT SECTION].

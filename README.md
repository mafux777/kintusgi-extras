# Kintsugi-X Token Transfer Analytics

Kintsugi was built to liberate KBT. In the form of KBTC, it moves freely around, 
for example to and from Karura and Moonriver.

To understand Kintsugi, we need to understand token movements within the Kintsugi
Chain and across, to other chains. 

Since the Kintsugi Squid does not offer token transfers, we build another squid
(Kintsugi-X) and analysed the data in a Python notebook. We show how this analysis
can be used to label Account IDs in meaningful ways.

Finally, we used an open source visualisation framework for Python to build 
a new dashboard.

![image](https://user-images.githubusercontent.com/72612765/174494702-43d9d97c-2f40-496c-89a7-ee3db219bde1.png)


## Prerequisites

* node 16.x
* docker

## Instructions

```bash
# 1. Install dependencies
npm ci

# 2. Compile typescript files
npm run build

# 3. Start target Postgres database
docker compose up -d

# 4. Apply database migrations from db/migrations
npx sqd db create
npx sqd db migrate

# 5. Now start the processor
node -r dotenv/config lib/processor.js

# 6. The above command will block the terminal
#    being busy with fetching the chain data, 
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
npx squid-graphql-server
```
## Disclaimers

This simple squid is built using the template from subsquid.io.

Token transfers are only captured from Kintsugi to Moonriver and Karura, not
the other way round. To analyse inbound transfers, it may be necessary to use
squids from Karura and Moonriver, since they probably contain more relevant
details than the events happening on Kintsugi. 


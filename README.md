##### To install the required packages
```
npm install
```

##### To start the server with SSL
```
npm run start:https
```

##### To start the server with production ready files
```
npm run start:prod
```

Make sure there exists a .env file with the following content
```
ACCOBOT_ENDPOINT=<ACCOBOT_ENDPOINRT>
ACCOBOT_CORP_ID=<ACCOBOT_CORP_ID>
ACCOBOT_AUTH_KEY=<ACCOBOT_AUTH_KEY>
ACCOBOT_USER_ID=<ACCOBOT_USER_ID>
SPEECH_ENDPOINT=<SPEECH_ENDPOINT>
INPUT_LANGUAGE=<cantonese|mandarin|english-usa>
OUTPUT_LANGUAGE=<cantonese|mandarin|english-usa>
```
Then the ChatUI can be accessed at [https://0.0.0.0:3001/chatui](https://0.0.0.0:3001/chatui)

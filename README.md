# surge-token
This class is a utility that allows obtaining the locally hosted access token from [surge.sh](https://surge.sh/)
## Install
```sh
npm install git+https://github.com/thebr0k3r/surge-token
```
```sh
yarn add git+https://github.com/thebr0k3r/surge-token
```
## Usage
```ts
import SurgeToken from "surge-token";

const surge = await SurgeToken.create()

surge.getAuthToken()
surge.getCredentials()
```
##
- [surge.sh](https://surge.sh/)
- [github.com/sintaxi/surge](https://github.com/sintaxi/surge)

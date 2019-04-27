# React Electron App
Create React Electron App Ready Configured For Production Build

This package creates **React+Electron App** using the famous [create-react-app](https://github.com/facebook/create-react-app#readme)
library and following the additional steps taken from [this blog](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)



## Install
To Install The Package Simply Run:
```bash
npm install react-electron-app -g
```

## Usage

After installing the package simply run

```bash
react-electron-app new <appname>
```

## Running the Project

to start the electron browser in development mode simply type

```bash
npm run electron-dev
```

to pack the electron app simply type

```bash
npm run electron-pack
```

by default this package will build the app for Mac OS, Linux and Windows. You can specify one of them by editing the `package.json`
file

```json
"electron-pack": "build -c.extraMetadata.main=build/electron.js -mlw",
```
change the `-mlw` to the OS's you want to build the electron app for.
  * -m : Mac OS
  * -l : Linux  
  * -w : Windows

The packaged app will be generated in the `dist/` directory.

### Be Amazing ..

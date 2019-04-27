const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const fs = require('fs');

module.exports.create_app = (name) => {

  let create_react_app = spawn('npx', ['create-react-app', name]);

  console.log();

  console.log('\x1b[35m%s\x1b[0m', 'Create [React/Electron] App');

  console.log();

  create_react_app.stdout.on('data', data => console.log(data.toString()));

  create_react_app.stderr.on('data', data => console.log(data.toString()));

  create_react_app.on('exit', code => {

    console.log('adding electron packages')

    console.log();

    let add_electron = spawn('yarn', ['add', 'electron', 'electron-builder', 'wait-on', 'concurrently', '--dev'], { cwd: `${process.cwd()}/${name}` })

    add_electron.stdout.on('data', data => console.log(data.toString()))

    add_electron.stderr.on('data', data => console.log(data.toString()));

    add_electron.on('exit', code => {

      console.log('adding electron-is-dev')

      let electron_is_dev = spawn('yarn', ['add', 'electron-is-dev', 'typescript', 'fsevents'], { cwd: `${process.cwd()}/${name}` });

      electron_is_dev.stdout.on('data', data => console.log(data.toString()));

      electron_is_dev.stderr.on('data', data => console.log(data.toString()));

      electron_is_dev.on('exit', code => {

        console.log()

        console.log('creating electron file');

        fs.readFile(`${__dirname}/electron_file.txt`, 'utf-8', (err, data) => {

          if (err) console.log(err);

          fs.writeFile(`${process.cwd()}/${name}/public/electron.js`, data, err => {

            if (err) throw err;

            console.log();

            console.log('Editing package.json');

            console.log();

            console.log('\x1b[32m', 'package.json edited successfully');

            fs.readFile(`${process.cwd()}/${name}/package.json`, 'utf-8', (err, file) => {

              if (err) throw err;

              let json = JSON.parse(file);

              json["main"] = "public/electron.js"

              json["scripts"]["electron-dev"] = "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""

              json["scripts"]["electron-pack"] = "build -c.extraMetadata.main=build/electron.js -mlw"

              json["scripts"]["preelectron-pack"] = "yarn build"

              json["author"] = "Captain Electron"

              json["homepage"] = "./"

              json["build"] = {
                "appId": "com.example.react-electron-app",
                "files": [
                  "build/**/*",
                  "node_modules/**/*"
                ],
                "directories": {
                  "buildResources": 'assets'
                }
              }

              fs.writeFile(`${process.cwd()}/${name}/package.json`, JSON.stringify(json, null, 2), err => {

                if (err) throw err;

                console.log();

                console.log('\x1b[35m', `run the following commands`);

                console.log();

                console.log('\x1b[36m', `1- cd ${name}`);

                console.log();

                console.log('\x1b[36m', `2- yarn`);

                console.log();

                console.log('\x1b[35m', 'To Run The App In Development Run');

                console.log();

                console.log('\x1b[36m', 'npm run electron-dev for development');

                console.log();

                console.log('\x1b[35m', 'To Pack The Electron App Run');

                console.log();

                console.log('\x1b[36m', 'npm run electron-pack for production');

                console.log();

                console.log('\x1b[36m', 'Be Amazing ..');

              })

            })

          })

        })

      })

    })

  });

}

# Moddable Project Boilerplate

This is a boilerplate for projects with [Moddable SDK](https://www.moddable.com/).
This repository enhances your developer experience with a number of
Node.js developer tools that are the de facto standard today.

* TypeScript
* ESLint
* Prettier
* npm
* Docker devcontainer for VSCode

## Installation

### With Devcontainer

* Install the required.
  * VSCode
  * Docker and docker-compose
* Open this repository with VSCode
* Click a green arrow on bottom-left of the window
* Select "Reopen in container" on popup
* Install npm dependencies

```cmd
$ npm install
```

* Allow opening GUI from inside a container

```cmd
# in host environment
$ xhost +local:
```

### without devcontainer

* Install the required
  * Moddable SDK
  * Node.js ~10.0
* Install npm dependencies

```cmd
$ npm install
```

## Usage

### Debug

```cmd
$ npm run debug:[m5stack|lin]
```

### Deploy

```cmd
$ npm run deploy:[m5stack|lin]
```

## LICENSE

This boilerplate is distributed under Creative Commons Zero license.
You can use, modify and redistribute it without notice.
See [LICENSE](./LICENSE) for the detail.
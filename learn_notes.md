# Deno First Look

## Typescript

-   deno treats typscript as a first class citizent and so compilation is done by deno rather than us having to compile to js and run the js files
-   This is done behind the scenes by deno, and the files are kept in a cache folder on the system. These caches directories can be found with `deno info`
-   typescript transpiled code will be found in the `..../cache/deno/gen`

## Safety First

-   Unlike node, deno does not have access to many things on the system it is running on by default. You have to run it with flags specifically allowing it to do things.
-   An example would be

```typescript
// app.js
const message: string = "Hi, world";
await Deno.writeTextFile("./file.txt", message);
```

-   This code above will not run with `deno run app.js`. Instead you will need to give deno write access with a flag. So...
    `deno run --allow-write app.ts` will allow this code to run as intended.
-   \*\*\* note in this code that deno supports top-level await
-   \*\*\* also note the global Deno object that carries, along with the standard library, alot of the base functionality.
-   So for example, to access the arguments from the command line you would use `Deno.args` rather than node's `process.argv`
-   In node to access environment variables one would use the process.env object with the variable as a key name, as below.

```js
//app.js
process.env.PRODUCTION;
```

`node app.js`

-   In deno, this is quite different. You will need to access it as follows

```typescript
//app.ts
Deno.env.get("PRODUCTION");
```

`deno run --allow-env app.ts`

-   \*\*\* note the app is run with the flag --allow-env

## CLI tools

-   There is a built in formatter run with `deno fmt <file or folder name here>`
-   Written in rust, so it is seriously fast
-   Formatter means don't need a
-   cli flags must come before the file
-   testing is run from the command line `deno test`
-   there is a built in watch flag in deno

## Dependencies

-   Deno trys to stay as close to a browser so use import from url
-   Deno will download dependency once and cache it
-   Deno will not let you import without the file extension
-   can examine the dependencies by using `deno info <filename>`
-   Present common convention is to use a deps.ts or deps.js to import all remote dependencies from url and then to export them from there and import from this file. (or module)
-   There is some node compatiblity [node compatibilty](https://deno.land/std@0.91.0/node/README.md)

## Permissions

-   Permissions are allowed with flags
-   Specificity of flags is allowed and is a good idea.
-   `deno run --allow-read app.ts` would allow access to read the whole file system
-   `deno run --allow-read=. app.ts` would only allow read access to the current directory

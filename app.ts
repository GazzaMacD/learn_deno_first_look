// first program, it is js and ts
console.log(
    "Hello world, deno is awesome, typescript is a first class citizen"
);
// Use global Deno object to access many functions
// access command line args with  Deno.args
console.log(Deno.args);
const arrStrings: Array<string> = ["hi", "bye", "yo"];

//Permissions on Deno
const status = await Deno.permissions.request({ name: "read", path: "../" });
if (status.state === "granted") {
    // This will require read access as givin abovie
    const fileResults = Deno.readDir("../");
    for await (const result of fileResults) {
        console.log(result);
    }
} else {
    console.log(
        "This program requires read permission on ../ directory to run."
    );
}

const wStatus = await Deno.permissions.request({ name: "write", path: "." });
if (wStatus.state === "granted") {
    // This will require read access as givin abovie
    const message: string = "My first file";
    await Deno.writeTextFile("./file.txt", message);
} else {
    console.log(
        "This program requires write permission on ../ directory to run."
    );
}

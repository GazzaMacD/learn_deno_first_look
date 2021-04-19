console.log("hello world");

// Use global Deno object to access many functions
const message: string = "My first file";
await Deno.writeTextFile("./file.txt", message);
// access command line args with  Deno.args
console.log(Deno.args);
//
const arrStrings: Array<string> = ["hi", "bye", "yo"];

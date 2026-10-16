import fs from "node:fs/promises";



let str = "";

const size = 12 * 1024;

for(let i = 0; i< size; i++){
   if(i > 0 && i % 10 ===0) {
     str += "\n";
     continue;
   }
   str += "a ";
}

await fs.writeFile("./number.txt", str, );
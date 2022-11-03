const { exec } = require("child_process");

// COMANDOS DEL process PARA VER DISTINTA INFO
//console.log("Version de node: " + process.version);
//console.log("Sistema operativo: " + process.platform);
//console.log("Directorio actual del trabajo: " + process.cwd());

exec("ls -lh", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

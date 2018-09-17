const fs = require("fs");
const path = require("path");

const params = process.argv;
let token = "";
if (params && params.length > 0) {
  token = params.pop();
}

const package = fs.readFileSync(path.join(__dirname, "../package.json"), "UTF8");
let sonarProps = fs.readFileSync(path.join(__dirname, "../sonar-project.properties"), "UTF8");
if (package && sonarProps) {
  const pkg = JSON.parse(package);
  sonarProps += `sonar.login==${token}\n`;
  sonarProps += `sonar.projectVersion=${pkg.version}\n`;
  fs.writeFileSync(path.join(__dirname, "../sonar-project.properties"), sonarProps, { encoding: "UTF8" })
}

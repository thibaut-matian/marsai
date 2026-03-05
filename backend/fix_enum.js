const { sequelize } = require("./src/models");

const values = ["j'aime", "je n'aime pas", "à discuter", "null", "signalé"];
const enumStr = values.map((v) => `'${v.replace(/'/g, "\\'")}'`).join(",");
const sql = `ALTER TABLE \`notes\` CHANGE \`decision\` \`decision\` ENUM(${enumStr}) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL`;

console.log("SQL:", sql);

sequelize
  .query(sql)
  .then(() => {
    console.log('✅ ENUM corrigé (espace supprimé dans "à discuter")');
    return sequelize.query("SHOW COLUMNS FROM notes LIKE 'decision'");
  })
  .then(([cols]) => {
    console.log("Colonne actuelle:", cols[0].Type);
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌", e.message);
    process.exit(1);
  });

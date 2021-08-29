module.exports = {
  "*.{js,json,md,ts,tsx}": "prettier --write",
  "*.[jt]s?(x)": ["eslint --fix"],
  "*.ts?(x)": () => "tsc --noEmit"
};

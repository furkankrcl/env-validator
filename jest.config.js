module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"], // TypeScript dosyalarını destekler
  transform: {
    "^.+\\.tsx?$": "ts-jest", // TypeScript dosyalarını Jest ile dönüştürür
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

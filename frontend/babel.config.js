module.exports = {
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic" 
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ],
  "overrides": [
    {
      "test": "**/*.mjs", 
      "sourceType": "unambiguous" 
    }
  ]
};

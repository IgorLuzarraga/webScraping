module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "plugins": [
        "mocha"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:mocha/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "test/setup.js"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    },
    "globals": {
        "expect": true,
        "assert": true,
        "should": true
    },
}

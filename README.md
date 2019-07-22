# request-catwalk
👠 Strut your API Stuff!

This CLI generates pages that allow you to create a form for your APIs without having to do it yourself. Great for making a presentation showing off some API

Currently this only works with GET requests and Query String parameters.

## Installation

This repo uses the new fancy [GitHub Package Registry](https://github.com/features/package-registry)

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."


`$ npm install @geooot/request-catwalk`

Or add this package to your `package.json` file:

```
"dependencies": {
    "@geooot/request-catwalk": "1.0.0"
}
```

## Usage
```
USAGE
  $ catwalk [COMMAND]

COMMANDS
  build   build a request page for a request definition json file
  help    display help for catwalk
  server  build a request page for a request definition json file then serve it on a page
```

### `$ catwalk build`
```
USAGE
  $ catwalk build [FILE]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  Output file to write generated HTML (if not specified, output will be stdout)

EXAMPLE
  $ catwalk build definition.json
```

### `$ catwalk server`
```
USAGE
  $ catwalk server [FILE]

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  network port to serve catwalk page. (Default: 8080)

EXAMPLE
  $ catwalk server definition.json
```

## Definition Schema
```
{
    "requestType": "GET",   // TODO: add more
    "url": string           // Url endpoint to call
    "queryParams": {
        "someQueryParameterName": { // These objects are called Configurables, String Configurable and Json Configurable have more options
            "type": "BOOL" | "STRING" | "JSON",
            "name": string  // optional
        }
        "hereIsAShortHand": "BOOL" | "STRING" | "JSON"  // You can quickly just assign types without defining the name or other options
    }
}
```

### String Configurable
You can define `options` which limits whats strings can be typed to those specified options.
```
{
    "type": "STRING",
    "name": "Some pretty name to make this human readable"  // optional
    "options": [    // optional
        "One",
        "Two",
        "Three
    ]
}
```

Each option can also specify its own name and value sepperately
```
{
    "type": "STRING",
    "name": "Some pretty name to make this human readable"  // optional
    "options": [    // optional
        {"name": "Some pretty name", "value": "theActualValueSentToServer"},
        "Two",
        "Three
    ]
}
```

### JSON Configurable
You can define `data` which is an object containing Configurables to be added to a JSON object. For query parameters the JSON object will be stringified and added to the query string.
```
{
    "type": "JSON",
    "name": "Some pretty name to make this human readable"  // optional
    "data": {
        "hereIsABoolConfigurable": "BOOL",
        "anotherCoolKey": {
            "type": "STRING"
            "name": "How cool are you?",
            "options": [
                "Super Cool",
                "Extremely Cool",
                "Borderline Frostbite"
            ]
        }
    }
}
```

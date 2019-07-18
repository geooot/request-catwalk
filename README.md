# request-catwalk
👠 Strut your API Stuff!

This CLI generates pages that allow you to create a form for your APIs without having to do it yourself. Great for making a presentation showing off some API
Currently this only works with GET requests and Query String parameters.

## Installation
Probably npm at some point...

## Usage
```
$ catwalk [COMMAND]

COMMANDS
  build  build a request page for a request definition json file
  help   display help for catwalk
```

### `build`
```
USAGE
  $ catwalk build [FILE]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  Output file to write generated HTML (if not specified, output will be stdout)

EXAMPLE
  $ catwalk build definition.json
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
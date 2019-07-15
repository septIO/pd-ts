I think we mean the same thing here.
```
ATTR [ > [ANY_KEYWORDS[:ANY:ARG:FOR:KEYWORD]*]*
```

Meaning that
```
speed > float:10:2, index:true, unique:true, nullable:false, default:99.9
speed > float::2, index, unique, nullable:false, default:99.9
speed > float, index, unique, default:99.9
speed > float:::99.9, index, unique
```
All of the above examples deserializes to the exact same object.
**Assumptions**

Keyword | Assumption
--- | ---
index | false
unique | false
nullable | false
increment | false (only available on ints)

Attribute | Assumptions
--- | ---
boolean | length:1
bit | length: 2
tinyint | length: 3
smallint | length: 5
mediumint | length: 7
int | length:11
bigint | length: 19
float | length: 11, precision: 2
decimal | length: 11, precision: 2
char | length: 1
string | length: 250
text | length: 65535

Basically, the verbosity can be small or big, depending on how strict the dev want it to be

# pipe-dream/core
This package supplies most of the frontend necessary for a Pipe Dream Language implementation

## Installation
Please refer to the [development guide](https://github.com/pipe-dream/docs/blob/master/README.md#pipe-dreamdocs)

### Running unit test

To run unit test, execute:
```
yarn test
```

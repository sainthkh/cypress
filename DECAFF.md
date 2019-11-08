# Packages

## cli -> None

## coffee -> None

## desktop-gui -> 
- [ ] /cypress/support/index

## electron
### lib/
- [ ] electron
- [ ] install
- [ ] paths
### test/
- [ ] electron_spec

## example -> none

## extension
### app/
- [ ] background
### lib/
- [ ] extension
### test/
- [ ] integration/background_spec
- [ ] unit/extension_spec
- [ ] spec_helper

## http-proxy 
- [ ] spec_helper
### helpers/
- [ ] certs
- [ ] http_server
- [ ] https_server
- [ ] proxy
### integration/
- [ ] proxy_spec
### unit/
- [ ] ca_spec
- [ ] server_spec

## launcher
- [ ] test/spec_helper

## network -> None

## reporter
- [ ] cypress/integration/aliases_spec

## root -> None

## runner -> None

## socket -> None

## static -> None

## ts -> None

## web-config -> None

## driver
### src/config
- [ ] bluebird
- [ ] moment
### src/cy/commands/actions
- [ ] check
- [ ] focus
- [ ] hover
- [ ] scroll
- [ ] select
- [ ] submit
- [ ] trigger
### src/cy/commands
- [ ] agents
- [ ] aliasing
- [ ] angular
- [ ] asserting
- [ ] clock
- [ ] commands
- [ ] connectors
- [ ] cookies
- [ ] debugging
- [ ] exec
- [ ] files
- [ ] fixtures
- [ ] local_storage
- [ ] location
- [ ] misc
- [ ] navigation
- [ ] popups
- [ ] querying
- [ ] request
- [ ] screenshot
- [ ] task
- [ ] traversals
- [ ] waiting
- [ ] window
- [ ] xhr
### src/cy/
- [ ] actionability
- [ ] aliases
- [ ] assertions
- [ ] chai
- [ ] ensures
- [ ] errors
- [ ] focused
- [ ] listeners
- [ ] location
- [ ] retries
- [ ] snapshots
- [ ] stability
- [ ] timeouts
- [ ] xhrs
### src/cypress/
- [ ] chai_jquery
- [ ] chainer
- [ ] clock
- [ ] command_queue
- [ ] command
- [ ] commands
- [ ] cookies
- [ ] cy
- [ ] error_messages
- [ ] events
- [ ] local_storage
- [ ] location
- [ ] log
- [ ] mocha
- [ ] runner
- [ ] screenshot
- [ ] selector_playground
- [ ] server
- [ ] setter_getter
- [ ] utils
- [ ] xml_http_request
### src/
- [ ] cypress
- [ ] main

### test/ TBA

## server TBA


Here's the detailed plan about this issue. 

### Little thoughts about this.

I guess the major causes of this issue not getting done are:

1. It's big and a chore. It isn't a fun thing to translate CoffeeScript to JavaScript. 
2. It creates big conflicts for Epic PRs like [Support Firefox](https://github.com/cypress-io/cypress/pull/1359), etc.

The solution to the first problem is "just do it". I guess we don't have other options.

And the solution to the second problem is to list Epic PRs and backport the changes to them. I guess we'll never meet a day that all of these PRs are done and everyone can happily remove coffee files without worrying about conflicts. 

### List of Epic PRs that need backport



# The Plan

## Part 1. Decaffeination

### Phase 1. Small Packages

Let's start small with small packages (I mean, all packages except driver and server).

#### List of coffee files. 

##### cli -> None

##### coffee -> None

##### desktop-gui -> 
- [ ] /cypress/support/index

##### electron
###### lib/
- [ ] electron
- [ ] install
- [ ] paths
###### test/
- [ ] electron_spec

##### example -> none

##### extension
###### app/
- [ ] background
###### lib/
- [ ] extension
###### test/
- [ ] integration/background_spec
- [ ] unit/extension_spec
- [ ] spec_helper

##### http-proxy 
- [ ] spec_helper
###### helpers/
- [ ] certs
- [ ] http_server
- [ ] https_server
- [ ] proxy
###### integration/
- [ ] proxy_spec
###### unit/
- [ ] ca_spec
- [ ] server_spec

##### launcher
- [ ] test/spec_helper

##### network -> None

##### reporter
- [ ] cypress/integration/aliases_spec

##### root -> None

##### runner -> None

##### socket -> None

##### static -> None

##### ts -> None

##### web-config -> None

### Phase 2. Driver

File list will be added after Phase 1 is done. 

### Phase 3. Server

File list will be added after Phase 2 is done. 

### Phase 4. Remove packages/coffee!

## Part 2. TypeScriptification

Each phase should be done in 2 steps. 

Step 1. Convert files into TypeScript files. 
Step 2. Turn on `noImplicitAny` option and remove `any`s. 

### Phase 1. Small Packages

File list will be added after Part 1 is done. 

### Phase 2. Driver

### Phase 3. Server

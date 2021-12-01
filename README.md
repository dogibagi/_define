# _define
define implementation for loading simple single page TypeScript web apps (compiled using "module": "AMD", "outFile")

The aim is to be as independent as possible from any 3rd party (well, other than TypeScript) - in order to avoid constant struggling with things breaking after version update. 

This allows (and has allowed) the author to create nice little games and other non-sensical browser apps using just TypeScript. (And it's fun!)

# supported TypeScript projects
Using AMD modules (https://github.com/amdjs/amdjs-api/wiki/AMD) seems to be one of the only two options (other is "system") to get only single JavaScript file (outFile) from TypeScript build.

Example tsconfig.json:
{
	"compilerOptions": {
		 "module": "AMD",
		 "outFile": "js/main.js"
	}
}
Here the outFile "js/main.js" consists of define calls for each TypeScript module in the project. (https://www.typescriptlang.org/tsconfig#module)

# install TypeScript
- using npm (globally is fine):
npm update
npm install typescript -g
(more info: https://www.typescriptlang.org/id/download)

# build
- command line:
tsc -b

# how to use
- inlude define.js in html as the first script
<script type="text/javascript" src="define.js"></script>


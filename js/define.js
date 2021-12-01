//define implementation for AMD modules
// - works with single outFile TypeScript project
/** The global define function */
const define = (() => {
    class cModule {
        Exports = {};
        Loaded;
        DoDefine(dependencies, factory) {
            const fargs = [require, this.Exports];
            const dependedmodules = [];
            for (let i = 2; i < dependencies.length; i++) {
                const depmod = getModule(dependencies[i]);
                fargs.push(depmod.Exports);
                dependedmodules.push(depmod.Loaded);
            }
            Promise.all(dependedmodules).then(() => {
                factory.apply(this, fargs);
                this.resolve();
            });
        }
        resolve = null;
        constructor() {
            this.Loaded = new Promise((resolve, reject) => {
                this.resolve = resolve;
            });
        }
    }
    const modules = {};
    function getModule(name) {
        if (!modules[name])
            modules[name] = new cModule();
        return modules[name];
    }
    function require(name) {
        return getModule(name).Exports;
    }
    function define(name, dependencies, factory) {
        getModule(name).DoDefine(dependencies, factory);
    }
    define["amd"] = {};
    return define;
})();
//# sourceMappingURL=define.js.map
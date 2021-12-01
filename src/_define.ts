//define implementation for AMD modules
// - works with single outFile TypeScript project

/**exports for a module */
interface IExports {	[name:string]:unknown; }
/** AMD module factory type*/
type TFactory=(require:TRequire, exports:IExports, ...imports:IExports[])=>void;
/** require function type */
type TRequire=(module:string)=>IExports
/** define function type */
type TDefine=(name:string, dependencies:string[], factory:TFactory)=>void;
/** The global define function */
const define:TDefine=(()=>{
	class cModule
	{
		public Exports:IExports={};
		public Loaded:Promise<void>;
		public DoDefine(dependencies:string[], factory:TFactory)
		{
			const fargs:unknown[]=[require, this.Exports];
			const dependedmodules:Promise<void>[]=[];
			for(let i:number=2;i<dependencies.length;i++)
			{
				const depmod:cModule=getModule(dependencies[i]);
				fargs.push(depmod.Exports);
				dependedmodules.push(depmod.Loaded);
			}
			Promise.all(dependedmodules).then(()=>{
				factory.apply(this, fargs);
				this.resolve();				
			});	
		}
		private resolve:()=>void=null;
		public constructor()
		{
			this.Loaded=new Promise((resolve:()=>void, reject:(reason?:any)=>void)=>{
				this.resolve=resolve;
			});
		}
	}
	const modules:{[name:string]:cModule}={};
	function getModule(name:string):cModule
	{
		if(!modules[name]) modules[name]=new cModule();
		return modules[name];
	}
	function require(name:string):IExports
	{
		return getModule(name).Exports;
	}
	function define(name:string, dependencies:string[], factory:TFactory)
	{
		getModule(name).DoDefine(dependencies, factory);
	}
	define["amd"]={};
	return define;
})();


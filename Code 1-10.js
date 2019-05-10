let powerOn=() => {
  if(!ship.powerOn)ship.powerOn=true;
} 
let countModules=() =>{
  return availableModules.length;
}

let countEssential=() =>{
  return availableModules.filter(function(module){
    return module.essential;
  } ).length;
}

let loadModule=(index,essential)=>{
  if(index<0)throw new Error("Index must be positive");
  let modCount=countModules();
  if(index>modCount)throw new Error("Index must wthin 0 and " +modCount);
  let module=availableModules[index];
  module.enabled=true;
  if(essential!==undefined)module.essential=essential;
  ship.modules.push(module);
}

let findModuleIndex=(moduleName) =>{
  return availableModules.findIndex(function(module){
    return module.name==moduleName;
  });
}

let loadModuleByName=(name,essential)=>{
  loadModule(findModuleIndex(name,essential));
}
let resetLARRY=()=>{
  for(let i=0; i<10;i++)LARRY.quack();
}
let setMessage=(message)=>{
  radio.message=message;
}
let activateBeacon=(message)=>{
  radio.beacon=true;
}
loadModuleByName("life-support");
loadModuleByName("propulsion",true);
loadModuleByName("navigation",true);
loadModuleByName("communication",true);
resetLARRY();
setMessage(JSON.stringify(navigation));
activateBeacon();

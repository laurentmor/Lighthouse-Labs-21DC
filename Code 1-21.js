let powerOn=() => {
  if(!ship.powerOn)ship.powerOn=true;
}; 
let countModules=() =>{
  return availableModules.length;
};

let countEssential=() =>{
  return availableModules.filter(function(module){
    return module.essential;
  } ).length;
};

let loadModule=(index,essential)=>{
  if(index<0)throw new Error("Index must be positive");
  let modCount=countModules();
  if(index>modCount)throw new Error("Index must wthin 0 and " +modCount);
  let module=availableModules[index];
  module.enabled=true;
  if(essential!==undefined)module.essential=essential;
  ship.modules.push(module);
};

let findModuleIndex=(moduleName) =>{
  return availableModules.findIndex(function(module){
    return module.name==moduleName;
  });
};

let loadModuleByName=(name,essential)=>{
  loadModule(findModuleIndex(name,essential));
};
let resetLARRY=()=>{
  for(let i=0; i<10;i++)LARRY.quack();
};
let setMessage=(message)=>{
  radio.message=message;
};
let activateBeacon=()=>{
  radio.beacon=true;
};
let setFrequency=()=>{
    let range=radio.range;
    radio.frequency=(range.low+range.high)/2;
};
let initialize=()=>{
  navigation.x=0;
  navigation.y=0;
  navigation.z=0;
};
let calibrateX=()=>{
  for(let i=1; i<=12;i++){
    let signal=checkSignal();
    if(signal!==undefined){
      navigation.x=signal;
      break;
    }
  }
};
let calibrateY=()=>{
  for(let i=1; i<=60;i++){
    let signal=checkSignal();
    if(signal!==undefined){
      navigation.y=signal;
      break;
    }
  }
};
let calibrateZ=()=>{
  for(let i=1; i<=60;i++){
    let signal=checkSignal();
    if(signal!==undefined){
      navigation.z=signal;
      break;
    }
  }
};

let calibrate=()=>{
  calibrateX();
calibrateY(); 
calibrateZ(); 
};

let setSpeed=(speed)=>{
  if(!isNaN(speed)){
    let lSpeed=parseInt(speed);
    if(lSpeed>=0)navigation.speed=lSpeed;
  }
}; 

let activateAntenna=()=>{ ship.antenna.active=true;};
let sendBroadcast=()=>{
  let i=0;
  while(i<100){
    broadcast();
    i++;
  }
};
let configureBroadcast=()=>{
  setFrequency();
  activateAntenna();
  sendBroadcast();
};
let decodeMessage=(message)=>{
  message = message.replace(/0/g, "o");
  message = message.replace(/1/g, "i");
  message = message.replace(/2/g, "u");
  message = message.replace(/3/g, "e");
  message = message.replace(/4/g, "a");
  message = message.replace(/5/g, "y");
  return message;
}
let returnToEarth=()=>{
  let x=broadcast("x");
  let y=broadcast("y");
  let z=broadcast("z");
  navigation.x=parseInt(decodeMessage(x),16);
  navigation.y=parseInt(decodeMessage(y),16);
  navigation.z=parseInt(decodeMessage(z),16);
}
loadModuleByName("life-support");
loadModuleByName("propulsion",true);
loadModuleByName("navigation",true);
loadModuleByName("communication",true);
resetLARRY();
setMessage(JSON.stringify(navigation));
activateBeacon();
configureBroadcast();
returnToEarth();

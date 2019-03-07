import api from "../api";

async function reduceRootDirectory(payload) {

  const stateObjects = await reduceObjects(payload);

  return { 
    ...stateObjects,
    finalDirectory: payload,
    selectedDirectory: payload, 
    rootDirectory: payload, 
    loading: false 
  };
};

async function reduceObjects(payload) {
  const data = await api.objects.fetch({prefix: payload});

  if(!(data && Array.isArray(data))) {
    return { objects: [], directories: [] };
  }

  const allDirectories = {};
  const directories = {};
  const objects = [];
  
  data.forEach(x => {
    const lastIndex = x.Key.lastIndexOf('/');
    const directoryPath = x.Key.substring(0, lastIndex); 
    const fileName = x.Key.substring(lastIndex+1); 
    
    if(!allDirectories[directoryPath]) {
      allDirectories[directoryPath] = directoryPath;
    }
    
    if(x.Size > 0) {
      objects.push({
        key: x.Key,
        directory: directoryPath,
        name: fileName,
        lastModified: x.LastModified,
        size: x.Size,
        status: "done",
      });
    }
  });

  Object.values(allDirectories).forEach(path => {
    const keys = path.split('/');

    let currentKey = "";
    keys.forEach(key => {

      if(!key){
        return;
      }

      if(currentKey){
        currentKey = `${currentKey}/${key}`;
      }
      else {
        currentKey = key;
      }

      if(!directories[currentKey]) {
        directories[currentKey] = currentKey;
      }

    });
  });

  return { objects, directories: Object.values(directories) };
};

async function reduceNewDirectory(selectedDirectory, payload) {

  let finalDirectory = "";
  if(payload){
    finalDirectory = selectedDirectory ? `${selectedDirectory}/${payload}` : payload;
  }
  else if (selectedDirectory){
    finalDirectory = selectedDirectory;
  }

  return {
    newDirectory: payload,
    finalDirectory: finalDirectory,
  };
};

async function reduceUpload(finalDirectory, directories, payload) {

  const formData = new FormData();
  formData.append('file', payload);
  formData.append('prefix', finalDirectory);

  await api.files.upload(formData);

  const objectsState = await reduceObjects(finalDirectory);

  const newState = {
    objects: objectsState.objects,
    selectedDirectory: finalDirectory || "",
    newDirectory: "",
    finalDirectory: finalDirectory || "",
  };

  if(finalDirectory && !directories.find(x=>x === finalDirectory))
  {
    directories.push(finalDirectory);
    newState.directories = directories;
  }

  return newState;
};

async function reduceRemove(selectedDirectory, payload) {

  await api.objects.remove({key:payload});

  const newState = await reduceObjects(selectedDirectory);

  return newState;
};

export default (store) => ({
  setRootDirectory: async payload => {
    const newState = await reduceRootDirectory(payload);
    store.changeState(newState);
  },
  setObjects: async payload => {
    const newState = await reduceObjects(payload);
    store.changeState({newState})
  },
  setSelectedDirectory: async payload => {
    const newState = await reduceObjects(payload);

    store.changeState({
      objects: newState.objects,
      selectedDirectory: payload,
      newDirectory: "",
      finalDirectory: payload,
    });
  },
  setNewDirectory: async payload => {
    const {selectedDirectory} = store;
    const newState = await reduceNewDirectory(selectedDirectory, payload);
    store.changeState({...newState});
  },
  upload: async payload => {
    const { finalDirectory, directories } = store;
    const newState = await reduceUpload(finalDirectory, directories, payload);
    store.changeState({...newState});
  },
  remove: async payload => {
    const {selectedDirectory} = store;
    const newState = await reduceRemove(selectedDirectory, payload);
    store.changeState({...newState});
  },
});

// Please update this type as same as with the data shape.
export type File = { id: string; name: string };
export interface Folder extends File {
  files: File[];
}

// Optimized version

export default function move(list: Folder[], source: string, destination: string): Folder[] {
  let fileToMoved: File | undefined;
  let destinationFolderIndex: number | undefined;

  const filteredList = list.map((folder, index) => {
    if (folder.id === source) {
      throw Error('You cannot move a folder');
    }

    if (folder.id === destination) {
      destinationFolderIndex = index;
    }

    return {
      ...folder,
      files: folder.files.filter((file) => {
        if (file.id === destination) {
          throw Error('You cannot specify a file as the destination');
        }
        if (file.id === source) {
          fileToMoved = file;
          return false;
        }
        return true;
      }),
    };
  });

  if (!destinationFolderIndex) {
    throw Error('The given folder does not exist');
  }

  if (!fileToMoved) {
    throw Error('The given file does not exist');
  }

  filteredList[destinationFolderIndex] = {
    ...filteredList[destinationFolderIndex],
    files: [...filteredList[destinationFolderIndex].files, fileToMoved],
  };

  return filteredList;
}

// First written function

/* export default function move(list: Folder[], source: string, destination: string): Folder[] {
  let moveFile: File;
  if (!list.some((folder) => folder.id === destination)) {
    throw Error('You cannot specify a file as the destination');
  }
  if (!list.some((folder) => folder.files.some((file) => file.id === source))) {
    throw Error('You cannot move a folder');
  }
  const filteredList = list.map((folder) => {
    return {
      ...folder,
      files: folder.files.filter((file) => {
        if (file.id === source) {
          moveFile = file;
          return false;
        }
        return true;
      }),
    };
  });

  const changedFolders = filteredList.map((folder) =>
    folder.id === destination ? { ...folder, files: [...folder.files, moveFile] } : folder,
  );
  return changedFolders;
}
 */

export type MulterFile = {
  path: string;
  // Add other properties of the file if needed
};

export type MulterFiles = {
  [fieldname: string]: MulterFile[] & File[];
};

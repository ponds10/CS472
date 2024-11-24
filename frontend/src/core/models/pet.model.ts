 
export interface PetAttribute {
  key: string;
  value: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  age?: number;
  weight?: string;
  size?: string;
  image?: number;
  program: string;
  documents?: PetAttribute[];
  contact?: ContactInfo;
}

export interface ContactInfo {
  organization?: {
    name: string;
    url: string;
  };
  email?: string;
  phone?: string;
}

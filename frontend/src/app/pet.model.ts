 
export interface PetAttribute {
  key: string;
  value: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  sex: string;
  age?: string;
  weight: string;
  image: string;
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

 
export interface PetAttribute {
  key: string;
  value: string;
}

export interface Pet {
  uid: string;
  petId: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  age?: number;
  weight?: string;
  size?: string;
  image?: number;
  program: string;
  vacc?: string;
  vetInfo?: string;
  misc?: string;
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

 
export interface PetAttribute {
  key: string;
  value: string;
}

export interface Pet {
  uid: string;
  petId: string;

  name: string;
  bio: string;
  species: string;
  breed: string;
  sex: string;
  age?: number;
  weight?: string;
  size?: string;
  image?: number;
  program: string;

  //medical details
  vacc?: string;
  vetHistory?: string;
  miscMed?: string;
  contact?: ContactInfo;

  //additional details
  miscInfo?:string;

}

export interface ContactInfo {
  organization?: {
    name: string;
    url: string;
  };
  email?: string;
  phone?: string;
}

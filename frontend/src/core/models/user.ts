export interface User {
    biography: string,
    city: string,
    email: string,
    first_name: string,
    last_name: string,
    phone:string,
    state: string,
    street: string,
    userID: string,
    zip: string,
    accountType: string,
}

export interface profileImages {
    userID: string,
    profile_img_url: string,
}
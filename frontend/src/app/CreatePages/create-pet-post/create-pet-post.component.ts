import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { BreedsService } from '../../../core/services/breeds/breeds.service';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-create-pet-post',
  standalone: true,
  imports: [NavBarComponent, 
           HeaderComponent, 
           ReactiveFormsModule, 
           MatIconModule],
  templateUrl: './create-pet-post.component.html',
  styleUrl: './create-pet-post.component.css'
})
export class CreatePetPostComponent implements OnInit{
  dog_breeds: string[] = [];
  cat_breeds: string[] = [];

  constructor(private BreedService: BreedsService)
  {}

  ngOnInit(): void {
    this.dog_breeds = this.BreedService.get_dog_breeds();
    this.cat_breeds = this.BreedService.get_cat_breeds();
  }

  // make the form controls for each step in the creation page
  basic_info_fg = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  pet_details_fg = new FormGroup({
    age: new FormControl(''),
    weight: new FormControl(''),
    gender: new FormControl(''),
    breed: new FormControl('')
  });

  // variables
  progress:number = 1;
  step1:number = 1;
  step2:number = 0;
  step3:number = 0;

  next()
  {
    if(this.step1 == 1)
    {
      this.step1 = 0;
      this.step2 = 1;
      this.progress = 33;

    }
    else if(this.step2 == 1)
    {
      this.step2 = 0;
      this.step3 = 1;
      this.progress = 66;
    }
    else if(this.step3 == 1)
    {

    }
  }

  back()
  {
    if(this.step3 == 1)
    {
      this.step2 = 1;
      this.step3 = 0;
      this.progress = 33;

    }
    else if(this.step2 == 1)
    {
      this.step1 = 1;
      this.step2 = 0;
      this.progress = 1;
    }
  }

  // make a variable for the selected file so that we can access it
 
  url: string | ArrayBuffer | null = null;
  // trigger function that takes in the input
  onUpload(event:any)
  {
    const selectedFile = event.target.files[0];
    const imagePath = selectedFile;

    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onload = (e => {
      this.url = reader.result;
    })
  }


  // set up the trigger function that calls the backend
  // setting up skeleton for the service to be created
  async onSubmit()
  {
    // try catch block
    try
    {
      // from the httpclient service, call the api and use the toPromise()
      // promise is depreciated, will need to refactor to use piping
      //const response = await this.client.post('endpoint', this.selectedFile).toPromise();
      //console.log(response)

    }catch(error)
    {
      // catch the errors and debug
      console.log('Error occured')
      console.log(error)
    }
  }
}

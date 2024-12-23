import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user/user.service';
import { Auth } from '@angular/fire/auth';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { LoginService } from '../../../core/services/login/login.service';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
@Component({
  selector: 'app-create-user-profile',
  standalone: true,
  imports: [HeaderComponent, MatIcon, ReactiveFormsModule],
  templateUrl: './create-user-profile.component.html',
})
export class CreateUserProfileComponent implements OnInit{
   // vars
   selectedImage: File | null = null; 
   userId: string | undefined = ''; 
   auth: Auth = inject(Auth);
 
   // this is for images
   image: File | null = null;
   url: string | null | ArrayBuffer = "./assets/images/ToeBeans.png";
 
   accountFlag: boolean = false;

   errorFlag: boolean = false;
   errorMessage: string = '';
   constructor(private userService: UserService, private navService: NavigationServiceService){}
 
   // oninit 
   ngOnInit(): void {
     this.userId = this.auth.currentUser?.uid;
   }
 
   // make the form controls for each step in the creation page
   fg_userInfo = new FormGroup({
 
     first_name: new FormControl(''),
     last_name: new FormControl(''),
     biography: new FormControl(''),
 
 
     phone: new FormControl(''),
     email: new FormControl(''),

     street: new FormControl(''),
     city: new FormControl(''),
     state: new FormControl(''),
     zip: new FormControl(''),
     accountType: new FormControl('')
   });
 
   // filechange event
   fileChangeEvent(event: any): void {
     const file = event.target.files[0];
     if (file) {
       this.selectedImage = file;
     }
 
     this.image = file;
     const imagePath = file;
 
     const reader = new FileReader();
 
     reader.readAsDataURL(file);
     reader.onload = (e => {
       this.url = reader.result;
     })
   }

   onRadioChange(num: Number)
   {
      if(num == 1)
      {
        this.fg_userInfo.get('accountType')?.setValue('institution')
        this.accountFlag = false;
      }
      else
      {
        this.fg_userInfo.get('accountType')?.setValue('individual')
        this.accountFlag = true;
      }
   }

   submitUserInfo(){
      if(this.auth.currentUser == null || this.auth.currentUser == undefined)
      {
        this.navService.navigateToLoginPage();
        return;
      }

    console.log(this.fg_userInfo.get('first_name')?.value)
    console.log(this.fg_userInfo.get('last_name')?.value)
    console.log(this.fg_userInfo.get('biography')?.value)
    console.log(this.fg_userInfo.get('phone')?.value)
    console.log(this.fg_userInfo.get('email')?.value)
    console.log(this.fg_userInfo.get('street')?.value)
    console.log(this.fg_userInfo.get('city')?.value)
    console.log(this.fg_userInfo.get('state')?.value)
    console.log(this.fg_userInfo.get('zip')?.value)
    console.log(this.fg_userInfo.get('accountType')?.value)
    console.log(this.selectedImage)

      if(this.selectedImage == null || this.url == null)
      {
        this.errorFlag = true;
        this.errorMessage = "Error, please add an image before submitting"
        return;
      }

      if(this.fg_userInfo.get('first_name')?.value == null || this.fg_userInfo.get('first_name')?.value == undefined || this.fg_userInfo.get('first_name')?.value == '' ||
        this.fg_userInfo.get('last_name')?.value == null ||
        this.fg_userInfo.get('biography')?.value == null ||
        this.fg_userInfo.get('phone')?.value == null ||
        this.fg_userInfo.get('email')?.value == null ||
        this.fg_userInfo.get('accountType')?.value == null)
      {
        this.errorFlag = true;
        this.errorMessage = "Error, review your information and ensure no fields are missing"
        return;
      }

      if(this.fg_userInfo.get('accountType')?.value == "institution")
      {
        if(
          this.fg_userInfo.get('street')?.value == null ||
          this.fg_userInfo.get('city')?.value == null || 
          this.fg_userInfo.get('state')?.value == null ||
          this.fg_userInfo.get('zip')?.value == null )
        {
          this.errorFlag = true;
          this.errorMessage = "Error, institutions are required to have an address"
          return;
        }
      }

      try
      {
        //this.userService.uploadImage(this.selectedImage)
      }
      catch(error)
      {
        this.errorFlag = true;
        this.errorMessage = "Error, upload image failed";
        // delete from firestore!
        return;
      }

      try
      {
        const userObject: User = 
        {
          first_name: this.fg_userInfo.get('first_name')?.value as string,
          last_name: this.fg_userInfo.get('last_name')?.value as string,
          biography: this.fg_userInfo.get('biography')?.value as string,
          phone: this.fg_userInfo.get('phone')?.value as string,
          email: this.fg_userInfo.get('email')?.value as string,
          accountType: this.fg_userInfo.get('accountType')?.value as string,

          state: this.fg_userInfo.get('state')?.value as string,
          street: this.fg_userInfo.get('street')?.value as string,
          city: this.fg_userInfo.get('city')?.value as string,
          zip: this.fg_userInfo.get('zip')?.value as string,

          userID: this.auth.currentUser?.uid as string
        }

        this.userService.generateAccount(userObject, this.selectedImage);
      }
      catch(error)
      {
        this.errorFlag = true;
        this.errorMessage = "Error, uploading user information"
        return;
      }
      

      this.navService.navigateToHomePage();
   }
}

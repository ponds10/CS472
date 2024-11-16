import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginBoxComponent } from '../login-page/login-box/login-box.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginBoxComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LandingPageComponent {
  // control the visibility of the descriptions
  showDescription1 = false;
  showDescription2 = false;
  showDescription3 = false;

  description1: string = "testing this here";
  description2: string = "desciption 2";
  description3: string = "description 3";

  output1: string = "";
  output2: string = "";
  output3: string = "";

  constructor(public navService: NavigationServiceService, private cdr: ChangeDetectorRef) {}

  // toggle description visibility
  // completes the animation for the cards and does a typing animation
  async toggleDescription(container: number) {
    // each case 1,2,3 has the same
    if(container == 1)
    {
      // if its true then flip it by flipping the bool
      if(this.showDescription1 == true)
      {
        // revert the output to an empty string and return
        this.showDescription1 = false;
        this.output1 = "";
        return;
      }
      else
      {
        // otherwise, set it to true and begin the typing animation
        this.showDescription1 = true;
      }
      
      // wait like 1 second for the flip animation to complete before typing
      await new Promise(resolve => setTimeout(resolve, 500))

      // then iterate from 0 to the full description length
      // each iteration wait 10ms and then concat the current char at the index to the output string
      // from there detect the changes with the imported CDR
      for(let i = 0; i < this.description1.length; i++)
      {
        await new Promise(resolve => setTimeout(resolve, 25))
        this.output1 += this.description1[i];
        //console.log(this.output1)
        this.cdr.detectChanges()
      }
    }
    else if(container == 2)
    {
      if(this.showDescription2 == true)
        {
          this.showDescription2 = false;
          this.output2 = "";
          return;
        }
        else
        {
          this.showDescription2 = true;
        }
        await new Promise(resolve => setTimeout(resolve, 500))
  
        for(let i = 0; i < this.description2.length; i++)
        {
          await new Promise(resolve => setTimeout(resolve, 25))
          this.output2 += this.description2[i];
          //console.log(this.output2)
          this.cdr.detectChanges()
        }
    }
    else if(container == 3)
    {
      if(this.showDescription3 == true)
        {
          this.showDescription3 = false;
          this.output3 = "";
          return;
        }
        else
        {
          this.showDescription3 = true;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500))
  
        for(let i = 0; i < this.description3.length; i++)
        {
          await new Promise(resolve => setTimeout(resolve, 25))
          this.output3 += this.description3[i];
          //console.log(this.output3)
          this.cdr.detectChanges()
        }
    }
  }
}


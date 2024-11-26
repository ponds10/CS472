
import { ChangeDetectionStrategy, Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, animate, style, query, stagger } from '@angular/animations';
import { AfterViewInit } from '@angular/core';
import { After } from 'v8';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  animations: [
    trigger('loadTrigger', [
      state('hidden', style({
        transform: 'translateY(30%)', opacity: 0})
      ), state('shown', style({
        transform: 'translateY(0%)', opacity:100})
      ), transition('hidden => shown', [
        animate('0.75s ease-in')
      ]),]),
  ],
})

export class LandingPageComponent implements AfterViewInit {
    // view children gets the array of elements we will apply the riseAnimation to
  // also set up the observer and visibility map to track
  @ViewChildren('targets') elements: QueryList<ElementRef> | null = null; // Reference to multiple elements
  private observer: IntersectionObserver;
  private visibilityMap: Map<Element, boolean> = new Map(); // Map to track visibility of each element


  // control the visibility of the descriptions
  showDescription1 = false;
  showDescription2 = false;
  showDescription3 = false;

  description1: string = "Based on research from non-profits, organizations, and volunteers here in Las Vegas, we believe that our free to use event management system will drive community action and foster teamwork between rescuers";
  description2: string = "Shelters and animals here in Las Vegas and across the country need support. This is evident through our consumer studies. 137 pets brought to a shelter within one day. We aim to centralize all things pets";
  description3: string = "Feral cats destory ecosystems, and can be harmful for communities. However, this does not mean society should handle them with no regard. TNR is an ethical way of handling these populations. We aim to foster and educate TNR efforts.";

  output1: string = "";
  output2: string = "";
  output3: string = "";

  constructor(public navService: NavigationServiceService, private cdr: ChangeDetectorRef) {
      // this is the callback for the observer
    // for each of the entries first save the target
    // if it is currently interesting then add it to the map by setting it to true
    // otherwise set it to false
    const callback = (entries: any) => { 
      
      let index = 1;
      entries.forEach((entry: any)=> {

        const targetElement = entry.target;

        if (entry.isIntersecting) 
        {
          setTimeout(() => {
            console.log(`${targetElement} entered the viewport`);
            this.visibilityMap.set(targetElement, true);
            targetElement.classList.add('in-view'); 
            console.log(this.visibilityMap.get(targetElement))
          }, 500 * index)

          // console.log(`${targetElement} entered the viewport`);
          // this.visibilityMap.set(targetElement, true);
          // targetElement.classList.add('in-view'); 
          // console.log(this.visibilityMap.get(targetElement))
          index++;
        } 
        else 
        {
          console.log(`${targetElement} left the viewport`);
          //this.visibilityMap.set(targetElement, false);  // Set as not visible
          targetElement.classList.remove('in-view'); // Remove CSS class for out-of-view state
        }
      }
      )};

      // options
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
      }

      // make the observer
      this.observer = new IntersectionObserver(callback, options);
  
  }

    // for the html to call! 
    triggerHelper(ref: HTMLElement)
    {
      const native = ref;
      const flag = this.visibilityMap.get(native);
      if(flag)
      {
        return 'shown';
      }else
      {
        return 'hidden';
      }
    }
  
    // after view is initialized, observe the elements!
    ngAfterViewInit() {
      console.log("testing1")
      if (this.elements) {
        this.elements.forEach((box: ElementRef) => {
          this.observer.observe(box.nativeElement);
        });
      }
    }

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
        await new Promise(resolve => setTimeout(resolve, 10))
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
  // to flip the card with only keyboard, do tab + enter OR space
  handleKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent page scrolling when pressing space
      this.toggleDescription(index);
    }
  }
}
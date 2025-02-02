import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoButtonGroupItem, PoModalAction, PoModalComponent, PoMultiselectFilter, PoNavbarIconAction, PoNavbarItem, PoTableColumn } from '@po-ui/ng-components';
import { CameraService } from '../../services/camera.service';
import { SamplePoMultiselectHeroesService } from './services/po-sample-heroes.service';
import { PoNavbarLiterals } from '@po-ui/ng-components/lib/components/po-navbar/interfaces/po-navbar-literals.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  myForm!: FormGroup;

  startedRoute = false;

  buttons1: Array<PoButtonGroupItem> = [
    { label: 'Início', action: this.openCamera.bind(this), icon: 'ph ph-camera', disabled: this.myForm?.invalid },
    { label: 'Saída', action: this.action.bind(this), icon: 'ph ph-camera', disabled: this.myForm?.invalid }
  ];
  filterService: PoMultiselectFilter;

  buttons2: Array<PoButtonGroupItem> = [
    { label: 'Retorno', action: this.action.bind(this), icon: 'ph ph-camera' },
    { label: 'Saída', action: this.action.bind(this), icon: 'ph ph-camera' }
  ];

  serviceOptions = [
    { label: 'Serviço 1', value: '1' },
    { label: 'Serviço 2', value: '2' }
  ];

  labelNow = this.formatDate(new Date());

  // Define the navbar items
  navbarItems: PoNavbarItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' }
  ];

  // Define icon actions for the navbar
  iconActions: PoNavbarIconAction[] = [
    {
      icon: 'po-icon-search', action: () => alert('Search clicked!'),
      label: 'JHJJJJ'
    },
    {
      icon: 'po-icon-help', action: () => alert('Help clicked!'),
      label: 'JHJHJHJ'
    }
  ];

  @ViewChild('videoElement')
  videoElement!: ElementRef;
  @ViewChild('canvasElement')
  canvasElement!: ElementRef;
  capturedImage!: string;

  close: PoModalAction = {
    action: () => {
      this.poModal?.close();
    },
    label: 'Cancelar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.poModal?.close();
      this.startedRoute = true
    },
    label: 'Confirmar'
  };


  confirmCamera: PoModalAction = {
    action: () => {
      this.poModalCamera?.close();
      this.startedRoute = true
    },
    label: 'Confirmar'
  };


  heroes: Array<any> = [];

  // Logo and alternative text
  logoUrl: string = 'assets/swl_logo.png';
  logoAlt: string = 'My Application Logo';

  // Shadow option
  navbarShadow: boolean = true;
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = '';

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;
  @ViewChild('modalTwo', { static: true }) poModalCamera: PoModalComponent | undefined;
  multiselect: Array<string> = ['1495831666871', '1405833068599'];
  columns: Array<PoTableColumn> = [
    { property: 'value', label: 'id' },
    {
      property: 'label',
      label: 'Name',
      type: 'link',
      action: (value: any) => {
        this.openLink(value);
      }
    }
  ];
  contact: any;
  openLink(value: any) {
    window.open(`http://google.com/search?q=${value}`, '_blank');
  }

  service: string = '';

  constructor(
    private cameraService: CameraService,
    private fb: FormBuilder,
    public samplePoMultiselectHeroesService: SamplePoMultiselectHeroesService) {
      this.filterService = samplePoMultiselectHeroesService;
    }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      labelNow: [this.labelNow, [Validators.required]],  // Initialize with a default value
      contact: [this.contact, [Validators.required]],  // Multiselect should be required
      service: [this.service, [Validators.required]]    // Combo should be required
    });
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Pad single digits with leading zeros
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }


  changeOptions(event: any): void {
    this.heroes = [...event];
  }

  getDynamicViewValues() {
    let equipe: string = '';
    this.heroes.forEach((hero, index) => {
      index === 0 ? equipe = equipe.concat(hero.name) : equipe = equipe.concat(', ' + hero.name)
    })

    return JSON.parse(`{ "data": "${this.labelNow}", "equipe": "${equipe}" }`)
  }

  // Open the camera
  openCamera(): void {

    const constraints = {
      video: {
        facingMode: 'environment' // 'user' for front camera, 'environment' for rear camera
      }
    };

   this.poModalCamera?.open();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing the camera: ', err);
        });
    } else {
      console.error('Camera not supported');
    }

    this.getGeoLocation();
  }





  // Capture the photo
  capturePhoto(): void {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;

    // Set the canvas dimensions to the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the data URL of the image from the canvas
    this.capturedImage = canvas.toDataURL('image/png');

    // Stop the video stream (optional)
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // Optionally display the captured image
    console.log('Captured Image:', this.capturedImage);
  }

  getGeoLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Location:', this.latitude, this.longitude);
        },
        (error) => {
          this.errorMessage = `Error getting location: ${error.message}`;
          console.error('Error:', error);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
      console.error('Geolocation is not supported.');
    }
  }


  ngOnDestroy(): void {

  }

  onHandleStartRoute(action: string) {
    this.poModal?.open();
  }

  onContactChange(value: any): void {
    this.contact = value;
    console.log('Contact changed:', this.contact);
  }

  action(button: any) {
    alert(`${button.label}`);
  }


}

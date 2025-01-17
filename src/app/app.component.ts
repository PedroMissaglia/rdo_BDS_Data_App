import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { poThemeDefaultActions, poThemeDefaultActionsDark, poThemeDefaultDarkValues, poThemeDefaultFeedback, poThemeDefaultFeedbackDark, poThemeDefaultLightValues, poThemeDefaultNeutrals, PoThemeService, PoThemeTypeEnum } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModule, HomeModule],
  templateUrl: './app.component.html',
  providers: [BrowserModule],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rdo_BDS_Data_App';

  poThemeSample = {
    name: 'po-theme',
    type: {
      light: {
        color: {
          brand: {
            '01': {
              lightest: '#F5F7F9',
              lighter: '#4F789D',
              light: '#2E5F8B',
              base: '#265680',
              dark: '#194368',
              darker: '#0F304E',
              darkest: '#0A2640'
            },
            '02': {
              base: '#265680'
            },
            '03': {
              base: '#265680'
            }
          },
          action: {
            ...poThemeDefaultActions,
            disabled: 'var(--color-neutral-mid-40)'
          },
          feedback: {
            ...poThemeDefaultFeedback,
            info: {
              ...poThemeDefaultFeedback.info,
              base: '#265680'
            }
          },
          neutral: {
            ...poThemeDefaultNeutrals
          }
        },
        onRoot: {
          ...poThemeDefaultLightValues.onRoot,
          '--color-page-background-color-page': 'var(--color-neutral-light-05)'
        },
        perComponent: {
          ...poThemeDefaultLightValues.perComponent
        }
      },

    },
    active: PoThemeTypeEnum.light
  };

  constructor(poThemeService: PoThemeService) {
    poThemeService.setTheme(this.poThemeSample, 0);
  }
}

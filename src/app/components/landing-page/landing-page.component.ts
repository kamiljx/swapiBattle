import {Component, effect, inject} from '@angular/core';
import {InfoCardComponent} from "@components/info-card/info-card.component";
import {HeaderComponent} from "@components/header/header.component";
import {GamePickerComponent} from "@components/game-picker/game-picker.component";
import {MatIcon} from "@angular/material/icon";
import {CounterComponent} from "@components/counter/counter.component";
import {BattleService} from "../../services/battle.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    InfoCardComponent,
    HeaderComponent,
    GamePickerComponent,
    MatIcon,
    CounterComponent,
    MatButton
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  public battleService: BattleService = inject(BattleService);
  public canGetData: boolean = true;
  constructor() {
    effect(() => {
      this.canGetData = this.battleService.canGetData();
    });
  }
  public refresh() {
    this.battleService.getBattle();
  }
}

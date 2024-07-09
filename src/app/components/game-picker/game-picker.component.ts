import {Component, inject} from '@angular/core';
import {BattleService} from "../../services/battle.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-game-picker',
  standalone: true,
  imports: [
    MatIconModule,
    MatButton,
    NgClass,
  ],
  templateUrl: './game-picker.component.html',
  styleUrl: './game-picker.component.scss'
})
export class GamePickerComponent {
  battleService: BattleService = inject(BattleService);
  public onPlay(starships: 'people' | 'starships'): void {
    this.battleService.mode.set(starships);
  }
}

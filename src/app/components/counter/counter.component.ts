import {Component, effect, inject} from '@angular/core';
import {BattleService} from "../../services/battle.service";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  public score: {0: number, 1: number} = {0: 0, 1: 0}
  #battleService: BattleService = inject(BattleService);

  constructor() {
    effect(() => {
      this.score = this.#battleService.score();
    });
  }

}

import {Component, effect, inject, Injector, Input, input, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BattleService} from "../../services/battle.service";
import {JsonPipe, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, JsonPipe, NgTemplateOutlet],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent implements OnInit, OnDestroy {
  @Input({required: true}) cardIndex!: number;
  public card: any = {};
  public mode: string = '';
  #battleService: BattleService = inject(BattleService);

  #injector: Injector = inject(Injector);
  ngOnInit() {
    this.#cardObserver();
  }

  #cardObserver(): void {
    effect(() => {
      this.card = this.#battleService.cards()[this.cardIndex];
      this.mode = this.#battleService.mode();
    }, {injector: this.#injector});
  }

  public redirect(): void {

  }

  ngOnDestroy() {
    this.#battleService.cards.set({});
  }
}

import {effect, inject, Injectable, signal, WritableSignal} from "@angular/core";
import {EndpointsService} from "./endpoints.service";
import {filter, finalize, from, map, Observable, switchMap, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BattleService {
  public cards: WritableSignal<any> =  signal({0: {}});
  public mode: WritableSignal<'starships' | 'people' | ''> = signal('');
  public score: WritableSignal<{0: number, 1: number}> = signal({0: 0, 1: 0});
  public winnerIndex: WritableSignal<number> = signal(-1);
  public canGetData: WritableSignal<boolean> = signal(true);
  #endpointsService: EndpointsService = inject(EndpointsService);

  constructor() {
    effect(() => {
      this.#onBattleTypeChange()
    }, {allowSignalWrites: true});

  }


  #onBattleTypeChange(): void {
    this.winnerIndex.set(-1);
    this.score.set({0: 0, 1: 0});
    this.getBattle()
  }

  public getBattle(): void {
    type Mode = 'starships' | 'people';
    const apis = {
      starships: this.#endpointsService.getStarshipBattle(),
      people: this.#endpointsService.getPeopleBattle()
    };

    const mode = this.mode() as Mode;
    const api = apis[mode];
    if(!mode) return;
    this.canGetData.set(false)

    api.pipe(
      finalize(()=> this.canGetData.set(true))
    ).subscribe(data => {
      this.cards.set(this.#getRandomCharacters(data.results, 2));
      this.#compareCards()
    });
  }

  #getRandomCharacters(array: any[], count: number): { [key: number]: any } {
    const randomIndexes = this.#getRandomIndexes(array.length, count);
    const selected: { [key: number]: any } = {};
    randomIndexes.forEach((index, i) => {
      selected[i] = array[index];
    });
    return selected;
  }

  #getRandomIndexes(length: number, count: number): number[] {
    const indexes = new Set<number>();
    while (indexes.size < count) {
      const randomIndex = Math.floor(Math.random() * length);
      indexes.add(randomIndex);
    }
    return Array.from(indexes);
  }

  #compareCards(): void {
    const attributeToCompare = this.mode() === 'people' ? 'mass' : 'crew';

    const item1 = this.cards()[0];
    const item2 = this.cards()[1];

    const value1 = parseFloat(item1[attributeToCompare]);
    const value2 = parseFloat(item2[attributeToCompare]);

    let winningIndex: number;

    if (!isNaN(value1) && !isNaN(value2)) {
      winningIndex = value1 > value2 ? 0 : 1;
      this.winnerIndex.set(winningIndex)
      this.score.update((prev: any) => ({
        ...prev,
        [winningIndex]: prev[winningIndex] + 1
      }));
    }
  }

}

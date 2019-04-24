import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'spp'})
export class SppPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'whale': return 'Ballena';
      case 'turtle': return 'Tortuga';
      case 'tuna': return 'Atún';
    }
    return null;
  }
}

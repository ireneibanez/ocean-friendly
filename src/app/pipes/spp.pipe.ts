import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'spp'})
export class SppPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'whale': return 'ballena';
      case 'turtle': return 'tortuga';
      case 'tuna': return 'atún';
    }
    return null;
  }
}

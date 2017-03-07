import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Title pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'title'
})
@Injectable()
export class Title {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string): any {
    value = value + '';
    value = value.substring(7,value.length); // make sure it's a string
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, limit: number): any {
    if(value){
    value = value.toString();
    return value.length < limit
      ? value
      : value.slice(0, limit) + '..';
  }
}

}

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ResponseCleanserPipe implements PipeTransform {
  transform(responseData: any, metadata?: ArgumentMetadata) {
    const blacklist: string[] = ['password', 'salt'];
    if (typeof responseData === 'object') {
      return Object.fromEntries(
        Object.entries(responseData).filter((entry) => {
          return !blacklist.includes(entry[0]);
        }),
      );
    }
    if (Array.isArray(responseData)) {
      return responseData.filter((entry) => !blacklist.includes(entry));
    }
    return responseData;
  }
}

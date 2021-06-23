import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { v4 as uuidv4 } from 'uuid';
import { IdWise, IUser } from '../model/user';
import { UserData } from './user-data';

export interface IAppData {
  users: IUser[];
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }
  private propertiesRegExp = /(\/properties\/?)$/;
  private personsRegExp = /(\/persons\/?)$/;
  private tenanciesRegExp = /(\/tenancies\/?)$/;

  createDb(reqInfo?: RequestInfo): IAppData {

    return ({
      users: UserData.users      
    });
  }
  //public post(reqInfo: RequestInfo) {
  //  //const property = (reqInfo.req as HttpRequest<any>).body as IProperty;
  //  //property.id = this.getId(reqInfo.collection);
  //  //reqInfo.collection.push(property);


  //  //let options: ResponseOptions = { body: { property }, status: 200 }
  //  return null;
  //  //return [InMemoryDataService.finishOptions(options, reqInfo)];
  //}

  post(reqInfo: RequestInfo) {
    const body = (reqInfo.req as HttpRequest<any>).body;

    if (reqInfo?.collection && (reqInfo?.url || reqInfo?.resourceUrl)) {
      // it can also as reqInfo.resourceUrl.search(this.properties_lit_regExp) >= 0 
      if (reqInfo.url.search(this.propertiesRegExp) >= 0)
        return null;
      else if (reqInfo.url.search(this.personsRegExp) >= 0)
        return null;
      else if (reqInfo.url.search(this.tenanciesRegExp) >= 0)
        return null;


      const name = body?.['username'];
      const pass = body?.['password'];
      const firstName = body?.['firstName'];
      const lastName = body?.['lastName'];

      return reqInfo.utils.createResponse$(() => {
        const collection = reqInfo.collection as Array<IUser>;
        let options: ResponseOptions;

        if (firstName && lastName && name && pass) {
          let user = {
            id: this.getId(collection) + 1,
            firstName: firstName,
            lastName: lastName,
            username: name,
            password: pass,
            token: uuidv4()
          } as IUser;
          collection.push(user);

          const { password, ...loginUser } = user ? user : {} as IUser;

          options = loginUser ? { body: { ...loginUser }, status: 200 } :
            { body: { error: `No user '${name}' found` }, status: 200 };
        }
        else if (name && pass) {
          let user = collection.find(user => (user.username === name && user.password === pass));
          const { password, ...loginUser } = user ? user : {} as IUser;

          options = loginUser ? { body: { ...loginUser }, status: 200 } :
            { body: { error: `No user '${name}' found` }, status: 200 };
        }
        else {
          options = { body: { error: `Sorry, No user.` }, status: 200 };
        }

        return InMemoryDataService.finishOptions(options, reqInfo);
      });
    }
    return undefined;
  }

  private static finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    options.statusText = options.status?.toString(); // getStatusText(options.status);
    options.headers = headers;
    options.url = url;

    return options;
  }

  private getId<T extends IdWise>(list: T[]): number {
    return (list?.length) ? Math.max(...list?.map(e => e.id)) : 1;
  }
}

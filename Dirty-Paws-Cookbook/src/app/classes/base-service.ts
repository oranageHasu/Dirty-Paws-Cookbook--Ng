import { HttpParams } from '@angular/common/http';

// Base Service Claass
// This abstract class is used to enforce Service classes to implement solutions to JObject types
export abstract class BaseService {
  protected abstract CastCollectionResult(res: any): any;
  protected abstract CastResult(res: any): any;

  protected GetQueryParameters(filter: any): HttpParams {

    let retval: HttpParams = new HttpParams();

    // Serialize the Query Paramters from the supplied Query Filter
    for (const key in filter) {

      if (filter[key] != null) {
        retval = retval.set(key.toString(), filter[key]);
      }

    }

    return retval;

  }

}

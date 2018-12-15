import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/category';
import {map} from 'rxjs/operators';
import {config} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoryService {
  constructor(
    private _http: HttpClient) {
  }

  public getAll() {
    return this._http.get<any>(`${config.apiEndpoint}/category`)
      .pipe(map(response => {
        return response.items;
      }));
  }

  public getById(categoryId: number) {
    return this._http.get<Category>(`${config.apiEndpoint}/category/${categoryId}`);
  }
}

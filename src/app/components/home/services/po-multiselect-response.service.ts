import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PoMultiselectOption } from "@po-ui/ng-components";
import { Observable } from "rxjs";

interface PoMultiselectResponse {
  items: PoMultiselectOption[];
}

@Injectable({
  providedIn: 'root'
})
export class PoSampleHeroesService {
  constructor(private http: HttpClient) {}

  // Example service method
  getHeroes(): Observable<PoMultiselectResponse> {
    return this.http.get<PoMultiselectResponse>('your-api-url');
  }
}

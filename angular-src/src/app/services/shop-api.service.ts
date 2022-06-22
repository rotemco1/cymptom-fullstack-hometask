import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../../../../shared/interfaces";
import { environment } from "../../environments/environment";

@Injectable()
export class ShopApiService {
    constructor(private readonly http: HttpClient) { }

    private getEndpoint(): string {
        return `${environment.serverUrl}/api/shop`
    }

    getItemsByFilter(filter: string, limit: number, offset: number): Observable<Item[]> {
        const params = new HttpParams();
        // Use params for filter text edge cases
        return this.http.get(`${this.getEndpoint()}/${filter}/${limit}/${offset}`) as Observable<Item[]>;
    }
}
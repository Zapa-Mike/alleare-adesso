import {  Injectable } from '@angular/core';
@Injectable()
export class RouteNameResolverService {
    constructor() {}

   public resolveRoute(route: string): string {
       const displayRoute = route.substring(1);
       displayRoute.toUpperCase();
        return displayRoute;
    }
}
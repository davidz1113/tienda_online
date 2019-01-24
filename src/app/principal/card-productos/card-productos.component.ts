import { Component, OnInit, Input } from "@angular/core";

import { PrincipalServices } from "../../servicios/principal.service";

@Component({
    selector: 'app-card-productos',
    templateUrl: './card-productos.component.html',
    styleUrls: ['./card-productos.component.scss'],
})
export class CardProductosComponent implements OnInit {
    @Input() producto;
    bloqueo=false;

    constructor(private _principalService: PrincipalServices) {

    }

    ngOnInit() {

    }

    agregarCarrito(numero) {
        console.log(numero);
        if (numero > 0) {
            this.bloqueo=true;
            this._principalService.aumentarNumero();
        }
    }

}
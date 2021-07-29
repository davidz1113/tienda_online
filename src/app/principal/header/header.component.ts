import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { PrincipalServices } from '../../servicios/principal.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  notificacion = 0;
  numero$: Observable<number>;
  numeroSubscribe$: Subscription;
  @Output() mostrarModalCarrito = new EventEmitter();

  constructor(private _principalService: PrincipalServices) { }

  ngOnInit() {
    //obtenemos el observador del servicio
    this.numero$ = this._principalService.obtenerNumero();
    //guardamos la subscripcion en otra variable
    this.numeroSubscribe$ = this.numero$.subscribe(
      //asignacion del numero al icono de notificacion
      numero => this.notificacion = numero
    );
   
  }

  ngOnDestroy(): void {
    this.numeroSubscribe$.unsubscribe();
  }

  enviarProductosPrincipal() {
    this.mostrarModalCarrito.emit({ prodCompra: this._principalService.obtenerProductosCompra() });
  }

}
